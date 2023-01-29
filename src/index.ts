require("dotenv").config();
import { isTaskDueThisWeek } from "@/lib/date/currentWeek";

import { getCompletion } from "@/lib/gpt/completion";
import { buildPrompt } from "@/lib/gpt/prompt";

import { createPage } from "@/lib/notion/create";
import { getProjectList } from "@/lib/notion/project";
import { getTasks } from "@/lib/notion/task";

const generateReport = async (databaseId: string) => {
  const tasks = await getTasks(databaseId);

  const tasksDueThisWeek = tasks.filter(isTaskDueThisWeek);
  const projects = getProjectList(tasksDueThisWeek);

  const prompt = buildPrompt(projects);
  const answer = await getCompletion(prompt);

  const page = await createPage(
    process.env.NOTION_OUTPUT_DATABASE_ID as string,
    answer
  );

  if (page) console.log("Report generated successfully");
};

generateReport(process.env.NOTION_SOURCE_DATABASE_ID as string).catch(
  console.error
);
