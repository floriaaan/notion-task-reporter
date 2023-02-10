import { Project, Task } from "@/types/notion";

export const getText = (projects: Project[]) => {
  const prompt = projects
    .map(({ name, tasks }) => {
      return (
        `\n\n## ${name}\n` +
        tasks
          .map((task) => {
            return `* Tâche: ${task.title} réalisée par ${
              task.assigned
            }, état: ${task.status}${getContent(task)}`;
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
