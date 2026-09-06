# devlingo MVP — design spec

Date: 2026-09-06
Status: approved

## Summary

devlingo is an open source "Duolingo for learning technologies". The MVP ships a single track (React) with short, non-executable exercises, a visual lesson path, XP, streaks, and localStorage-only progress. It is a static Next.js site deployed on Vercel, structured so that GitHub login and a database can be added later without reshaping the app.

## Decisions already made

These are fixed and not reopened by this spec:

- Lessons are short exercises only; no code execution.
- Progress is a single object in localStorage behind `load()`/`save()`. Later, GitHub auth syncs it to Postgres for authenticated users. No event log.
- Stack: Next.js App Router, TypeScript, Tailwind. Static today; server available for Auth.js later. Deploy on Vercel. Node via `fnm` and `.nvmrc`.
- Content lives as typed TypeScript files in the repo. Hierarchy Track → Level → Unit → Lesson.
- MVP content scope: the whole React track is named (levels and units); only the first ~4 Beginner units have real lessons. The rest shows as "coming soon".
- Gamification: visual path, in-lesson progress bar, XP per lesson, daily streak, lesson-complete screen. No hearts/lives.
- i18n from day one: `en` (default, fallback) and `pt-BR`, hand-rolled, `[locale]` route segment, one UI messages JSON per locale, `t()`. No next-intl.
- Code style: minimum that works, no speculative abstractions, early returns, no nested ternaries. Conventional Commits. Never push without explicit permission.

## 1. Content model and types

All content lives under `src/content/`.

```ts
// src/content/types.ts
export type Locale = "en" | "pt-BR";
export type Text = { en: string; "pt-BR"?: string };

export type Exercise =
  | { type: "single-choice"; prompt: Text; code?: string; options: Text[]; correct: number }
  | { type: "multi-choice"; prompt: Text; code?: string; options: Text[]; correct: number[] }
  | { type: "fill-blank"; prompt: Text; code: string; answer: string };

export type Lesson = { id: string; title: Text; description: Text; xp: number; exercises: Exercise[] };
export type Unit = { id: string; title: Text; lessons: Lesson[] };
export type Level = { id: "beginner" | "intermediate" | "advanced" | "expert"; title: Text; units: Unit[] };
export type Track = { id: string; title: Text; levels: Level[] };
```

Rules:

- `code` is a raw string, always highlighted as TSX in the MVP. When a second track arrives it becomes `{ lang, source }`.
- `single-choice` has exactly one correct option. `multi-choice` has two or more; the prompt says how many ("Pick the 3 true statements…"). Options may omit `code`, so plain conceptual questions are first-class.
- `fill-blank`: `code` contains exactly one `___` marker. The answer is compared after `trim()`, case-insensitively. One accepted answer only.
- `description` is one sentence shown in the lesson popover on the track screen, for locked and unlocked lessons alike.
- A unit with `lessons: []` is "coming soon". No flag; the UI derives it from the empty array.
- Lesson ids are global, flat, stable kebab-case strings (`jsx-basics-1`, `props-2`). They are stored in `completedLessons`, so they are never renamed.
- Order is array order. Lesson N unlocks when N-1 is completed; the first lesson of a unit depends on the last lesson of the previous unit; the first lesson of the track is always unlocked. This is derived on the fly, never stored.
- `src/content/tracks.ts` exports `tracks: Track[]`, currently `[react]`. `src/content/react.ts` assembles the four levels; each unit with real content lives in `src/content/react/beginner/<unit>.ts`.
- Adding an exercise type means a new union member plus one renderer component. The renderer uses an exhaustive `switch`, so a missing case fails the build.

## 2. Routes and screens

Everything is under `src/app/[locale]/`.

```
/                             → redirect to /<locale> (proxy reads Accept-Language, falls back to en)
/[locale]                     → redirect to /[locale]/react (single track; becomes a track list when there are 2+)
/[locale]/[track]             → Track screen
/[locale]/[track]/[lessonId]  → Lesson screen
```

### Track screen

