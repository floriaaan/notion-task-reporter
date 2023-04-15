import { Project, Task } from "@/types/notion";

/**
 * 
 * Sort tasks by status with the following order:
 * - non démarré
 * - en cours
 * - validation
 * - terminé
 * - attente retour
 * - en pause
 * - problème
 * - annulé
 * - inconnu
 * 
 * @param a 
 * @param b 
 */
const sortTasks = (a: Task, b: Task) => {
  if (a.status === b.status) return 0;
  if (a.status === "non démarré") return -1;
  if (b.status === "non démarré") return 1;
  if (a.status === "en cours") return -1;
  if (b.status === "en cours") return 1;
  if (a.status === "validation") return -1;
  if (b.status === "validation") return 1;
  if (a.status === "terminé") return -1;
  if (b.status === "terminé") return 1;
  if (a.status === "attente retour") return -1;
  if (b.status === "attente retour") return 1;
  if (a.status === "en pause") return -1;
  if (b.status === "en pause") return 1;
  if (a.status === "problème") return -1;
  if (b.status === "problème") return 1;
  if (a.status === "annulé") return -1;
  if (b.status === "annulé") return 1;
  if (a.status === "inconnu") return -1;
  if (b.status === "inconnu") return 1;
  return 0;
};

export const getProjectList = (tasks: Task[]) => {
  let projects = tasks.reduce((acc: Project[], task) => {
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

  projects = projects.map((project) => {
    project.tasks = project.tasks.sort(sortTasks);
    return project;
  });

  return projects;
};
