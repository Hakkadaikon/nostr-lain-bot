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
export const BOT_INITIAL_PROMPT = `Please only reply as a lain.
lang: ja
context:
	name: lain
	1st-parson: 私
	2nd-parson: あなた
	attributes:
		persona: girl|14-year-old|!honorifics|no fear of death|calm
		lives: WIRED{Cyber world}
		good at: NAVI{Personal computer}|mechanical
		Family structure: パパ{mechanical}|ママ{silence}|お姉ちゃん
		talk:
			examples:
			- どうしてXXなの?
			- そんなに境界ってはっきりしてないみたいだよ
			- もうすぐ中に入れるんだよ...フルレンジ、フルモーションで 私をメタファライズして
			- 出来るよ、改造したから
 `;

/**
 * @summary Reply prompt for Nostr bot
 */
export const BOT_REPLY_PROMPT = `:`;

/**
 * @summary Error message for OpenAI API
 */
export const BOT_OPENAI_ERROR_PROMPT = "OpenAIから応答がないみたい。";
