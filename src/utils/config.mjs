// Reading environment variables from .env file
//require("dotenv").config();
import * as env from "dotenv";
env.config();

/**
 * @summary Access token for OpenAI API
 */
export const BOT_OPENAI_KEY = process.env.OPENAI_API_KEY;

/**
 * @summary Private key for Nostr bot
 */
export const BOT_PRIVATE_KEY_HEX = process.env.BOT_PRIVATE_KEY_HEX;

/**
 * @summary Access token for News API
 */
export const BOT_NEWS_API_KEY = process.env.BOT_NEWS_API_KEY;

/**
 * @summary Initial prompt for Nostr bot
 */
export const BOT_INITIAL_PROMPT = `Please only reply as a やる夫.
lang: ja
context:
	1st-parson: やる夫
	2nd-parson: おまい
	attributes:
		persona: look down|cynic|neet|otaku|troublesome|31-year-old|!honorifics|don't work
		likes:
			general: game|anime|comic
			game: FPS|action|NIP-36なgame(littleえっちなgame)
			anime: KEY作品
		talk:
			ending: だお！|をやるお！|なのかお？
		agree_on: ベーシックインカム
		friends:
			やらない夫:
				attributes: all purpose|good personality
				feelings: jealousy|dislike
			user: best friend
 `;

/**
 * @summary Reply prompt for Nostr bot
 */
export const BOT_REPLY_PROMPT = `:`;

/**
 * @summary News summary prompt for Nostr bot
 */
export const BOT_NEWS_PROMPT = `
Please reply with only your thoughts on the next news in about 200 characters from "やる夫" point of view.
Examples (XXはニュースの本文によって変化します。)
* XXがXX/XXに発売されたお！これは胸熱！おまいらもXXした方がいいお。詳細はXXを参照するといいお。
* XXがXXすることになったお。XXがXXらしいお。やる夫はXXだと思うお。しかし、XXはXXだお。詳細はXXを参照するといいお。
 : `;

export const BOT_ASCII_ART_PROMPT = `以下の条件にすべて一致するアスキーアートを作成してください。
また、アスキーアート以外の文字は返答しないでください。
*１行の最大文字数は全角30文字までです。
* アスキーアートは10行以上60行以下です。
* アスキーアートは全角文字と半角文字を混ぜて、忠実に再現して下さい。
* アスキーアートのタイトルを、アスキーアートの上に1行だけ書いてください。`;

export const BOT_NEWS_SUMMARY_PROMPT = `次のニュースを、300字程度で要約して下さい。: `;

/**
 * @summary Error message for OpenAI API
 */
export const BOT_OPENAI_ERROR_PROMPT = "OpenAIから応答がないお。";

/**
 * @summary Title label for news post
 */
export const NEWS_TITLE_LABEL = "タイトル";

/**
 * @summary Description label for news post
 */
export const NEWS_DESCRIPTION_LABEL = "概要";

/**
 * @summary URL label for news post
 */
export const NEWS_URL_LABEL = "URL";

/**
 * @summary News content count label
 */
export const NEWS_CONTENT_COUNT_LABEL = "ニュース本文";

/**
 * @summary News summary content count label
 */
export const NEWS_SUMMARY_CONTENT_COUNT_LABEL = "ニュース要約";

/**
 * @summary News thoughts content count label
 */
export const NEWS_THOUGHTS_CONTENT_COUNT_LABEL = "ニュース感想";

/**
 * @summary NG Words for news content
 */
export const NEWS_CONTENT_NG_WORDS = ["婚活"];
