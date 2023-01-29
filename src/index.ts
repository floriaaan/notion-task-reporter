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

  const page = await createPage(databaseId, answer);

  if (page) console.log("Report generated successfully");
};

generateReport("071ba75b06514b64aeddae1faf0c3bad").catch(console.error);
