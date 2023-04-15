import { notion } from "@/lib/notion";
import { getWeek } from "@/lib/date/weekOfYear";
import { chunk } from "@/lib/string/chunk";
import { BlockObjectRequest } from "@notionhq/client/build/src/api-endpoints";

const MAX_SIZE = 2000;

// TODO: Handle Notion children types (paragraph, heading, lists, etc.)
export const createPage = async (
  database_id: string,
  string: string | undefined,
  blocks: BlockObjectRequest[] | undefined
) => {
  const page = await notion.pages.create({
    parent: { database_id, type: "database_id" },
    properties: {
      Name: {
        title: [
          { text: { content: `Rapport de la semaine ${getWeek(new Date())}` } },
        ],
      },
      Date: { date: { start: new Date().toISOString().split("T")[0] } },
    },
    children:
      blocks ||
      chunk(string as unknown as string[], MAX_SIZE).map((content) => ({
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [{ type: "text", text: { content: content.toString() } }],
        },
      })),
  });
  return page;
};
