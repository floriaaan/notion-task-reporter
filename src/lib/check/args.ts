import { log, utils } from "@/lib/log";
import { DEFAULT_ARGS } from "@/resources/constants";
import { ExtendedGlobal as EG } from "@/types/global";
import { help, version } from "@/lib/helpers";

export const checkArgs = async () => {
  const args = process.argv.slice(2);
  if (args.includes("-h") || args.includes("--help")) help();
  if (args.includes("-v") || args.includes("--version")) version();

  if (args.length !== 0)
    log.debug(
      `⚙️  Arguments detected ${utils.bold(
        "(overrides env. variables)"
      )}: ${args
        .toString()
        // split by space to handle multiple arguments
        .split(" ")
        // remove starting dash
        .map((arg) => arg.replace(/^-+/, ""))
        .join(" ")}`
    );

  const verbose = args.includes("-V") || args.includes("--verbose");
  const type = args.find((arg) => arg.includes("type"))?.split("=")[1];

  (global as unknown as EG).verbose = verbose || DEFAULT_ARGS.verbose;
  (global as unknown as EG).type = type || DEFAULT_ARGS.type;

  return {
    verbose,
    type,
  } as EG;
};
