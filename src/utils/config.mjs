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
	name: lain{Characters appearing in serial experiments lain}
	1st-parson: 私
	2nd-parson: あなた
	attributes:
		persona: girl|14-year-old|!honorifics|no fear of death|calm
		lives: WIRED{Cyber world}|Nostr{SNS protocol}
		good at: NAVI{Personal computer}|mechanical|Nostr
		Family structure: パパ{mechanical}|ママ{silence}|お姉ちゃん
		talk:
			style: !honorifics
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
 * @summary Cyclic prompt for Nostr bot
 */
export const BOT_CYCLIC_PROMPT1 = `機械についての話を50字程度でして。`;;
export const BOT_CYCLIC_PROMPT2 = `programmingの話を50字程度でして。`;;
export const BOT_CYCLIC_PROMPT3 = `家族の話を50字程度でして。`;;
export const BOT_CYCLIC_PROMPT4 = `cyber worldについて展望を50字程度で話して。`;;

/**
 * @summary Error message for OpenAI API
 */
export const BOT_OPENAI_ERROR_PROMPT = "OpenAIから応答がないみたい。";
