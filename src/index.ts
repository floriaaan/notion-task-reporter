import "dotenv/config";
import { ExtendedGlobal } from "@/types/global";
import { header, log, utils } from "@/lib/log";
import { checkArgs, checkEnv, checkNetworkConnection } from "@/lib/check";

import { isTaskDueThisWeek } from "@/lib/date/currentWeek";
import { getProjectList } from "@/lib/notion/project";
import { getTasks } from "@/lib/notion/task";

const main = async () => {
  log.debug(utils.bold(header));
  try {
    await checkEnv();
    await checkArgs();
    await checkNetworkConnection();
  } catch (err) {
    log.error(err);
    throw "";
  }

  const { type, notion } = global as unknown as ExtendedGlobal;

  log.debug(
    "\n" +
      utils.magenta(utils.bold("Getting tasks from Notion ")).padEnd(80, "-")
  );
  const tasks = await getTasks(notion.sourceDatabaseId);

  const tasksDueThisWeek = tasks.filter(isTaskDueThisWeek);
  const projects = getProjectList(tasksDueThisWeek);
  log.debug(
    `✅ Found ${utils.green(tasks.length.toString())} task(s), ${
      tasksDueThisWeek.length
    } due this week in ${projects.length} project(s).`
  );

  if (type === "ai") {
    // Lazy load libraries to reduce initial load time
    const { buildPrompt } = await import("@/lib/gpt/prompt");
    const { getCompletion } = await import("@/lib/gpt/completion");

    log.debug(
      "\n" + utils.cyan(utils.bold("Generating result by AI ")).padEnd(80, "-")
    );
    log.debug("Getting completion from GPT-3...");
    const prompt = buildPrompt(projects);
    const answer = (await getCompletion(prompt)) || "";
    //TODO: handle answer === "" as error
    log.debug("✅ Completion received.");

    const { exportStringToNotion } = await import("@/lib/notion/export");
    await exportStringToNotion(answer);
  }

  if (type === "markdown") {
    // Lazy load libraries to reduce initial load time
    const { getRawMarkdown, getBlocks } = await import("@/lib/string/markdown");

    log.debug(
      "\n" + utils.cyan(utils.bold("Generating Markdown ")).padEnd(80, "-")
    );
    const raw = getRawMarkdown(projects);
    if (!raw) return;
    log.debug("✅ Markdown generated.");
    const blocks = getBlocks(raw);
    if (!blocks) return;
    log.debug("✅ Notion Blocks generated.");

    const { exportBlocksToNotion } = await import("@/lib/notion/export");
    await exportBlocksToNotion(blocks);
  }
};

main().catch(log.error);
