import { describe, expect, test } from "vitest";
import { isCode } from "@/i18n";
import { CHALLENGE_SIZE } from "@/lib/challenge";
import { highlightExercise } from "@/lib/highlight";
import { lessonsOf, tracks, unitsOf } from "./tracks";
import type { Exercise, Lesson, Text } from "./types";

const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function expectLocalizedText(text: Text) {
  for (const locale of ["en", "pt-BR"] as const) {
    const value = text[locale] ?? "";
    expect(value.trim(), `${locale}: ${text.en}`).not.toBe("");
    expect(value.split("`").length % 2, `unbalanced backticks: ${value}`).toBe(1);
  }
}

function expectValidExercise(e: Exercise) {
  expectLocalizedText(e.prompt);
  if (e.type === "fill-blank") {
    expect(e.code.split("___").length).toBe(2);
    expect(e.answer).toMatch(/^\S+$/);
    return;
  }
  e.options.forEach((option) => {
    if (!isCode(option)) {
      expectLocalizedText(option);
      return;
    }
    expect(option.en.trim()).not.toBe("");
    expect(option.en, "code options must not be wrapped in prose backticks").not.toMatch(
      /^`[\s\S]*`$/,
    );
  });
  expect(new Set(e.options.map((option) => option.en)).size).toBe(e.options.length);
  if (e.type === "single-choice") {
    expect(Number.isInteger(e.correct)).toBe(true);
    expect(e.correct).toBeGreaterThanOrEqual(0);
    expect(e.correct).toBeLessThan(e.options.length);
    return;
  }
  expect(e.correct.length).toBeGreaterThanOrEqual(2);
  expect(new Set(e.correct).size).toBe(e.correct.length);
  e.correct.forEach((correct) => {
    expect(Number.isInteger(correct)).toBe(true);
    expect(correct).toBeGreaterThanOrEqual(0);
    expect(correct).toBeLessThan(e.options.length);
  });
}

function expectAnswerPositions(exercises: Exercise[]) {
  const singles = exercises.filter((e) => e.type === "single-choice");
  if (singles.length === 0) return;
  expect(singles.filter((e) => e.correct === 0).length).toBeLessThan(singles.length / 2);
  expect(new Set(singles.map((e) => e.correct)).size).toBeGreaterThanOrEqual(
    Math.min(2, singles.length),
  );
}

function expectLessonStructure(lesson: Lesson) {
  expectLocalizedText(lesson.title);
  expectLocalizedText(lesson.description);
  expect(lesson.exercises.length).toBeGreaterThanOrEqual(5);
  expect(lesson.exercises.length).toBeLessThanOrEqual(7);
  for (const type of ["fill-blank", "multi-choice"]) {
    expect(
      lesson.exercises.some((exercise) => exercise.type === type),
      `${lesson.id}: ${type}`,
    ).toBe(true);
  }
  expectAnswerPositions(lesson.exercises);
}

