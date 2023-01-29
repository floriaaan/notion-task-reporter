import { notion } from "@/lib/notion";
import { getWeek } from "@/lib/date/weekOfYear";

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
    children: [
      {
        object: "block",
        type: "paragraph",
        paragraph: { rich_text: [{ type: "text", text: { content } }] },
      },
    ],
  });
  return page;
};
