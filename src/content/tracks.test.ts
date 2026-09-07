import { describe, expect, test } from "vitest";
import { findUnit, lessonsBefore, tracks, unitsOf } from "./tracks";

const react = tracks[0];

describe("lessonsBefore", () => {
  test("is empty for the first unit", () => {
    expect(lessonsBefore(react, "jsx-basics")).toEqual([]);
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
