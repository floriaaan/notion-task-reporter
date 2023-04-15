import "dotenv/config";
import { isTaskDueThisWeek } from "@/lib/date/currentWeek";

import { getCompletion } from "@/lib/gpt/completion";
import { buildPrompt } from "@/lib/gpt/prompt";

import { getBlocks, getRawMarkdown } from "@/lib/string/markdown";

import { getProjectList } from "@/lib/notion/project";
import { getTasks } from "@/lib/notion/task";
import {
  exportBlocksToNotion,
  exportStringToNotion,
} from "@/lib/notion/export";
import { header, log, utils } from "@/lib/log";
import { checkArgs, checkEnv, checkNetworkConnection } from "@/lib/check";

const generateReport = async (databaseId: string, type: "ai" | "markdown") => {
  log.debug(utils.bold(header));
  
  try {
    checkArgs();
    checkEnv(type);
    await checkNetworkConnection();
  } catch (err) {
    log.error(err);
    throw "";
  }

  log.debug(
    "\n" +
      utils.magenta(utils.bold("Getting tasks from Notion ")).padEnd(80, "-")
  );
  const tasks = await getTasks(databaseId);

  const tasksDueThisWeek = tasks.filter(isTaskDueThisWeek);
  const projects = getProjectList(tasksDueThisWeek);
  log.debug(
    `✅ Found ${utils.green(tasks.length.toString())} task(s), ${
      tasksDueThisWeek.length
    } due this week in ${projects.length} project(s).`
  );

  if (type === "ai") {
    log.debug(
      "\n" + utils.cyan(utils.bold("Generating result by AI ")).padEnd(80, "-")
    );
    log.debug("Getting completion from GPT-3...");
    const prompt = buildPrompt(projects);
    const answer = (await getCompletion(prompt)) || "";
    //TODO: handle answer === "" as error
    log.debug("✅ Completion received.");
    await exportStringToNotion(answer);
  }

  if (type === "markdown") {
    log.debug(
      "\n" + utils.cyan(utils.bold("Generating Markdown ")).padEnd(80, "-")
    );
    const raw = getRawMarkdown(projects);
    if (!raw) return;
    log.debug("✅ Markdown generated.");
    const blocks = getBlocks(raw);
    if (!blocks) return;
    log.debug("✅ Notion Blocks generated.");

    await exportBlocksToNotion(blocks);
  }
};

generateReport(
  process.env.NOTION_SOURCE_DATABASE_ID as string,
  "markdown"
).catch((e) => {
  if (e) log.error(e);
});
