import { describe, expect, test } from "vitest";
import { CHALLENGE_MAX_MISTAKES, challengeOutcome } from "./challenge";

describe("challengeOutcome", () => {
  test("playing while under the limit and not finished", () => {
    expect(challengeOutcome(0, 0, 15)).toBe("playing");
    expect(challengeOutcome(3, 10, 15)).toBe("playing");
  });
  test("failed once mistakes exceed the limit, even mid-way", () => {
    expect(challengeOutcome(CHALLENGE_MAX_MISTAKES + 1, 5, 15)).toBe("failed");
  });
  test("passed when every question is answered within the limit", () => {
    expect(challengeOutcome(3, 15, 15)).toBe("passed");
    expect(challengeOutcome(0, 15, 15)).toBe("passed");
  });
  test("failed takes precedence on the last question", () => {
    expect(challengeOutcome(4, 15, 15)).toBe("failed");
  });
});
