import * as logger from "./utils/logger.mjs";
import * as command from "./commands/command.mjs";

/**
 * @summary Main function.
 */
const main = async () => {
  await command.init();
};

/**
 * @summary Entry point.
 */
main().catch((e) => logger.error(e));
