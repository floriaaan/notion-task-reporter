import { log, utils } from "@/lib/log";
import pkg from "@/../package.json";

const { version: pkgVersion } = pkg;

export const version = () => {
  log.debug(`version ${utils.magenta(utils.bold(pkgVersion))}`);
  process.exit(0);
};
