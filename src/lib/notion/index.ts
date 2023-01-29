import { Client as NotionClient } from "@notionhq/client";
import { getContent } from "@/lib/notion/block";
require("dotenv").config();

let notion: NotionClient;
type GlobalWithNotion = typeof globalThis & {
  notion: NotionClient;
};

const OPTIONS = {
  auth: process.env.NOTION_TOKEN,
};

if (process.env.NODE_ENV === "production") {
  notion = new NotionClient(OPTIONS);
} else {
  if (!("prisma" in global)) {
    (global as GlobalWithNotion).notion = new NotionClient(OPTIONS);
  }

  notion = (global as GlobalWithNotion).notion;
}

export { notion, getContent };
