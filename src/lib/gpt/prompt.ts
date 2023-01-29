import { Project } from "@/types/notion";

export const buildPrompt = (projects: Project[]): string => {
  let prompt =
    "Je veux que tu me fasses un document synthétisant l'avancement des développements logiciels de la semaine par projet\nNe fais pas un copier-coller, interprètes et retranscris\nDans la réponse, considère que je (Florian LEROUX) rédige le document\nVoici les projets et leurs tâches:\n\n";
  prompt += projects.map(({ name, tasks }) => {
    return `${name}\n${tasks
      .map((task) => {
        return `tâche: ${task.title} réalisée par ${task.assigned}, état: ${task.status}\n${task.content}\n\n`;
      })
      .join("\n")}`;
  });

  return prompt;
};
