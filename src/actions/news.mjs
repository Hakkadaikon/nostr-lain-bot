import NewsAPI from "newsapi";
import * as env from "dotenv";
import axios from "axios";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import * as config from "../utils/config.mjs";
import * as logger from "../utils/logger.mjs";
env.config();

/**
 * @summary Get game news from NewsAPI.
 */
export async function getGameNews(callback) {
  const newsapi = new NewsAPI(config.BOT_NEWS_API_KEY);
  await newsapi.v2
    .everything({
      q: "ゲーム",
      sortBy: "publishedAt",
    })
    .then(async (response) => {
      await callback(response.articles);
    });
}

export function selectNews(newsList) {
  const arrayMax = newsList.length - 1;
  const arrayMin = 0;
  const arrayNo =
    Math.floor(Math.random() * (arrayMax + 1 - arrayMin)) + arrayMin;
  return newsList[arrayNo];
}

export function selectNewsRetry(newsList, publishedNewsUrls) {
  while (true) {
    const selectedNews = selectNews(newsList);
    if (publishedNewsUrls.includes(selectedNews["url"])) {
      continue;
    }
    return selectedNews;
  }
}

function validateStr(str, ngWords) {
  for (let i = 0; i < ngWords.length; i++) {
    if (str.includes(ngWords[i])) {
      return false;
    }
  }

  return true;
}

export function validateNewsContent(content) {
  return validateStr(content, config.NEWS_CONTENT_NG_WORDS);
}

/**
 * @summary Get news content from news URL
 */
export async function getNewsContent(newsurl, callback) {
  const response = await axios.get(newsurl).catch(function (error) {
    logger.error("Failed news summary error.");
    logger.error(JSON.stringify(error));
  });

  if (response == null) {
    logger.error("Failed news summary response is null.");
    return;
  }

  let dom = new JSDOM(response.data, { url: newsurl });
  let article = new Readability(dom.window.document).parse();

  if (article == null || article.textContent == null) {
    logger.error("article is null.");
    return;
  }
  //logger.debug("document:" + JSON.stringify(dom.window.document));
  //logger.debug("article:" + article.textContent);
  await callback(article.textContent);
}

export async function postCallback(news, content, summary, thought, callback) {
  const outStr = (label, value) => {
    return label + " :\n" + value + "\n";
  };
  const outStr2 = (label, value) => {
    return label + " : " + value + "\n";
  };

  const contentCount = content.length;
  const summaryCount = summary.length;
  const thoughtCount = thought.length;

  const responseStr =
    thought +
    "\n\n" +
    outStr(config.NEWS_TITLE_LABEL, news["title"]) +
    outStr(config.NEWS_DESCRIPTION_LABEL, news["description"]) +
    outStr(config.NEWS_URL_LABEL, news["url"]) +
    outStr2(config.NEWS_CONTENT_COUNT_LABEL, contentCount.toString()) +
    outStr2(config.NEWS_SUMMARY_CONTENT_COUNT_LABEL, summaryCount.toString()) +
    outStr2(config.NEWS_THOUGHTS_CONTENT_COUNT_LABEL, thoughtCount.toString());

  await callback(responseStr);
}
