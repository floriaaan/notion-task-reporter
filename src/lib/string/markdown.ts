import { Project, Task } from "@/types/notion";
import { markdownToBlocks } from "@tryfabric/martian";

export const getRawMarkdown = (projects: Project[]) => {
  const prompt = projects
    .map(({ name, tasks }) => {
      return (
        `\n\n## ${name}\n` +
        tasks
          .map((task) => {
            return `* ${formatStatus(task.status)} Tâche: ${
              task.title
            } réalisée par *${task.assigned}*, état: **${task.status}**${getContent(
              task
            )}`;
          })
          .join("\n")
      );
    })
    .join("\n");

  return prompt;
};

const getContent = (task: Task) => {
  if (task.content) return `\n\t* ${task.content}`;
  return "";
};

const formatStatus = (status: string | undefined) => {
  if (!status) return "";
  switch (status) {
    case "non démarré":
      return "🚦";
    case "en cours":
      return "⌛️";
    case "validation":
      return "🔍";
    case "terminé":
      return "✅";
    case "en pause":
      return "⏸️";
    case "annulé":
      return "❌";
    case "attente retour":
      return "📨";
    case "problème":
      return "🚨";
    case "inconnu":
      return "❓";
    default:
      return status;
  }
};

export const getBlocks = (markdown: string) => {
  return markdownToBlocks(markdown);
};