describe.each(tracks)("track $id", (track) => {
  const refs = lessonsOf(track);
  const units = unitsOf(track).map(({ unit }) => unit);
  const allLessons = units.flatMap((unit) => [
    ...unit.lessons,
    ...(unit.sideQuest ? [unit.sideQuest] : []),
  ]);

  test("has at least one lesson", () => {
    expect(refs.length).toBeGreaterThan(0);
  });

  test("lesson ids are unique and kebab-case", () => {
    const ids = allLessons.map((lesson) => lesson.id);
    expect(new Set(ids).size).toBe(ids.length);
    ids.forEach((id) => expect(id).toMatch(KEBAB));
  });

  test("unit ids are unique and kebab-case", () => {
    const ids = units.map((unit) => unit.id);
    expect(new Set(ids).size).toBe(ids.length);
    ids.forEach((id) => expect(id).toMatch(KEBAB));
  });

  describe.each(units)("unit $id", (unit) => {
    test("has a localized title", () => {
      expectLocalizedText(unit.title);
    });
    test("has three numbered lessons with standard xp or is coming soon", () => {
      if (unit.lessons.length === 0) return;
      expect(unit.lessons.map((lesson) => lesson.id)).toEqual([
        `${unit.id}-1`,
        `${unit.id}-2`,
        `${unit.id}-3`,
      ]);
      expect(unit.lessons.map((lesson) => lesson.xp)).toEqual([20, 30, 30]);
    });
  });

  test("fill-blank code keeps the blank chip after highlighting", async () => {
    const fillBlanks = [
      ...allLessons.flatMap((lesson) => lesson.exercises),
      ...units.flatMap((unit) => unit.challenge ?? []),
    ].filter((e): e is Extract<Exercise, { type: "fill-blank" }> => e.type === "fill-blank");
    for (const exercise of fillBlanks) {
      const html = (await highlightExercise(exercise)) as string;
      expect(html).toContain(`class="blank">${"_".repeat(exercise.answer.length)}<`);
    }
  }, 30_000);

  test("previousLessonId chains in order", () => {
    refs.forEach((ref, i) => {
      expect(ref.previousLessonId).toBe(i === 0 ? null : refs[i - 1].lesson.id);
    });
  });

  test("correct answers are not always first", () => {
    const exercises = refs.flatMap((r) => r.lesson.exercises);
    const singleChoiceCorrect = exercises
      .filter((e) => e.type === "single-choice")
      .map((e) => e.correct);
    const multiChoiceCorrect = exercises
      .filter((e) => e.type === "multi-choice")
      .map((e) => e.correct);

    const firstCount = singleChoiceCorrect.filter((c) => c === 0).length;
    expect(firstCount).toBeLessThan(singleChoiceCorrect.length / 2);

    expect(multiChoiceCorrect.some((c) => c[0] !== 0 || c[1] !== 1)).toBe(true);
  });

  describe.each(refs)("lesson $lesson.id", ({ lesson }) => {
    test("follows the lesson content standard", () => {
      expectLessonStructure(lesson);
    });

    test.each(lesson.exercises.map((e, i) => [i, e] as const))("exercise %i is valid", (_, e) => {
      expectValidExercise(e);
    });
  });

  describe("challenges", () => {
    test("exist exactly on units with lessons after the first one", () => {
      units.forEach((unit, i) => {
        const shouldHave = i > 0 && unit.lessons.length > 0;
        expect(unit.challenge !== undefined, unit.id).toBe(shouldHave);
      });
    });
    describe.each(units.filter((u) => u.challenge))("challenge $id", (unit) => {
      const exercises = unit.challenge as Exercise[];
      test("has exactly 15 exercises", () => {
        expect(exercises.length).toBe(CHALLENGE_SIZE);
      });
      test.each(exercises.map((e, i) => [i, e] as const))("exercise %i is valid", (_, e) => {
        expectValidExercise(e);
      });
      test("correct answers are not always first", () => {
        expectAnswerPositions(exercises);

        const multiChoiceCorrect = exercises
          .filter((e) => e.type === "multi-choice")
          .map((e) => e.correct);
        expect(multiChoiceCorrect.some((c) => c[0] !== 0 || c[1] !== 1)).toBe(true);
      });
    });
  });

  describe("side quests", () => {
    test("exist exactly on units with lessons", () => {
      units.forEach((unit) => {
        expect(unit.sideQuest !== undefined, unit.id).toBe(unit.lessons.length > 0);
      });
    });
    describe.each(units.filter((u) => u.sideQuest))("side quest of $id", (unit) => {
      const quest = unit.sideQuest as Lesson;
      test("has the right id, size and double xp", () => {
        expectLessonStructure(quest);
        expect(quest.id).toBe(`${unit.id}-extra`);
        expect(quest.xp).toBe(2 * (unit.lessons.at(-1) as Lesson).xp);
      });
      test.each(quest.exercises.map((e, i) => [i, e] as const))("exercise %i is valid", (_, e) => {
        expectValidExercise(e);
      });
    });
  });
});
