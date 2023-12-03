import * as env from "dotenv";
import * as cron from "node-cron";
import * as logger from "../utils/logger.mjs";
import * as config from "../utils/config.mjs";
import * as openai from "../actions/openai.mjs";
import * as event from "../actions/event.mjs";
import * as relay from "../actions/relay.mjs";
import * as news from "../actions/news.mjs";
env.config();

/**
 * @summary Show help message
 */
const cmdHelp = (match, ev) => {
  var str = "";
  str += "使い方を表示するお！\n";
  str += "help|ヘルプ|へるぷ : このメッセージを表示するお。\n";
  str +=
    "(褒め|ほめ|ホメ|称え|たたえ)(ろ|て) : やる夫が特別にいいねしてやるお。\n";
  str += "[/(ニュース|News|NEWS|news) : ゲーム関連のニュースを表示するお。\n";
  str +=
    "[/(ascii|アスキー|asciiart|アスキーアート) : アスキーアートを表示するお。\n";
  str += "それ以外のメッセージ : GPT-4による応答を返信するお。\n";

  const reply = event.create("reply", str, ev);
  relay.publish(reply);
};

/**
 * @summary Fav to the specified post
 */
const cmdFav = (match, ev) => {
  const reply = event.create(
    "reply",
    "おまいはよく頑張ったお。特別に、やる夫がいいねしてやるお。",
    ev
  );
  relay.publish(reply);

  const reaction = event.create("reaction", "+", ev);
  relay.publish(reaction);
};

/**
 * @summary Array of news URLs once posted
 */
const publishedNewsUrls = [];

const newsSummaryCallback = async (callback, content) => {
  const prompt = config.BOT_NEWS_SUMMARY_PROMPT + content;
  await openai.send(
    async (summary) => {
      await callback(summary);
    },
    prompt,
    "gpt-3.5-turbo-16k-0613"
  );
};

const newsThoughtCallback = async (callback, summary) => {
  const prompt = config.BOT_INITIAL_PROMPT + config.BOT_NEWS_PROMPT + summary;
  await openai.send(
    async (thought) => {
      await callback(thought);
    },
    prompt,
    "gpt-4"
  );
};

/**
 * @summary Post a news review
 */
const cmdNews = async (callback) => {
  await news.getGameNews(async (newsList) => {
    if (newsList.length == 0) {
      return;
    }

    const selectedNews = await news.selectNewsRetry(
      newsList,
      publishedNewsUrls
    );
    publishedNewsUrls.push(selectedNews["url"]);
    logger.debug("selectedNews:" + JSON.stringify(selectedNews));

    await news.getNewsContent(selectedNews["url"], async (content) => {
      //if (!news.validateNewsContent(content)) {
      //  logger.warn("content contains ng words.");
      //  return;
      //}

      await newsSummaryCallback(async (summary) => {
        await newsThoughtCallback(async (thought) => {
          await news.postCallback(
            selectedNews,
            content,
            summary,
            thought,
            callback
          );
        }, summary);
      }, content);
    });
  });
};

/**
 * @summary Post a news review
 */
const cmdNewsPost = () => {
  cmdNews((str) => {
    const post = event.create("post", str);
    relay.publish(post);
  });
};

/**
 * @summary Reply a news review
 */
const cmdNewsReply = (match, ev) => {
  cmdNews((str) => {
    const reply = event.create("reply", str, ev);
    relay.publish(reply);
  });
};

/**
 * @summary Command create to ascii art
 */
const cmdAsciiArt = (match, ev) => {
  openai.send(
    (str) => {
      logger.debug("prompt reply: " + str);
      const reply = event.create("reply", str, ev);
      relay.publish(reply);
    },
    config.BOT_ASCII_ART_PROMPT,
    "gpt-4"
  );
};

/**
 * @summary Command Regex and callback correspondence table
 */
const routeMap = [
  [/(help|ヘルプ|へるぷ)/g, true, cmdHelp],
  [/(褒め|ほめ|ホメ|称え|たたえ)(ろ|て)/g, true, cmdFav],
  [/(ニュース|News|NEWS|news)/g, true, cmdNewsReply],
  [/(ascii|アスキー|アスキーアート|asciiart)/g, true, cmdAsciiArt],
];

/**
 * @summary Reply the response by OpenAI
 */
const cmdOpenAI = (ev) => {
  openai.send(
    (str) => {
      logger.debug("prompt reply: " + str);
      const reply = event.create("reply", str, ev);
      relay.publish(reply);
    },
    config.BOT_INITIAL_PROMPT + config.BOT_REPLY_PROMPT + ev.content,
    "gpt-4"
  );
};

/**
 * @summary Subscribe callback
 */
const callback = (ev) => {
  logger.debug("[subscribe]");
  logger.debug(JSON.stringify(ev));

  switch (ev.kind) {
    case 1:
      for (const [regex, enabled, routeCallback] of routeMap) {
        if (!enabled) {
          continue;
        }

        const match = ev.content.match(regex);
        if (match) {
          routeCallback(match, ev);
          return;
        }
      }

      cmdOpenAI(ev);
      break;
  }
};

/**
 * @summary Connect to relay.
 */
export async function connect() {
  const relayUrl = "wss://relay-jp.nostr.wirednet.jp";

  // Initialize relay
  relay.init(relayUrl, config.BOT_PRIVATE_KEY_HEX);
}

/**
 * @summary Perform relay connection processing and event initialization
 */
export async function init() {
  await connect();

  event.init(config.BOT_PRIVATE_KEY_HEX);

  // Post a startup message
  const runPost = event.create("post", "おっきしたお。");
  relay.publish(runPost);

  // Post a news review every 6 hours
  // cron.schedule("0 */6 * * *", () => cmdNewsPost());

  process.on("SIGINT", () => {
    logger.info("SIGINT");
    const exitPost = event.create("post", "寝るお。(SIGINT)");
    relay.publish(exitPost);
    process.exit(0);
  });

  process.on("SIGHUP", () => {
    logger.info("SIGHUP");
    const exitPost = event.create("post", "寝るお。(SIGHUP)");
    relay.publish(exitPost);
    process.exit(1);
  });

  process.on("SIGTERM", () => {
    logger.info("SIGTERM");
    const exitPost = event.create("post", "寝るお。(SIGTERM)");
    relay.publish(exitPost);
    process.exit(1);
  });

  relay.subscribe(callback);

  // Post news review on startup
  //cmdNewsPost();
}
