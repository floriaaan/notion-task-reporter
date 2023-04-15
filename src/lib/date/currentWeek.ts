import { Task } from "@/types/notion";
import { getWeek } from "@/lib/date/weekOfYear";

const current_date = new Date();

const isInInterval = (value: number, start: number, end: number) =>
  start <= value && value <= end;
const isCurrentYear = (date: Date) =>
  date.getFullYear() === current_date.getFullYear();

export const isTaskDueThisWeek = (task: Task) => {
  if (!task.date || task.date?.length === 0) return false;
  const task_date_start = new Date(task.date[0]);
  const task_date_end = new Date(task.date[1] || task.date[0]);

  const current_week = getWeek(current_date);

  const task_week_start = getWeek(task_date_start);
  const task_week_end = getWeek(task_date_end);

  return (
    isInInterval(current_week, task_week_start, task_week_end) &&
    (isCurrentYear(task_date_start) || isCurrentYear(task_date_end))
  );
};
