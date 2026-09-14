# DevLingo enhancements — design spec

Date: 2026-09-13
Status: approved
Extends: `2026-09-06-devlingo-mvp-design.md`, `2026-09-06-jump-here-design.md`, `2026-09-07-track-expansion-design.md`

## Summary

Ten enhancements across pedagogy, UX, navigation, technical foundation, and content:
1. Immediate spaced repetition: wrong answers in regular lessons are re-enqueued to the end until mastered.
2. Rich educational explanations: optional `explanation: Text` on exercises explaining why answers are correct/wrong for interviews.
3. Engaging streak mechanics: dynamic streak state distinguishes active today, at-risk, and inactive.
4. Auto-focus on fill-in-the-blank code inputs for keyboard-first navigation.
5. Visual SVG path connecting track nodes like Duolingo.
6. Track selector in the header supporting multi-track exploration and preview tracks.
7. Locale cookie persistence (`devlingo_locale`) so language selection survives visits to `/`.
8. Accessible dialog focus trap and scroll-lock.
9. PWA manifest, service worker for offline use, and comprehensive Open Graph metadata.
10. Completion of the Beginner tier with `conditional-rendering` and `forms` units (72 exercises).

---

## 1. Immediate Spaced Repetition (Review Mistakes)

### Model & Rules
- Applies to `mode.kind === "lesson"` only. Challenges retain their 3-mistakes-and-out mechanic.
- `LessonRunner` executes a queue of indices: `queue: number[]` initialized with `[0, 1, ..., exercises.length - 1]`.
- When an exercise at cursor `c` is answered incorrectly, its index `queue[c]` is appended to `queue`.
- The progress bar reflects `solvedSet.size / exercises.length`, where `solvedSet` contains original exercise indices answered correctly.
- The lesson only completes when cursor reaches the end of `queue` (100% correct answers).

---

## 2. Rich Educational Explanations

### Model
- `SingleChoice`, `MultiChoice`, and `FillBlank` gain `explanation?: Text`.
- When present, `explanation` is displayed using `RichText` in the checked footer banner upon a wrong answer (and accessible on review).
- Content tests validate that if `explanation` is provided, both `en` and `pt-BR` are present and have balanced backticks.

---

## 3. Dynamic Streak State

### Model
- In `src/lib/progress.ts`, export `getStreakStatus(progress: Progress, today?: Date)`:
  - `activeToday`: `lastActiveDay === todayKey` (flame lit orange).
  - `atRisk`: `lastActiveDay === yesterdayKey` (flame pulsing with call-to-action).
  - `inactive`: streak broken (0 active days).
- Header visually reflects these states with distinct styling and tooltips.

---

## 4. Fill-in-the-Blank Auto-focus

- `FillBlank.tsx` focuses its `<input>` upon mounting or when transitioning to a new exercise in "answering" state.

---

## 5. Visual Connecting Path

- `TrackPath.tsx` renders an SVG layer beneath lesson nodes.
- Curves connect `(x_i, y_i)` to `(x_{i+1}, y_{i+1})` using smooth bezier curves (`M x1 y1 C ... x2 y2`).
- Completed segments render in primary/success tone; locked segments render dashed in border color.

---

## 6. Multi-track Selector

- Header includes a track button showing the active track ("React") with level and progress percentage.
- Tapping opens a selector modal listing:
  - Active: React
  - Upcoming (Coming Soon): TypeScript, Next.js, Web Fundamentals (CSS/HTML), Node.js.

---

## 7. Locale Cookie Persistence

- `LocaleSwitcher` sets cookie `devlingo_locale=${other}; path=/; max-age=31536000; SameSite=Lax`.
- `proxy.ts` prioritizes this cookie over the `Accept-Language` header when redirecting `/`.

---

## 8. Dialog Focus Trap

- `Dialog.tsx` traps keyboard focus inside the dialog while open.
- Locks `document.body` scrolling while modal is open.
- Restores prior active element on close.

---

## 9. PWA & Open Graph

- `src/app/manifest.ts` provides metadata manifest for installation.
- `public/sw.js` caches static assets for offline readiness.
- `layout.tsx` registers service worker and exports comprehensive `openGraph` and `twitter` tags.

---

## 10. React Beginner Track Completion

- Adds Unit 6: `conditional-rendering` (3 lessons, 1 side quest, 1 challenge).
- Adds Unit 7: `forms` (3 lessons, 1 side quest, 1 challenge).
- Completes 100% of the Beginner level in `src/content/react.ts`.