Server component reads `tracks.ts` and renders levels in order, each unit as a colored banner followed by its lessons as a zig-zag path of circles. Visual state per circle depends on progress, which is client-only, so the path is a client component `TrackPath` that receives the structure as props and reads `progress.load()` in `useEffect`.

- Circle states: completed (star), current (play icon, highlighted ring, floating "START" bubble), locked (lock icon), coming soon (dashed outline, no interaction).
- Tapping any circle except "coming soon" opens a bottom popover with the lesson tag ("Lesson 5 · JSX basics"), title, description, and a button: "Start" on the current or a completed lesson; a disabled "Complete lesson N to unlock" on a locked one.
- Header: brand, streak, XP, theme toggle, locale switch. The header reads progress once on mount.
- Desktop (≥ 1024px): the same path in a 480px column plus a side column with three cards: track, progress (`x / y lessons`, percentage, bar) and "up next" (title and description of the current lesson). The side column is hidden below 1024px; the same information lives in the header.

### Lesson screen

`generateStaticParams` over every lesson with content. The server component finds the lesson and hands it to the client component `LessonRunner`, which keeps `index` and the current answer in `useState`.

Flow per exercise: answer → "Check" → fixed footer with feedback → "Continue".

- Correct: green footer with a short message. XP is per lesson, so it is only shown on the complete screen.
- Wrong: red footer showing the correct answer (single-choice), highlighting correct options in green and wrong picks in red (multi-choice), or showing the expected word (fill-blank). The exercise does not repeat; the lesson only counts as completed at the end.
- Top bar: close button (back to track, nothing saved) and a progress bar filled to `index / exercises.length`.
- Fill-blank shows the blank as a highlighted chip inside the code and a text input below it, so the mobile keyboard never covers the code.
- Opening a locked lesson by URL: `LessonRunner` checks the status on mount and redirects to the track. No server guard, since progress is client-only.

### Lesson complete

Not a route; the last state of `LessonRunner`. Trophy, "Lesson complete!", unit and lesson title, two cards (XP earned, streak), and a "Continue" button back to the track. `progress.completeLesson(id, xp)` is called when this state is entered. A lesson that was already completed shows the screen without adding XP again.

### Components

`TrackPath`, `LessonNode`, `LessonPopover`, `LessonRunner`, `SingleChoice`, `MultiChoice`, `FillBlank`, `CodeBlock` (shiki, server), `ProgressBar`, `Header`, `LocaleSwitcher`, `ThemeToggle`. Root layout in `[locale]/layout.tsx` sets `<html lang>` and renders the header.

## 3. Visual design

Reference: the approved Claude Design canvas "Devlingo Screens" (13 artboards: track, coming soon, locked and current popovers, single-choice, multi-choice, wrong answer, fill-blank, complete, desktop, and three light variants).

- Shapes borrow from Duolingo: 3D circles with a solid bottom shadow, cards with a thicker bottom border, big uppercase buttons, a full-width feedback footer. Colors do not.
- Palette (dark, default): background `#0f1117`, surface `#181b24`, surface-2 `#20242f`, border `#2c3140`, text `#e8eaf1`, muted `#9298a8`, primary `#8b7cff` / `#5f4fd6` / soft `#2a2650`, success `#3ddc97` / `#22a86e` / soft `#153d2e` / text `#5ff0b0`, error `#ff6b6b` / `#c94848` / soft `#4a2024` / text `#ff8a8a`, streak `#ff9f43`, xp `#ffd166`, locked `#2a2e3a` / `#1c1f28` / text `#6b7080`, code `#0a0c12`. Unit banner colors: primary, `#2fb8d6`, `#e26fa0`.
- Palette (light): background `#f6f7fb`, surface `#ffffff`, surface-2 `#f0f1f6`, border `#e1e4ec`, text `#1b1d26`, muted `#6a7080`, primary `#6a5cff` / `#4a3ed1` / soft `#ebe8ff`, success `#22c48a` / `#178f63` / soft `#dcf7ec` / text `#107a52`, error `#f0524f` / `#c23c3a` / soft `#ffe3e2` / text `#c22f2d`, streak `#f0842a`, xp `#e6a800`, locked `#e6e8ef` / `#cfd2dc` / text `#9aa0b0`, code `#1b1d26`.
- Tokens are declared once in `globals.css` via Tailwind `@theme` as CSS variables; the light set overrides them under `html.light`. Components use the semantic names (`bg-surface`, `text-muted`), never raw hex.
- Fonts: Sora (display, 700/800), DM Sans (body, 500–700), JetBrains Mono (code), loaded with `next/font/google`.
- Icons: inline SVG, stroke-based, one style. No emoji.
- Hit targets are at least 44px on mobile.

