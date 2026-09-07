import { codeToHtml } from "shiki";
import type { Exercise } from "@/content/types";
import { isCode } from "@/i18n";

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

function highlightInline(code: string) {
  return codeToHtml(code, { lang: "tsx", theme: "catppuccin-mocha", structure: "inline" });
}

export function highlightOptions(exercise: Exercise) {
  if (exercise.type === "fill-blank") return null;
  return Promise.all(
    exercise.options.map((option) => (isCode(option) ? highlightInline(option.en) : null)),
  );
}
