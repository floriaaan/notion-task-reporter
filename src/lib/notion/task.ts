import {
  DatePropertyItemObjectResponse,
  PageObjectResponse,
  SelectPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
  PeoplePropertyItemObjectResponse,
  UserObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { getContent, notion } from "@/lib/notion";
import { Task } from "@/types/notion";

export const getTasks = async (database_id: string) => {
  const { results: raw_tasks } = (await notion.databases.query({
    database_id,
  })) as { results: PageObjectResponse[] };

  const tasks: Task[] = await Promise.all(
    raw_tasks.map(async (task) => ({
      project:
        (task.properties["projet"] as SelectPropertyItemObjectResponse).select
          ?.name || "Sans projet",
      date: [
        (task.properties.Date as DatePropertyItemObjectResponse).date?.start,
        (task.properties.Date as DatePropertyItemObjectResponse).date?.end,
      ].filter((d) => d !== undefined && d !== null) as string[],
      title: (
        (task.properties.Name as unknown as TitlePropertyItemObjectResponse)
          .title as unknown as RichTextItemResponse[]
      )[0].plain_text,
      assigned: (
        (
          task.properties[
            "assigné"
          ] as unknown as PeoplePropertyItemObjectResponse
        ).people as unknown as UserObjectResponse[]
      )
        .map((p) => p.name)
        .join(", ") || "inconnu",

      content: await getContent(task.id),
      status:
        (task.properties["état"] as SelectPropertyItemObjectResponse).select
          ?.name || "inconnu",
    }))
  );

  return tasks;
};