### Theme

Dark is the default. Preference `"dark" | "light" | "system"` is stored in localStorage under `devlingo:theme`, separate from progress. An inline script in `<head>` reads it before hydration and sets the `light` class on `<html>` when needed (respecting `prefers-color-scheme` for `"system"`), so there is no flash. `ThemeToggle` cycles the three values.

### Motion

- Screen transitions: Next.js View Transitions (`experimental.viewTransition`) with a short fade + slide. No animation library.
- Track: circles cascade in on mount (`@keyframes` with a per-index `animation-delay`), the current circle's ring pulses slowly, the "START" bubble floats. The popover slides up with a short spring.
- Lesson complete: trophy scales in with a bounce, XP and streak count up from 0, cards enter with a delay.
- During a question: no idle animation at all. Only responses to actions: option selection (~100ms), the feedback footer sliding up, the progress bar filling with a transition.
- Everything is disabled under `prefers-reduced-motion`.

## 4. Progress module

`src/lib/progress.ts` is the only code that touches localStorage.

```ts
export type Progress = {
  xp: number;
  streak: number;
  lastActiveDay: string | null; // "YYYY-MM-DD" in the browser's local time zone
  completedLessons: string[];
};

export function load(): Progress;
export function save(progress: Progress): void;
export function completeLesson(lessonId: string, xp: number): Progress;
export function lessonStatus(
  lessonId: string,
  previousLessonId: string | null,
  progress: Progress,
): "completed" | "current" | "locked";
```

- Storage key `devlingo:progress`. `EMPTY` is `{ xp: 0, streak: 0, lastActiveDay: null, completedLessons: [] }`.
- `load()` is synchronous and defensive: no `window`, missing key, invalid JSON or wrong field shapes → `EMPTY`. Minimal `typeof`/`Array.isArray` checks, no schema library. Only called inside `useEffect`.
- `completeLesson` reads, applies, saves, returns the new state. Already completed → returns the current state unchanged (idempotent). Otherwise appends the id, adds XP, and updates the streak: same day → unchanged; yesterday → `+1`; anything else or `null` → `1`.
- No passive streak decay. The header shows the stored value; a missed day only resets the streak when the next lesson is completed. Marked with a `ponytail:` comment; a `currentStreak(progress)` helper is the upgrade path if the home screen should show a lost streak.
- `lessonStatus` is pure and shared by `TrackPath` and `LessonRunner`. `previousLessonId === null` means the first lesson of the track and is always `current` unless completed.
- No JSON versioning. A format change before the database exists is handled by `load()` discarding what does not parse.
- No React context. Track and lesson are different pages; each calls `load()` on mount.
- Future: when Auth.js + Postgres arrive, `load`/`save` become `async` and swap their bodies. Consumers already read inside `useEffect`, so the change stays contained.

## 5. i18n

Three pieces, all hand-rolled.

### Routing

`src/proxy.ts` runs only on `/`: reads `Accept-Language`, picks `pt-BR` when the first language starts with `pt`, otherwise `en`, and redirects. Every other route already carries `[locale]`; `[locale]/layout.tsx` validates the segment and calls `notFound()` for anything else. The layout's `generateStaticParams` emits both locales, so the site stays static.

### UI messages

`src/i18n/en.json` and `src/i18n/pt-BR.json` are flat objects with dotted keys (`"lesson.check": "Check"`).

