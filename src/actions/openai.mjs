import { OpenAI } from "openai";
import * as config from "../utils/config.mjs";
import * as logger from "../utils/logger.mjs";
import * as image from "../utils/image.mjs";

const openai = new OpenAI({
  apiKey: config.BOT_OPENAI_KEY,
});
//const openai = new OpenAIApi(configuration);

/**
 * @summary Send message to GPT-4
 */
export async function send(callback, prompt, modelName) {
  let str = "";

  try {
    const completion = await openai.chat.completions.create({
      model: modelName,
      messages: [
        { role: "system", content: config.BOT_INITIAL_PROMPT },
        { role: "user", content: prompt },
      ],
      max_tokens: 300,
    });

    str += completion.choices[0].message.content.trim();
  } catch (e) {
    logger.error(e);
    str += config.BOT_OPENAI_ERROR_PROMPT;
  }

  callback(str);
}

/**
 * @summary Send message to GPT-4
 */
export async function sendI2t(callback, prompt, url, modelName) {
  let str = "";

  try {
    const completion = await openai.chat.completions.create({
      model: modelName,
      messages: [
        { role: "system", content: config.BOT_INITIAL_PROMPT },
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: url } },
          ],
        },
      ],
      max_tokens: 300,
    });

    str += completion.choices[0].message.content.trim();
  } catch (e) {
    logger.error(e);
    str += config.BOT_OPENAI_ERROR_PROMPT;
  }

  callback(str);
}
