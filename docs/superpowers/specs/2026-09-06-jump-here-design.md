# Jump here (unit challenge) — design spec

Date: 2026-09-06
Status: approved
Extends: `2026-09-06-devlingo-mvp-design.md`

## Summary

A locked unit can be unlocked early by passing a hard 15-question challenge covering everything before it. Passing marks every lesson of the previous units as completed and awards a fixed 300 XP (10× a regular lesson). The challenge reuses the lesson runner with stricter rules.

## Content model

- `Unit` gains `challenge?: Exercise[]`.
- Every unit with lessons, except the first unit of the track, has a `challenge` of exactly 15 exercises. The first unit and coming-soon units have none.
- Challenge exercises use the same three types and the same `Text` rules. They cover the topics of all units before the unit, and are deliberately hard (stale closures, render order, state mutation, event semantics, subtle JSX rules).
- Content validation extends to challenges: exactly 15 exercises, same per-exercise checks as lessons, answer positions not always first, presence rule above.
- Constants live in `src/lib/challenge.ts`: `CHALLENGE_XP = 300`, `CHALLENGE_MAX_MISTAKES = 3`.

## Rules

- A challenge is offered only while the unit is locked (its first lesson has status `locked`) and the unit has a `challenge`.
- Up to 3 mistakes are allowed. On the 4th mistake the challenge ends immediately with a failed screen. 15 questions answered with at most 3 mistakes passes.
- Wrong-answer feedback in a challenge only says it was wrong; it never reveals the correct answer.
- Passing calls `passChallenge(lessonIds, CHALLENGE_XP)`: appends every not-yet-completed lesson id of the previous units to `completedLessons`, adds the XP, and updates the streak with the same rule as `completeLesson`. If nothing new is completed, nothing changes.
- No new progress state. The "Jump here" chip disappears by itself once the unit unlocks. Retrying a failed challenge starts from question 1 with the same 15 questions.
- Opening a challenge route for a unit that is not locked redirects to the track.

## Screens

- **Track**: a locked unit's banner shows a "Jump here" chip (bolt icon) on the right. Tapping opens a dialog: "Jump to {unit}?", body "Pass a 15-question test on everything before this unit. Up to 3 mistakes allowed.", "Reward: 300 XP", primary "Start test" link. Escape, overlay tap and focus restore as in the lesson popover.
- **Challenge**: route `/[locale]/[track]/challenge/[unitId]`, prerendered for every unit with a challenge. Same top bar as a lesson, plus a small "{n} mistakes left" label beside the progress bar. Same quit confirmation. Question flow identical to lessons except the wrong footer has no explanation.
- **Failed**: "Not this time", "You made more than 3 mistakes.", buttons "Try again" (resets to question 1) and "Back to track".
- **Passed**: the existing lesson-complete screen with subtitle "Challenge · {unit}", XP earned 300 and the streak.

## Code shape

- `Dialog` shell component (overlay, `role="dialog"`, `aria-modal`, `aria-labelledby`, Escape to close, initial focus, focus restore) extracted from the lesson popover and quit dialog; the jump dialog is the third user.
- `LessonRunner` takes a `mode` prop: `{ kind: "lesson", lesson, unitTitle, previousLessonId }` or `{ kind: "challenge", unitId, unitTitle, lessonIds }`, plus `exercises`, `codeHtml`, `locale`, `trackHref`. Phases gain `"failed"`.
- `src/content/tracks.ts` gains `findUnit(track, unitId)` and `lessonsBefore(track, unitId)`.
- `src/lib/challenge.ts` exports the constants and a pure `challengeOutcome(mistakes, answered, total): "playing" | "failed" | "passed"`.

## Tests

- Content: challenge presence rule, 15 exercises, per-exercise validity, answer-position variety.
- `challengeOutcome`: playing, failed on the 4th mistake, passed at 15 answered with ≤3 mistakes, failed takes precedence.
- `passChallenge`: marks only new lessons, adds XP once, updates streak, no-op when all were completed.
- `lessonsBefore`: returns lessons of previous units in path order, empty for the first unit.

## Out of scope

Shuffling questions between attempts, a challenge for the first unit, limiting attempts, syncing anything.
