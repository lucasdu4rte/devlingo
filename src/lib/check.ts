import type { Exercise } from "@/content/types";

export type Answer = number | number[] | string;

export function isAnswered(exercise: Exercise, answer: Answer | null) {
  if (answer === null) return false;
  if (exercise.type === "multi-choice") return Array.isArray(answer) && answer.length > 0;
  if (exercise.type === "fill-blank") return typeof answer === "string" && answer.trim() !== "";
  return typeof answer === "number";
}

export function isCorrect(exercise: Exercise, answer: Answer | null): boolean {
  if (!isAnswered(exercise, answer)) return false;
  switch (exercise.type) {
    case "single-choice":
      return answer === exercise.correct;
    case "multi-choice": {
      const picked = [...(answer as number[])].sort();
      const expected = [...exercise.correct].sort();
      return picked.length === expected.length && picked.every((v, i) => v === expected[i]);
    }
    case "fill-blank":
      return (answer as string).trim().toLowerCase() === exercise.answer.toLowerCase();
  }
}
