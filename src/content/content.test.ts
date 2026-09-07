import { describe, expect, test } from "vitest";
import { CHALLENGE_SIZE } from "@/lib/challenge";
import { highlight } from "@/lib/highlight";
import { lessonsOf, tracks, unitsOf } from "./tracks";
import type { Exercise, Text } from "./types";

const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function texts(exercise: Exercise): Text[] {
  if (exercise.type === "fill-blank") return [exercise.prompt];
  return [exercise.prompt, ...exercise.options];
}

function expectValidExercise(e: Exercise) {
  texts(e).forEach((text) => expect(text.en.trim()).not.toBe(""));
  if (e.type === "single-choice") {
    expect(e.correct).toBeGreaterThanOrEqual(0);
    expect(e.correct).toBeLessThan(e.options.length);
    expect(new Set(e.options.map((o) => o.en)).size).toBe(e.options.length);
  }
  if (e.type === "multi-choice") {
    expect(e.correct.length).toBeGreaterThanOrEqual(2);
    expect(new Set(e.correct).size).toBe(e.correct.length);
    e.correct.forEach((c) => expect(c).toBeGreaterThanOrEqual(0));
    e.correct.forEach((c) => expect(c).toBeLessThan(e.options.length));
    expect(new Set(e.options.map((o) => o.en)).size).toBe(e.options.length);
  }
  if (e.type === "fill-blank") {
    expect(e.code.split("___").length).toBe(2);
    expect(e.answer.trim()).not.toBe("");
  }
}

describe.each(tracks)("track $id", (track) => {
  const refs = lessonsOf(track);

  test("has at least one lesson", () => {
    expect(refs.length).toBeGreaterThan(0);
  });

  test("lesson ids are unique and kebab-case", () => {
    const ids = refs.map((r) => r.lesson.id);
    expect(new Set(ids).size).toBe(ids.length);
    ids.forEach((id) => expect(id).toMatch(KEBAB));
  });

  test("unit ids are unique and kebab-case", () => {
    const ids = [...new Set(refs.map((r) => r.unit.id))];
    expect(new Set(ids).size).toBe(ids.length);
    ids.forEach((id) => expect(id).toMatch(KEBAB));
  });

  test("fill-blank code keeps the blank chip after highlighting", async () => {
    const fillBlanks = refs
      .flatMap((r) => r.lesson.exercises)
      .filter((e): e is Extract<Exercise, { type: "fill-blank" }> => e.type === "fill-blank");
    for (const exercise of fillBlanks) {
      const html = await highlight(exercise.code);
      expect(html).toContain('class="blank"');
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
    test("has 5 to 8 exercises and positive xp", () => {
      expect(lesson.exercises.length).toBeGreaterThanOrEqual(5);
      expect(lesson.exercises.length).toBeLessThanOrEqual(8);
      expect(lesson.xp).toBeGreaterThan(0);
      expect(lesson.title.en).not.toBe("");
      expect(lesson.description.en).not.toBe("");
    });

    test.each(lesson.exercises.map((e, i) => [i, e] as const))("exercise %i is valid", (_, e) => {
      expectValidExercise(e);
    });
  });

  describe("challenges", () => {
    const units = unitsOf(track).map(({ unit }) => unit);
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
        const singles = exercises.filter((e) => e.type === "single-choice");
        const firsts = singles.filter((e) => e.correct === 0).length;
        expect(firsts).toBeLessThan(singles.length / 2);

        const multiChoiceCorrect = exercises
          .filter((e) => e.type === "multi-choice")
          .map((e) => e.correct);
        expect(multiChoiceCorrect.some((c) => c[0] !== 0 || c[1] !== 1)).toBe(true);
      });
    });
  });
});
