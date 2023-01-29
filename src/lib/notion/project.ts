import { Project, Task } from "@/types/notion";

export const getProjectList = (tasks: Task[]) => {
  const projects = tasks.reduce((acc: Project[], task) => {
    const project = acc.find((project) => project.name === task.project);
    if (project) {
      project.tasks.push(task);
    } else {
      acc.push({
        name: task.project || "n/a",
        tasks: [task],
      });
    }
    return acc;
  }, []);
  return projects;
};
