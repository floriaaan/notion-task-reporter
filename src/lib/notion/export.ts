import { log, utils } from "@/lib/log";
import { createPage } from "@/lib/notion/create";
import { BlockObjectRequest } from "@notionhq/client/build/src/api-endpoints";

export const exportStringToNotion = async (string: string) => {
  log.debug(
    "\n" + utils.pink(utils.bold("Exporting result in Notion ")).padEnd(80, "-")
  );
  log.debug("Creating page in Notion...");
  const page = await createPage(
    process.env.NOTION_OUTPUT_DATABASE_ID as string,
    string,
    undefined
  );
  if (page) console.log("✅ Page created successfully.");
};

export const exportBlocksToNotion = async (blocks: BlockObjectRequest[]) => {
  log.debug(
    "\n" + utils.pink(utils.bold("Exporting result in Notion ")).padEnd(80, "-")
  );
  log.debug("Creating page in Notion...");
  const page = await createPage(
    process.env.NOTION_OUTPUT_DATABASE_ID as string,
    undefined,
    blocks
  );
  if (page) console.log("✅ Page created successfully.");
};
