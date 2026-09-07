import { codeToHtml } from "shiki";
import type { Exercise } from "@/content/types";

// ponytail: single dark theme; the code block stays dark in light mode by design.
export async function highlight(code: string, blank = "___") {
  const html = await codeToHtml(code, { lang: "tsx", theme: "catppuccin-mocha" });
  return html.replace("___", `<span class="blank">${blank}</span>`);
}

export function highlightExercise(exercise: Exercise) {
  if (!exercise.code) return null;
  if (exercise.type !== "fill-blank") return highlight(exercise.code);
  return highlight(exercise.code, "_".repeat(exercise.answer.length));
}
