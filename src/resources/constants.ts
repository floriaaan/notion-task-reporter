import "dotenv/config";
import { ExtendedGlobal } from "@/types/global";

export const DEFAULT_ARGS: ExtendedGlobal = {
  verbose: false,
  type: "markdown",
  help: false,

  // ENV variables
  notion: {
    token: process.env.NOTION_TOKEN,
    sourceDatabaseId: process.env.NOTION_SOURCE_DATABASE_ID,
    outputDatabaseId: process.env.NOTION_OUTPUT_DATABASE_ID,
  },
  openai: {
    token: process.env.OPENAI_TOKEN,
  },
};
