export type Task = {
  project?: string;
  date?: string[];
  title?: string;
  assigned?: string;
  content?: string;
  status?: string;
};

export type Project = {
  name: string;
  tasks: Omit<Task[], "project">;
};
