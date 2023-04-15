import { log, utils } from "@/lib/log";
import { helpOptions } from "@/resources/help";

export const help = () => {
  log.debug(utils.bold("Usage: notion-task-reporter [options]"));
  Object.entries(helpOptions).forEach(([key, value]) => {
    const {
      alias,
      description,
      usage,
      default: def,
      options,
      expected,
    } = value;
    log.debug(
      `${utils.bold(utils.magenta(key))}${alias ? ` (${alias})` : ""}${
        expected ? " " + utils.bold(utils.yellow(`<${expected}>`)) : ""
      }\n\t${description}\n\tUsage: ${usage} ${
        def ? `\n\t(default: ${def})` : ""
      } ${options.length ? `\n\t(options: ${options.join(", ")})` : ""}`
    );
    log.debug("");
  });
  process.exit(0);
};
