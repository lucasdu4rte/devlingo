import { afterEach, expect, test, vi } from "vitest";
import { shuffledIndexes } from "./shuffle";

afterEach(() => vi.restoreAllMocks());

test("returns a permutation of every index", () => {
  const order = shuffledIndexes(5);
  expect([...order].sort()).toEqual([0, 1, 2, 3, 4]);
});

test("changes the order when the random source says so", () => {
  vi.spyOn(Math, "random").mockReturnValue(0);
  expect(shuffledIndexes(4)).toEqual([1, 2, 3, 0]);
});

test("handles empty and single-element lists", () => {
  expect(shuffledIndexes(0)).toEqual([]);
  expect(shuffledIndexes(1)).toEqual([0]);
});
