import url from "url";
import net from "net";
import { log, utils } from "@/lib/log";

const DEFAULT_CONFIG = {
  domain: "https://google.com",
};
export async function checkNetworkConnection({ domain } = DEFAULT_CONFIG) {
  const urlInfo = url.parse(domain);
  if (urlInfo.port === null) {
    if (urlInfo.protocol === "ftp:") {
      urlInfo.port = "21";
    } else if (urlInfo.protocol === "http:") {
      urlInfo.port = "80";
    } else if (urlInfo.protocol === "https:") {
      urlInfo.port = "443";
    }
  }
  const defaultPort = Number.parseInt(urlInfo.port || "80");
  const hostname = urlInfo.hostname || urlInfo.pathname;
  await new Promise((resolve, reject) => {
    const client = new net.Socket();
    client.connect({ port: defaultPort, host: hostname as string }, () => {
      client.destroy();
      log.debug("✅ Network connection checked.");
      resolve(true);
    });
    client.on("error", (err) => {
      client.destroy();
      log.debug(utils.red(utils.bold("❌ Network connection failed.")));
      reject(err);
    });
  });
}
