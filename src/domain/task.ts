export type EnergyLevel = "low" | "medium" | "high";
export type TaskPriority = "low" | "normal" | "high";
export type TaskCategory = "Work" | "Personal" | "Learning" | "Wellbeing";

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  priority: TaskPriority;
  energy: EnergyLevel;
  minutes: number;
  completed: boolean;
  createdAt: string;
}

export const energyLabel: Record<EnergyLevel, string> = {
  low: "Low energy", medium: "Steady energy", high: "Deep focus"
};

export function getTaskScore(task: Task, currentEnergy: EnergyLevel): number {
  const priority = { low: 1, normal: 2, high: 3 }[task.priority];
  const energyFit = task.energy === currentEnergy ? 3 : task.energy === "medium" || currentEnergy === "medium" ? 1 : 0;
  return priority * 2 + energyFit - Math.max(0, task.minutes - 30) / 30;
}

export function recommendTasks(tasks: Task[], energy: EnergyLevel): Task[] {
  return tasks.filter((task) => !task.completed)
    .slice().sort((a, b) => getTaskScore(b, energy) - getTaskScore(a, energy));
}
