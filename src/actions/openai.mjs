import { Configuration, OpenAIApi } from "openai";
import * as config from "../utils/config.mjs";
import * as logger from "../utils/logger.mjs";

const configuration = new Configuration({
  apiKey: config.BOT_OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * @summary Send message to GPT-4
 */
export async function send(callback, prompt, modelName) {
  let str = "";

  try {
    const completion = await openai.createChatCompletion({
      model: modelName,
      messages: [
        { role: "system", content: config.BOT_INITIAL_PROMPT },
        { role: "user", content: prompt },
      ],
      max_tokens: 300,
    });

    str += completion.data.choices[0].message.content.trim();
  } catch (e) {
    logger.error(e);
    str += config.BOT_OPENAI_ERROR_PROMPT;
  }

  callback(str);
}
