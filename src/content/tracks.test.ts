import { describe, expect, test } from "vitest";
import {
  findLesson,
  findUnit,
  lessonsBefore,
  lessonsOf,
  sideQuestsOf,
  tracks,
  unitsOf,
} from "./tracks";

const react = tracks[0];

describe("lessonsBefore", () => {
  test("is empty for the first unit", () => {
    expect(lessonsBefore(react, "jsx-basics")).toEqual([]);
  });
  test("is empty for an unknown unit id", () => {
    expect(lessonsBefore(react, "nope")).toEqual([]);
  });
  test("returns every lesson of the previous units in order", () => {
    const ids = lessonsBefore(react, "state").map((ref) => ref.lesson.id);
    expect(ids).toEqual([
      "jsx-basics-1",
      "jsx-basics-2",
      "jsx-basics-3",
      "components-props-1",
      "components-props-2",
      "components-props-3",
    ]);
  });
});

test("findUnit and unitsOf agree", () => {
  expect(findUnit(react, "events")?.id).toBe("events");
  expect(unitsOf(react)[3].unit.id).toBe("events");
  expect(findUnit(react, "nope")).toBeUndefined();
});

describe("sideQuestsOf", () => {
  test("returns one ref per unit that has a side quest", () => {
    const refs = sideQuestsOf(react);
    const withQuests = unitsOf(react).filter(({ unit }) => unit.sideQuest);
    expect(refs.length).toBe(withQuests.length);
    refs.forEach((ref) => expect(ref.lesson.id).toBe(`${ref.unit.id}-extra`));
  });
  test("unlocks with its unit, not after it", () => {
    const first = sideQuestsOf(react)[0];
    expect(first.previousLessonId).toBe(null);
    const second = sideQuestsOf(react)[1];
    expect(second.previousLessonId).toBe(lessonsBefore(react, second.unit.id).at(-1)?.lesson.id);
  });
  test("side quests stay out of the main chain", () => {
    const chain = lessonsOf(react).map((ref) => ref.lesson.id);
    sideQuestsOf(react).forEach((ref) => expect(chain).not.toContain(ref.lesson.id));
  });
});

test("findLesson resolves a side quest", () => {
  const ref = findLesson(react, "jsx-basics-extra");
  expect(ref?.lesson.id).toBe("jsx-basics-extra");
  expect(ref?.previousLessonId).toBe(null);
});
