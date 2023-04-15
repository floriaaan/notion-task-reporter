import { log, utils } from "@/lib/log";
import { DEFAULT_ARGS } from "@/resources/constants";
import { messages as err_msgs } from "@/resources/error_messages";

const { argv, env } = process;

export const checkEnv = async () => {
  const errors = [];
  const type =
    argv.find((arg) => arg.includes("type"))?.split("=")[1] ||
    DEFAULT_ARGS.type;
  if (argv.includes("-h") || argv.includes("--help")) return;
  if (argv.includes("-v") || argv.includes("--version")) return;

  if (!env.NOTION_TOKEN) {
    const { title, description } = err_msgs.MISSING_NOTION_TOKEN;
    log.debug(utils.red(utils.bold(title)));
    errors.push(description);
  }
  if (!env.NOTION_SOURCE_DATABASE_ID) {
    const { title, description } = err_msgs.MISSING_NOTION_SOURCE_DATABASE_ID;
    log.debug(utils.red(utils.bold(title)));
    errors.push(description);
  }
  if (!env.NOTION_OUTPUT_DATABASE_ID) {
    const { title, description } = err_msgs.MISSING_NOTION_OUTPUT_DATABASE_ID;
    log.debug(utils.red(utils.bold(title)));
    errors.push(description);
  }
  if (type === "ai" && !env.OPENAI_TOKEN) {
    const { title, description } = err_msgs.MISSING_OPENAI_TOKEN;
    log.debug(utils.red(utils.bold(title)));
    errors.push(description);
  }

  if (errors.length > 0) throw new Error(errors.join("\n"));

  global = DEFAULT_ARGS;
  log.debug("✅ Environment variables checked.");
};
