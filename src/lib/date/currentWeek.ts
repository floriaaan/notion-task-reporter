import { Task } from "../../types/notion";
import { getWeek } from "./weekOfYear";

export const isTaskDueThisWeek = (task: Task) => {
  if (!task.date) return false;
  const task_date = new Date(task.date);
  const current_date = new Date();
  const current_week = getWeek(current_date);
  const task_week = getWeek(task_date);
  return (
    current_week === task_week &&
    task_date.getFullYear() === current_date.getFullYear()
  );
};
