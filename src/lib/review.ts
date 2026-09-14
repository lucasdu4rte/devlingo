export type Review = { queue: number[]; cursor: number; solved: number[] };

export function startReview(total: number): Review {
  return { queue: Array.from({ length: total }, (_, i) => i), cursor: 0, solved: [] };
}

export function answerReview(review: Review, correct: boolean): Review & { done: boolean } {
  const current = review.queue[review.cursor];
  const queue = correct ? review.queue : [...review.queue, current];
  const solved =
    correct && !review.solved.includes(current) ? [...review.solved, current] : review.solved;
  const done = review.cursor + 1 >= queue.length;
  return { queue, solved, cursor: done ? review.cursor : review.cursor + 1, done };
}
