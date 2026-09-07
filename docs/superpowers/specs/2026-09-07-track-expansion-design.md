# Track expansion: side quests and full React content — design spec

Date: 2026-09-07
Status: approved
Extends: `2026-09-06-devlingo-mvp-design.md`, `2026-09-06-jump-here-design.md`
Coverage map: `docs/react-interview-coverage.md`

## Summary

Two things: a new optional lesson type hanging off the side of each unit ("side quest"), worth double XP and covering the library-shaped topics the main path leaves out; and the content to fill the 23 units that are still "coming soon", so a learner who finishes the track can answer a React interview.

## 1. Side quests

### Model

`Unit` gains `sideQuest?: Lesson`. One per unit, at most. It reuses the `Lesson` type, so it also reuses the runner, the route and the progress store.

- Id: `<unitId>-extra` (`state-extra`). Permanent, like every lesson id.
- 5 to 7 exercises, same three types.
- `xp` is exactly twice the unit's standard lesson XP (the XP of its last regular lesson): 60 where lessons give 30. Validated by the content test.
- Content is framed by the problem, not the library: the title says "Global state", the exercises may name Redux and Zustand as examples but test the concept — why distant components need shared state, what a store is, when context is enough. A learner must never need to have used the library to pass.
- Every unit that has lessons has a side quest. Coming-soon units have neither.

### Rules

- A side quest is available as soon as its unit is: its status uses `lessonStatus(sideQuest.id, previousLessonId, progress)` where `previousLessonId` is the last lesson **before the unit** (`null` for the first unit). So it unlocks together with the unit's first lesson.
- It gates nothing. `lessonsOf` (the main chain that drives unlocking) never includes side quests, so completing one never advances the path and skipping one never blocks it.
- Completing one adds its XP and counts toward the streak, through the same `completeLesson`.
- Challenges ignore side quests: passing a "jump here" challenge completes the previous units' regular lessons only, so the extras stay available afterwards.

### Screens

On the track, a side quest is a node beside the unit's path, not inside it:

- The unit's path block is the positioning context; the node sits at its vertical middle, pinned to the left or right edge, alternating by unit index (units 1, 3, 5… on the right; 2, 4, 6… on the left).
- 56px circle in the XP amber, a star icon, and a dashed connector to the centre column. Completed fills solid amber; locked uses the same grey as a locked lesson.
- Tapping opens the lesson popover with an "Extra" tag in amber instead of "Lesson N", the title, the description, and `{n} exercises · +{xp} XP`.
- The desktop progress card gains a second line, `{done} / {total} extras`, shown only when the track has side quests.

### Out of scope

Side quests do not appear in "up next", do not have challenges of their own, and are not required for the track to count as finished.

## 2. Content standard

Every unit ships:

- **3 lessons**, 5 to 7 exercises each; XP 20 for the first lesson, 30 for the rest.
- **1 challenge** of exactly 15 hard exercises, covering everything before the unit (every unit except the first of the track).
- **1 side quest** of 5 to 7 exercises at 60 XP.

Roughly 36 exercises per unit. Existing rules still bind: `{ en, "pt-BR" }` on every prompt and sentence option, backticks around inline code, one `___` per fill-blank, at least one fill-blank and one multi-choice per lesson, correct answers spread across positions, no ambiguous distractors.

The 23 remaining units are listed with the interview questions each must answer in `docs/react-interview-coverage.md`; that table is the acceptance criterion for a unit's content.

## 3. Order of work

Infrastructure first, then content level by level, so the app is releasable after every unit:

1. Side quest model, path rendering, unlock rules, tests.
2. Side quests for the four units that already have lessons.
3. Beginner: `lists-keys`, `conditional-rendering`, `forms`.
4. Intermediate: `use-effect`, `data-fetching`, `lifting-state`, `context`, `refs`, `custom-hooks`, `typescript`, `performance`.
5. Advanced: `reducers`, `suspense`, `error-boundaries`, `portals`, `render-patterns`, `testing`, `class-components`.
6. Expert: `concurrent`, `actions`, `server-components`, `compiler`, `reconciliation`.

Each unit is independent: shipping units 1..N leaves the rest as "coming soon", exactly as today.

## 4. Tests

- Side quest presence: every unit with lessons has one; no coming-soon unit has one.
- Side quest XP is twice the unit's last lesson XP; id is `<unitId>-extra`.
- Side quests are absent from `lessonsOf` and reachable through `findLesson`.
- `sideQuestsOf(track)` returns them with the right `previousLessonId`.
- Existing per-exercise validation applies to side quest exercises unchanged.

## 5. Not now

Interview mode (15 questions drawn from the whole track), a second track, and per-unit review lessons. Interview mode is the natural next feature once the content exists, since the challenge machinery already does the hard part.
