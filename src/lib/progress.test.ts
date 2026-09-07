import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { EMPTY, completeLesson, lessonStatus, load, passChallenge, save } from "./progress";

const store = new Map<string, string>();

beforeEach(() => {
  store.clear();
  vi.stubGlobal("localStorage", {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => store.set(key, value),
  });
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2026, 8, 6, 12, 0, 0));
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("load", () => {
  test("returns EMPTY when nothing is stored", () => {
    expect(load()).toEqual(EMPTY);
  });
  test("returns EMPTY on invalid json", () => {
    store.set("devlingo:progress", "{nope");
    expect(load()).toEqual(EMPTY);
  });
  test("returns EMPTY on wrong shape", () => {
    store.set("devlingo:progress", JSON.stringify({ xp: "12", completedLessons: "x" }));
    expect(load()).toEqual(EMPTY);
  });
  test("round-trips through save", () => {
    const progress = { xp: 30, streak: 2, lastActiveDay: "2026-09-05", completedLessons: ["a"] };
    save(progress);
    expect(load()).toEqual(progress);
  });
});

describe("completeLesson", () => {
  test("adds the lesson, xp and starts a streak", () => {
    expect(completeLesson("jsx-basics-1", 15)).toEqual({
      xp: 15,
      streak: 1,
      lastActiveDay: "2026-09-06",
      completedLessons: ["jsx-basics-1"],
    });
  });
  test("is idempotent", () => {
    completeLesson("jsx-basics-1", 15);
    expect(completeLesson("jsx-basics-1", 15).xp).toBe(15);
    expect(load().completedLessons).toEqual(["jsx-basics-1"]);
  });
  test("keeps the streak on the same day", () => {
    save({ xp: 0, streak: 3, lastActiveDay: "2026-09-06", completedLessons: [] });
    expect(completeLesson("a", 10).streak).toBe(3);
  });
  test("increments the streak on the next day", () => {
    save({ xp: 0, streak: 3, lastActiveDay: "2026-09-05", completedLessons: [] });
    expect(completeLesson("a", 10).streak).toBe(4);
  });
  test("resets the streak after a gap", () => {
    save({ xp: 0, streak: 3, lastActiveDay: "2026-09-01", completedLessons: [] });
    expect(completeLesson("a", 10).streak).toBe(1);
  });
});

describe("lessonStatus", () => {
  const progress = { ...EMPTY, completedLessons: ["a"] };
  test("first lesson of the track is current", () => {
    expect(lessonStatus("a", null, EMPTY)).toBe("current");
  });
  test("completed lesson", () => {
    expect(lessonStatus("a", null, progress)).toBe("completed");
  });
  test("lesson after a completed one is current", () => {
    expect(lessonStatus("b", "a", progress)).toBe("current");
  });
  test("lesson after an incomplete one is locked", () => {
    expect(lessonStatus("c", "b", progress)).toBe("locked");
  });
});

describe("passChallenge", () => {
  test("completes only the new lessons, adds xp once and starts a streak", () => {
    save({ xp: 20, streak: 0, lastActiveDay: null, completedLessons: ["a"] });
    expect(passChallenge(["a", "b", "c"], 300)).toEqual({
      xp: 320,
      streak: 1,
      lastActiveDay: "2026-09-06",
      completedLessons: ["a", "b", "c"],
    });
  });
  test("is a no-op when everything was already completed", () => {
    save({ xp: 20, streak: 2, lastActiveDay: "2026-09-01", completedLessons: ["a", "b"] });
    expect(passChallenge(["a", "b"], 300)).toEqual(load());
    expect(load().xp).toBe(20);
  });
});
