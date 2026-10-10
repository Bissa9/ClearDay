import { Task } from "@/domain/task";

const STORAGE_KEY = "clearday.tasks.v1";
const ENERGY_KEY = "clearday.energy.v1";

export function loadTasks(): Task[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is Task => Boolean(item && typeof item.id === "string" && typeof item.title === "string" && typeof item.completed === "boolean"));
  } catch {
    return [];
  }
}

export function saveTasks(tasks: Task[]): void {
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); } catch { /* Storage may be disabled or full. */ }
}

export function loadEnergy(): "low" | "medium" | "high" {
  if (typeof window === "undefined") return "medium";
  const value = window.localStorage.getItem(ENERGY_KEY);
  return value === "low" || value === "high" ? value : "medium";
}

export function saveEnergy(energy: "low" | "medium" | "high"): void {
  try { window.localStorage.setItem(ENERGY_KEY, energy); } catch { /* Storage may be disabled. */ }
}
