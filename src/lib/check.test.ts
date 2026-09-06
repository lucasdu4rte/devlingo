import { describe, expect, test } from "vitest";
import type { Exercise } from "@/content/types";
import { isAnswered, isCorrect } from "./check";

const single: Exercise = {
  type: "single-choice",
  prompt: { en: "?" },
  options: [{ en: "a" }, { en: "b" }],
  correct: 1,
};
const multi: Exercise = {
  type: "multi-choice",
  prompt: { en: "?" },
  options: [{ en: "a" }, { en: "b" }, { en: "c" }],
  correct: [0, 2],
};
const fill: Exercise = { type: "fill-blank", prompt: { en: "?" }, code: "___", answer: "useState" };

describe("isCorrect", () => {
  test("single-choice", () => {
    expect(isCorrect(single, 1)).toBe(true);
    expect(isCorrect(single, 0)).toBe(false);
    expect(isCorrect(single, null)).toBe(false);
  });
  test("multi-choice ignores order and rejects extras", () => {
    expect(isCorrect(multi, [2, 0])).toBe(true);
    expect(isCorrect(multi, [0])).toBe(false);
    expect(isCorrect(multi, [0, 1, 2])).toBe(false);
  });
  test("fill-blank trims and ignores case", () => {
    expect(isCorrect(fill, "  UseState ")).toBe(true);
    expect(isCorrect(fill, "useEffect")).toBe(false);
  });
});

describe("isAnswered", () => {
  test("requires a selection, at least one pick, or non-empty text", () => {
    expect(isAnswered(single, null)).toBe(false);
    expect(isAnswered(single, 0)).toBe(true);
    expect(isAnswered(multi, [])).toBe(false);
    expect(isAnswered(multi, [1])).toBe(true);
    expect(isAnswered(fill, "  ")).toBe(false);
    expect(isAnswered(fill, "x")).toBe(true);
  });
});
