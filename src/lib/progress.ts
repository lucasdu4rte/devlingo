export type Progress = {
  xp: number;
  streak: number;
  lastActiveDay: string | null;
  completedLessons: string[];
};

export type LessonStatus = "completed" | "current" | "locked";

const KEY = "devlingo:progress";

export const EMPTY: Progress = { xp: 0, streak: 0, lastActiveDay: null, completedLessons: [] };

function isProgress(value: unknown): value is Progress {
  if (typeof value !== "object" || value === null) return false;
  const p = value as Record<string, unknown>;
  return (
    typeof p.xp === "number" &&
    typeof p.streak === "number" &&
    (p.lastActiveDay === null || typeof p.lastActiveDay === "string") &&
    Array.isArray(p.completedLessons)
  );
}

export function load(): Progress {
  if (typeof localStorage === "undefined") return EMPTY;
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) ?? "");
    return isProgress(parsed) ? parsed : EMPTY;
  } catch {
    return EMPTY;
  }
}

export function save(progress: Progress) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(progress));
}

function dayKey(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function nextStreak(progress: Progress, today: Date) {
  const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
  if (progress.lastActiveDay === dayKey(today)) return progress.streak;
  if (progress.lastActiveDay === dayKey(yesterday)) return progress.streak + 1;
  return 1;
}

// ponytail: no passive streak decay; a missed day only shows once the next lesson is completed.
export function completeLesson(lessonId: string, xp: number): Progress {
  const progress = load();
  if (progress.completedLessons.includes(lessonId)) return progress;
  const today = new Date();
  const next: Progress = {
    xp: progress.xp + xp,
    streak: nextStreak(progress, today),
    lastActiveDay: dayKey(today),
    completedLessons: [...progress.completedLessons, lessonId],
  };
  save(next);
  return next;
}

export function lessonStatus(
  lessonId: string,
  previousLessonId: string | null,
  progress: Progress,
): LessonStatus {
  if (progress.completedLessons.includes(lessonId)) return "completed";
  if (previousLessonId === null) return "current";
  if (progress.completedLessons.includes(previousLessonId)) return "current";
  return "locked";
}
