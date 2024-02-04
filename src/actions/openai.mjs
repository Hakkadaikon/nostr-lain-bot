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
export async function send(callback, prompt) {
  let str = "";
  let content = prompt;
  let modelName = "gpt-4-0125-preview";

  if (image.containsImage(prompt)) {
    logger.debug("openai img send...");
    const url = image.extractImage(prompt);
    const prompt2 = prompt.replace(url, "");

    logger.debug("prompt: " + prompt2);
    logger.debug("url: " + url);

    content = [
      { type: "text", text: prompt2 },
      { type: "image_url", image_url: { url: url } },
    ];

    modelName = "gpt-4-vision-preview";
  }

  try {
    const completion = await openai.chat.completions.create({
      model: modelName,
      messages: [
        { role: "system", content: config.BOT_INITIAL_PROMPT },
        { role: "user", content: content },
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
