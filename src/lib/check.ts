import { log, utils } from "@/lib/log";

export const checkEnv = (type: "ai" | string) => {
  const errors = [];

  if (!process.env.NOTION_TOKEN) {
    log.debug(utils.red(utils.bold("❌ No Notion API key provided.")));
    errors.push(
      "No Notion API key provided. Please set the NOTION_TOKEN environment variable."
    );
  }
  if (!process.env.NOTION_SOURCE_DATABASE_ID) {
    log.debug(utils.red(utils.bold("❌ No database ID provided")));
    errors.push(
      "No database ID provided. Please set the NOTION_SOURCE_DATABASE_ID environment variable."
    );
  }
  if (!process.env.NOTION_OUTPUT_DATABASE_ID) {
    log.debug(utils.red(utils.bold("❌ No output database ID provided.")));
    errors.push(
      "No output database ID provided. Please set the NOTION_OUTPUT_DATABASE_ID environment variable."
    );
  }
  if (type === "ai" && !process.env.OPENAI_TOKEN) {
    log.debug(utils.red(utils.bold("❌ No OpenAI API key provided.")));
    errors.push(
      "No OpenAI API key provided. Please set the OPENAI_TOKEN environment variable."
    );
  }

  if (errors.length > 0) throw new Error(errors.join("\n"));

  log.debug("✅ Environment variables checked.");
};

import url from "url";
import net from "net";

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

type global = {
  verbose: boolean;
};

export const checkArgs = () => {
  const args = process.argv.slice(2);
  if (args.length !== 0)
    log.debug(
      `⚙️  Arguments: ${args
        .toString()
        // split by space to handle multiple arguments
        .split(" ")
        // remove starting dash
        .map((arg) => arg.replace(/^-+/, ""))
        .join(" ")}`
    );

  const verbose = args.includes("-V") || args.includes("--verbose");

  (global as unknown as global).verbose = verbose;
  return {
    verbose,
  };
};
