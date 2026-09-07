export const CHALLENGE_XP = 300;
export const CHALLENGE_MAX_MISTAKES = 3;
export const CHALLENGE_SIZE = 15;

export type ChallengeOutcome = "playing" | "failed" | "passed";

export function challengeOutcome(
  mistakes: number,
  answered: number,
  total: number,
): ChallengeOutcome {
  if (mistakes > CHALLENGE_MAX_MISTAKES) return "failed";
  if (answered >= total) return "passed";
  return "playing";
}
