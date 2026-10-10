import { EnergyLevel, Task, TaskCategory, TaskPriority, recommendTasks } from "@/domain/task";

export interface NewTask {
  title: string;
  category: TaskCategory;
  priority: TaskPriority;
  energy: EnergyLevel;
  minutes: number;
}

export function createTask(input: NewTask): Task {
  const title = input.title.trim();
  if (!title) throw new Error("Give your task a name first.");
  if (title.length > 100) throw new Error("Task names must be 100 characters or fewer.");
  if (!Number.isFinite(input.minutes) || input.minutes < 5 || input.minutes > 240) {
    throw new Error("Duration must be between 5 and 240 minutes.");
  }
  return { ...input, title, id: crypto.randomUUID(), completed: false, createdAt: new Date().toISOString() };
}

export function getDashboardStats(tasks: Task[]) {
  const completed = tasks.filter((task) => task.completed).length;
  const totalMinutes = tasks.filter((task) => task.completed).reduce((sum, task) => sum + task.minutes, 0);
  return { completed, remaining: tasks.length - completed, focusMinutes: totalMinutes };
}

export { recommendTasks };
