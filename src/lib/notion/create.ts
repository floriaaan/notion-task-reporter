import { notion } from "@/lib/notion";
import { getWeek } from "@/lib/date/weekOfYear";
import { chunk } from "@/lib/string/chunk";

const MAX_SIZE = 2000;

// TODO: Handle Notion children types (paragraph, heading, lists, etc.)
export const createPage = async (database_id: string, content: string) => {
  const page = await notion.pages.create({
    parent: { database_id },
    properties: {
      Name: {
        title: [
          { text: { content: `Rapport de la semaine ${getWeek(new Date())}` } },
        ],
      },
      Date: { date: { start: new Date().toISOString().split("T")[0] } },
    },
    children: chunk(content as unknown as string[], MAX_SIZE).map(
      (content) => ({
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [{ type: "text", text: { content: content.toString() } }],
        },
      })
    ),
  });
  return page;
};