```ts
// src/i18n/index.ts
export const locales = ["en", "pt-BR"] as const;
export type Locale = (typeof locales)[number];
export type MessageKey = keyof typeof en;

export function t(locale: Locale, key: MessageKey, vars?: Record<string, string | number>): string;
export function localize(locale: Locale, text: Text): string;
```

- `MessageKey` is derived from `en.json`, so an unknown key fails the build. `pt-BR.json` is typed `Partial<Record<MessageKey, string>>`; a missing key falls back to English.
- Interpolation replaces `{name}` placeholders. No plural rules: counts carry their unit inside the string ("4 days" / "4 dias").
- `localize()` returns `text[locale] ?? text.en`.
- Components receive `locale` as a prop from the page params. No context or hook.

### Locale switch

The header chip is a `<Link>` to the same route under the other locale. No cookie; the URL is the source of truth and `/` is only visited once.

Code highlighting and fill-blank expected answers are never translated; they are code.

## 6. Testing and validation

Vitest, no Testing Library in the MVP.

### Content validation — `src/content/content.test.ts`

One test walks every track and asserts, per lesson with content:

- lesson ids are unique across the track and kebab-case
- 5 to 8 exercises
- `single-choice`: `correct` indexes an existing option; no duplicate options
- `multi-choice`: `correct` has 2+ valid, distinct indexes
- `fill-blank`: `code` contains exactly one `___` and `answer` is non-empty
- every `Text` has a non-empty `en`

Units with `lessons: []` are accepted.

### Progress — `src/lib/progress.test.ts`

`localStorage` mocked with a `Map` in `beforeEach`. Cases: `load()` with empty storage or invalid JSON returns `EMPTY`; `completeLesson` is idempotent; streak for same day, next day, and a gap; `lessonStatus` for the first lesson, the one after a completed lesson, and a locked one.

### Answer checking — `src/lib/check.test.ts`

`isCorrect(exercise, answer)` in `src/lib/check.ts` is pure and covers the three exercise types, including trim and case-insensitivity for fill-blank and order-insensitivity for multi-choice.

### i18n — `src/i18n/i18n.test.ts`

`t()` interpolates and falls back to English; `localize()` falls back to `en`; `pt-BR.json` has no key missing from `en.json`.

### Out of scope

Component and end-to-end tests. `LessonRunner` is state and render only. Playwright joins when the project grows, covering "open track → do a lesson → see XP".

### Scripts and CI

- `npm run lint`: ESLint (Next config) + Prettier check.
- `npm test`: `vitest run`.
- `npm run build`: `tsc --noEmit && vitest run && next build`, so broken content never deploys.
- GitHub Actions runs `lint`, `test`, and `build` on pull requests. No husky.

## 7. Repository layout

```
.nvmrc
src/
  app/[locale]/
    layout.tsx
    page.tsx                       → redirect to /[locale]/react
    [track]/page.tsx
    [track]/[lessonId]/page.tsx
  components/
  content/
    types.ts
    tracks.ts
    react.ts
    react/beginner/*.ts
    content.test.ts
  i18n/
    en.json
    pt-BR.json
    index.ts
    i18n.test.ts
  lib/
    progress.ts
    progress.test.ts
    check.ts
    check.test.ts
  proxy.ts
docs/superpowers/specs/
```

## 8. Content scope for the MVP

React track, fully named:

- Beginner: JSX basics · Components & props · State with useState · Handling events · Lists & keys · Conditional rendering · Forms
- Intermediate: useEffect · Lifting state up · Context · Refs · Custom hooks · Performance basics
- Advanced: Reducers · Suspense & lazy · Error boundaries · Portals · Render patterns · Testing components
- Expert: Concurrent rendering · Server components · Compiler & memoization · Reconciliation internals

Only the first four Beginner units ship with lessons (3 to 5 lessons each, 5 to 8 exercises per lesson). Every other unit has `lessons: []`.

## 9. Out of scope for the MVP

Accounts, database sync, hearts/lives, leaderboards, code execution, a CMS, a track list page, per-exercise retry, plural rules, component and e2e tests.
