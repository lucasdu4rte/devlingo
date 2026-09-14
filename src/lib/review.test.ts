import { describe, expect, test } from "vitest";
import { answerReview, startReview } from "./review";

function play(total: number, answers: boolean[]) {
  let review = { ...startReview(total), done: false };
  const seen: number[] = [];
  for (const correct of answers) {
    seen.push(review.queue[review.cursor]);
    review = answerReview(review, correct);
  }
  return { review, seen };
}

describe("answerReview", () => {
  test("finishes after every exercise is answered correctly once", () => {
    const { review, seen } = play(3, [true, true, true]);
    expect(seen).toEqual([0, 1, 2]);
    expect(review.done).toBe(true);
    expect(review.solved).toEqual([0, 1, 2]);
  });

  test("re-enqueues a wrong answer at the end until it is mastered", () => {
    const { review, seen } = play(3, [false, true, true, false, true]);
    expect(seen).toEqual([0, 1, 2, 0, 0]);
    expect(review.done).toBe(true);
    expect(review.solved).toEqual([1, 2, 0]);
  });

  test("is not done while a wrong answer is still pending", () => {
    const { review } = play(2, [true, false]);
    expect(review.done).toBe(false);
    expect(review.solved).toEqual([0]);
    expect(review.queue[review.cursor]).toBe(1);
  });

  test("keeps the cursor on the last exercise when done so it can still render", () => {
    const { review } = play(2, [true, true]);
    expect(review.cursor).toBe(1);
  });
});
