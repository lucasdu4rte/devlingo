# Track Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add optional double-XP side quests beside every unit, then fill the 23 "coming soon" units with lessons, challenges and side quests so the React track answers a real interview.

**Architecture:** `Unit.sideQuest?: Lesson` reuses the existing lesson type, route, runner and progress store; only the track screen and a few helpers are new. Content lands unit by unit, each unit a self-contained file that the existing validation test polices.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind v4, Vitest 5, npm, Node 24 via fnm.

**Spec:** `docs/superpowers/specs/2026-09-07-track-expansion-design.md`
**Coverage map (acceptance criterion for content):** `docs/react-interview-coverage.md`

## Progress

| Tasks | Status |
| --- | --- |
| 1–3: side quest infrastructure and initial content | Implemented in `d3e05cc`, `fa9c066`, `76f2849`, with integration fixes in `666dde8` |
| 4: Lists & keys | Implemented: 18 regular exercises, 15 challenge questions and 6 extra exercises |
| 5–26: remaining units | Pending; resume with Task 5, Conditional rendering |

Tasks 1–3 are historical implementation instructions. The table records their delivered state; their original red-test execution is not repeated when resuming the plan.

## Global Constraints

- Node via `fnm`; use `fnm exec --using 24 <command>` when shell initialization is unavailable.
- Before every commit: `npm run format && npm run lint && npx tsc --noEmit && npm test`. Content tasks also run `npm run build`.
- `next dev` writes `AGENTS.md`/`CLAUDE.md` at the repo root: delete them and commit with explicit `git add` paths. Leave `.claude/` untracked.
- Automated content rules in `src/content/content.test.ts`: three lessons with ids `<unit>-1..3`, side quest id `<unit>-extra`, 5–7 exercises per lesson and extra, exactly 15 per challenge, XP 20 / 30 / 30 and 60 for the side quest, at least one `fill-blank` and one `multi-choice` per lesson and extra, exactly one `___` per fill-blank with a single-token answer, varied correct answer positions, bilingual prompts/titles/descriptions, nonempty translations and balanced prose backticks. Unit and lesson ids are unique, including extras and coming-soon units.
- Editorial checks: sentence-like options have both languages; English-only options are raw code by the existing `isCode` convention. Reviewers must check that prose is not misclassified, inline code is backticked, each prompt states the multi-choice selection count, and every answer or answer set is uniquely defensible under React 19 semantics. Structural tests cannot establish semantic correctness or topic coverage.
- Every challenge covers all regular units before its target across all preceding levels. Passing skips that complete prerequisite path; side quests and the target unit's own topics are excluded.
- No comments in code beyond deliberate `// ponytail:` notes. Early returns, no nested ternaries. Conventional Commits ≤72 chars, no attribution trailers.
- Work on branch `feat/track-expansion` (already created, holds the four new unit stubs and the coverage map).

---

## File structure

```
src/content/types.ts                     Unit.sideQuest
src/content/tracks.ts                    sideQuestsOf, findLesson covering side quests
src/content/content.test.ts              side quest rules
src/content/react/<level>/<unit>.ts      one file per unit
src/components/SideQuestNode.tsx         the offset node
src/components/TrackPath.tsx             positioning, popover wiring, extras counter
src/components/LessonPopover.tsx         "Extra" tag
src/i18n/{en,pt-BR}.json                 track.extra, track.extrasCount
```

---

### Task 1: Side quest model and helpers

**Files:**
- Modify: `src/content/types.ts`, `src/content/tracks.ts`, `src/content/content.test.ts`
- Test: `src/content/tracks.test.ts`

**Interfaces:**
- Produces: `Unit.sideQuest?: Lesson`; `type SideQuestRef = { lesson: Lesson; unit: Unit; level: Level; previousLessonId: string | null }`; `sideQuestsOf(track): SideQuestRef[]`; `findLesson` also resolves side quest ids, returning a ref whose `previousLessonId` is the last lesson before the unit.

- [ ] **Step 1: Type** — `src/content/types.ts`:

```ts
export type Unit = { id: string; title: Text; lessons: Lesson[]; challenge?: Exercise[]; sideQuest?: Lesson };
```

- [ ] **Step 2: Failing tests** — append to `src/content/tracks.test.ts`:

```ts
describe("sideQuestsOf", () => {
  test("returns one ref per unit that has a side quest", () => {
    const refs = sideQuestsOf(react);
    const withQuests = unitsOf(react).filter(({ unit }) => unit.sideQuest);
    expect(refs.length).toBe(withQuests.length);
    refs.forEach((ref) => expect(ref.lesson.id).toBe(`${ref.unit.id}-extra`));
  });
  test("unlocks with its unit, not after it", () => {
    const first = sideQuestsOf(react)[0];
    expect(first.previousLessonId).toBe(null);
    const second = sideQuestsOf(react)[1];
    expect(second.previousLessonId).toBe(lessonsBefore(react, second.unit.id).at(-1)?.lesson.id);
  });
  test("side quests stay out of the main chain", () => {
    const chain = lessonsOf(react).map((ref) => ref.lesson.id);
    sideQuestsOf(react).forEach((ref) => expect(chain).not.toContain(ref.lesson.id));
  });
});

test("findLesson resolves a side quest", () => {
  const ref = findLesson(react, "jsx-basics-extra");
  expect(ref?.lesson.id).toBe("jsx-basics-extra");
  expect(ref?.previousLessonId).toBe(null);
});
```

- [ ] **Step 3: Run to verify they fail** — `npx vitest run src/content/tracks` → `sideQuestsOf` is not exported.

- [ ] **Step 4: Implement** — in `src/content/tracks.ts`:

```ts
export type SideQuestRef = {
  lesson: Lesson;
  unit: Unit;
  level: Level;
  previousLessonId: string | null;
};

export function sideQuestsOf(track: Track): SideQuestRef[] {
  return unitsOf(track)
    .filter(({ unit }) => unit.sideQuest)
    .map(({ unit, level }) => ({
      lesson: unit.sideQuest as Lesson,
      unit,
      level,
      previousLessonId: lessonsBefore(track, unit.id).at(-1)?.lesson.id ?? null,
    }));
}
```

and extend `findLesson` so a side quest id resolves too:

```ts
export function findLesson(track: Track, lessonId: string): LessonRef | SideQuestRef | undefined {
  const main = lessonsOf(track).find((ref) => ref.lesson.id === lessonId);
  if (main) return main;
  return sideQuestsOf(track).find((ref) => ref.lesson.id === lessonId);
}
```

The lesson page uses `ref.lesson`, `ref.unit.title` and `ref.previousLessonId`, all present on both shapes, so it needs no change. Confirm with `tsc`; if the page reads a `LessonRef`-only field, widen the page's usage rather than the type.

- [ ] **Step 5: Content rules** — in `src/content/content.test.ts`, inside the track `describe`:

```ts
describe("side quests", () => {
  const units = unitsOf(track).map(({ unit }) => unit);
  test("exist exactly on units with lessons", () => {
    units.forEach((unit) => {
      expect(unit.sideQuest !== undefined, unit.id).toBe(unit.lessons.length > 0);
    });
  });
  describe.each(units.filter((u) => u.sideQuest))("side quest of $id", (unit) => {
    const quest = unit.sideQuest as Lesson;
    test("has the right id, size and double xp", () => {
      expect(quest.id).toBe(`${unit.id}-extra`);
      expect(quest.exercises.length).toBeGreaterThanOrEqual(5);
      expect(quest.exercises.length).toBeLessThanOrEqual(7);
      expect(quest.xp).toBe(2 * (unit.lessons.at(-1) as Lesson).xp);
    });
    test.each(quest.exercises.map((e, i) => [i, e] as const))("exercise %i is valid", (_, e) => {
      expectValidExercise(e);
    });
  });
});
```

Guard it with `describe.skipIf(units.every((u) => !u.sideQuest))` for this task only; Task 3 removes the guard once content exists.

- [ ] **Step 6: Verify** — `npm run format && npm run lint && npx tsc --noEmit && npm test`.

- [ ] **Step 7: Commit** — `feat(content): add side quest model and helpers`

---

### Task 2: Side quest on the track screen

**Files:**
- Create: `src/components/SideQuestNode.tsx`
- Modify: `src/components/TrackPath.tsx`, `src/components/LessonPopover.tsx`, `src/i18n/en.json`, `src/i18n/pt-BR.json`

**Interfaces:**
- Consumes: `sideQuestsOf`, `SideQuestRef`, `lessonStatus`.
- Produces: `SideQuestNode({ status, label, side, onClick })`; `LessonPopover` accepts `extra?: boolean`.

- [ ] **Step 1: i18n** — add to `en.json` (pt-BR in parentheses): `"track.extra": "Extra"` (Extra), `"track.extrasCount": "{done} / {total} extras"` ({done} / {total} extras).

- [ ] **Step 2: The node**

```tsx
import type { LessonStatus } from "@/lib/progress";
import { Lock, Star } from "./icons";

const styles: Record<LessonStatus, string> = {
  completed: "bg-xp text-canvas shadow-[0_5px_0_#b8860b]",
  current: "border-2 border-dashed border-xp bg-surface text-xp",
  locked: "bg-locked text-locked-text shadow-[0_5px_0_var(--locked-dark)]",
};

export function SideQuestNode({
  status,
  label,
  side,
  onClick,
}: {
  status: LessonStatus;
  label: string;
  side: "left" | "right";
  onClick: () => void;
}) {
  const Icon = status === "locked" ? Lock : Star;
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`absolute top-1/2 ${side === "left" ? "left-0" : "right-0"} flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full ${styles[status]}`}
    >
      <Icon size={22} />
    </button>
  );
}
```

- [ ] **Step 3: Positioning in `TrackPath`** — the per-unit node column (`<div className="flex flex-col items-center gap-6 pb-4 pt-6">`) gains `relative`, and inside it, for a unit with a side quest whose ref comes from `sideQuestsOf`:

```tsx
{questRef && (
  <SideQuestNode
    status={lessonStatus(questRef.lesson.id, questRef.previousLessonId, progress)}
    label={localize(locale, questRef.lesson.title)}
    side={unitIndex % 2 === 0 ? "left" : "right"}
    onClick={() => setOpen(questRef)}
  />
)}
```

Build `questByUnitId` once from `sideQuestsOf(track)` next to `refByLessonId`. `setOpen` already takes a ref shape with `lesson`/`unit`; widen its state type to `LessonRef | SideQuestRef | null`.

- [ ] **Step 4: Popover tag** — `LessonPopover` gains `extra?: boolean`. When true the tag renders `<Star size={13} />` plus `t(locale, "track.extra")` in `text-xp` instead of `track.lesson`, and the card border uses `border-xp` when unlocked. `TrackPath` passes `extra={!("indexInUnit" in open)}`.

- [ ] **Step 5: Extras counter** — in the progress card, below the lessons line, when `sideQuestsOf(track).length > 0`:

```tsx
<div className="flex justify-between text-sm text-muted">
  <span>{t(locale, "track.extrasCount", { done: extrasDone, total: quests.length })}</span>
</div>
```

with `extrasDone` counted the same way as `done`.

- [ ] **Step 6: Verify** — `npm run build`, then with the dev server confirm: with empty progress the first unit shows an amber dashed node on the right and the second unit one on the left; both open the popover with the "Extra" tag; a locked unit's extra is grey; completing an extra fills it amber and bumps the extras counter without unlocking the next unit. Check at 360px that the node does not overlap the path.

- [ ] **Step 7: Commit** — `feat(track): show side quests beside each unit`

---

### Task 3: Side quests for the four written units

**Files:**
- Modify: `src/content/react/beginner/jsx-basics.ts`, `components-props.ts`, `state.ts`, `events.ts`, `src/content/content.test.ts` (remove the `skipIf`)

Each unit gains `sideQuest: { id: "<unit>-extra", title, description, xp: 60, exercises: [...] }` with 5–7 exercises. Follow the **Content task recipe** below for style. Topics, framed by the problem:

| Unit | Title (en / pt-BR) | What the exercises must cover |
| --- | --- | --- |
| jsx-basics | Styling components / Estilizando componentes | Where styles live: a plain `className` with a stylesheet, CSS modules for scoping, utility classes, CSS-in-JS at runtime vs build time; why inline `style` takes an object; the trade-off each one makes |
| components-props | Component libraries / Bibliotecas de componentes | Why teams stop rebuilding buttons; what a design system gives (consistency, a11y, tokens); headless vs styled libraries; the cost of adopting one (bundle, customization, lock-in) |
| state | Global state / Estado global | State two distant components share; prop drilling as the symptom; what a store is (single source, actions, subscribers); Redux/Zustand as examples; when context or lifting is already enough |
| events | Forms at scale / Formulários em escala | Controlled inputs re-rendering a whole form; uncontrolled inputs plus a ref; what a form library gives (validation, errors, dirty state); why `onSubmit` beats a click handler |

- [ ] **Step 1** Write the four side quests, remove the `describe.skipIf` from the side quest suite.
- [ ] **Step 2** `npm run format && npm run lint && npx tsc --noEmit && npm test && npm run build` — the side quest suite must run and pass.
- [ ] **Step 3: Commit** — `feat(content): add side quests for the beginner units`

---

## Content task recipe

Tasks 4 onward each fill one unit. They are identical in shape; only the topics differ. Every content task follows this recipe exactly:

1. Read `src/content/react/beginner/state.ts` first as the reference for shape, tone, code-string conventions and pt-BR style.
2. Create `src/content/react/<level>/<unit>.ts` exporting `export const <camelId>: Unit` with `id`, `title`, `lessons`, `challenge` and `sideQuest`.
3. **Three lessons**, ids `<unit>-1..3`, XP 20/30/30, 5–7 exercises each, at least one fill-blank and one multi-choice per lesson, titles and one-sentence descriptions in both languages.
4. **Challenge** of exactly 15 exercises covering everything in the units *before* this one (not this unit), hard: code snippets whose answer depends on precise semantics, distractors that punish skimming.
5. **Side quest** `<unit>-extra`, 5–7 exercises, `xp: 60`, framed by the problem rather than the library.
6. Wire the unit into `src/content/react.ts`: import it and replace the matching `soon(...)` entry, keeping its position.
7. Verify `npm run format && npm run lint && npx tsc --noEmit && npm test && npm run build`. Fix content, never the test.
8. Self-review every answer key against React 19 semantics before committing.
9. Commit `feat(content): add the <unit> unit`.

The unit's acceptance criterion is the row for it in `docs/react-interview-coverage.md`: a learner who passes the unit can answer those numbered questions.

---

### Task 4: Lists & keys (Beginner)

**File:** `src/content/react/beginner/lists-keys.ts` · **Interview questions:** 7, 8

- [x] **Lesson 1 — Rendering a list / Renderizando uma lista:** `map` returning JSX; why a loop statement does not work inside braces; arrays as children; empty state; nesting `map` inside JSX vs extracting a variable.
- [x] **Lesson 2 — The key prop / A prop key:** what React uses keys for; keys must be unique among siblings, not globally; `key` is not readable as a prop; keys on the outermost element of the item, including on a `Fragment` (`<Fragment key>` vs `<>`).
- [x] **Lesson 3 — Choosing a key / Escolhendo a key:** index as key and what breaks (reorder, insert at the front, inputs keeping the wrong value); stable ids from the data; generating an id at render as an anti-pattern; when an index is acceptable (static, never reordered).
- [x] **Challenge (15):** everything from JSX basics through Handling events.
- [x] **Side quest — Long lists / Listas longas:** rendering ten thousand rows; recognizing DOM layout/paint cost in a measured scenario without assuming it is always the bottleneck; windowing/virtualization (render what fits, absolute offsets); pagination and infinite scroll as alternatives; the accessibility cost of virtualizing.

Verification on 2026-09-07: all 39 exercises completed through the browser, with English and pt-BR coverage; 360px extra/popover layout checked. Passing the challenge completed only the 12 prior regular lessons for 300 XP. Completing the extra awarded 60 XP without unlocking lesson 2; the regular lessons awarded 20/30/30 XP. Independent content review approved every answer set and both translations. No progress schema or permanent ids changed.

Final automated checks: `npm run format`, `npm run lint` and `npm run build -- --webpack` passed (319 tests, TypeScript, 57 static pages). The default Turbopack build could not bind an internal port in the execution environment, including on an escalated retry; the application configuration remains unchanged.

---

### Task 5: Conditional rendering (Beginner)

**File:** `src/content/react/beginner/conditional-rendering.ts` · **Interview questions:** feeds 45, 47

- [ ] **Lesson 1 — Showing and hiding / Mostrando e escondendo:** `if` before `return`; the ternary inside JSX; `&&` and the falsy-`0` trap; returning `null`.
- [ ] **Lesson 2 — Choosing what to render / Escolhendo o que renderizar:** picking a component from a map/lookup object; early returns for loading and error; nesting ternaries as an anti-pattern; extracting a component when a branch grows.
- [ ] **Lesson 3 — Conditional attributes / Atributos condicionais:** conditional `className`; passing `undefined` to omit a prop; boolean attributes (`disabled={isBusy}`); spreading a conditional object of props.
- [ ] **Challenge (15):** JSX basics through Lists & keys.
- [ ] **Side quest — Feature flags / Feature flags:** shipping code that is off; a flag as data, not a branch in every file; gating a component behind a flag; the cost of stale flags; flags vs branches for release.

---

### Task 6: Forms (Beginner)

**File:** `src/content/react/beginner/forms.ts` · **Interview questions:** 15, 63

- [ ] **Lesson 1 — Controlled inputs / Inputs controlados:** `value` + `onChange`; a read-only input as the missing-`onChange` symptom; `defaultValue` for uncontrolled; checkbox uses `checked`; textarea and select in React vs HTML.
- [ ] **Lesson 2 — Submitting / Enviando:** `onSubmit` on the form; `preventDefault`; reading several fields from one state object; disabling the button while submitting; resetting after success.
- [ ] **Lesson 3 — Validation and feedback / Validação e feedback:** validating on submit vs on change; storing errors in state; associating a message with an input (`htmlFor`, `aria-describedby`); when to trust the browser's own validation.
- [ ] **Challenge (15):** JSX basics through Conditional rendering.
- [ ] **Side quest — Schema validation / Validação por schema:** one description of the data's shape reused by form, API and types; parse-don't-validate; where a schema lives; what you lose without one.

---

### Task 7: useEffect (Intermediate)

**File:** `src/content/react/intermediate/use-effect.ts` · **Interview questions:** 26, 27, 41

- [ ] **Lesson 1 — Effects / Efeitos:** what an effect is for (synchronizing with something outside React); when it runs relative to paint; `useEffect` vs `useLayoutEffect`; effects do not run during SSR.
- [ ] **Lesson 2 — Dependencies / Dependências:** the dependency array's three shapes (absent, empty, listed); stale closures; objects and functions as dependencies; why lying to the linter hurts.
- [ ] **Lesson 3 — Cleanup / Limpeza:** returning a cleanup; subscriptions, timers, listeners; cleanup order between renders; StrictMode's double-invoke in development and what it exposes.
- [ ] **Challenge (15):** the whole Beginner level.
- [ ] **Side quest — Effects you should not write / Efeitos que você não deveria escrever:** deriving during render instead of syncing state; transforming data without an effect; handling events in handlers, not effects; when an effect really is the answer.

---

### Task 8: Data fetching (Intermediate)

**File:** `src/content/react/intermediate/data-fetching.ts` · **Interview questions:** 64, 65

- [ ] **Lesson 1 — Loading data / Carregando dados:** effect + state for data, loading and error; rendering all three states; why `async` cannot be the effect function itself.
- [ ] **Lesson 2 — Races and cancellation / Corridas e cancelamento:** two requests resolving out of order; an `ignore` flag in cleanup; `AbortController`; refetching when a prop changes.
- [ ] **Lesson 3 — Pitfalls / Armadilhas:** fetching in a component that unmounts; waterfalls from nested fetches; refetching on every render because of an object dependency; where the data should live.
- [ ] **Challenge (15):** Beginner plus useEffect.
- [ ] **Side quest — Server cache / Cache de servidor:** the server's data is a cache, not state; dedupe, staleness, invalidation, retry; what React Query and SWR give; the invalidation problem being the hard part.

---

### Task 9: Lifting state up (Intermediate)

**File:** `src/content/react/intermediate/lifting-state.ts` · **Interview questions:** 16, 44, 50

- [ ] **Lesson 1 — Sharing state / Compartilhando estado:** two siblings that need the same value; moving state to the closest common parent; passing value and setter down.
- [ ] **Lesson 2 — One-way data flow / Fluxo de dados unidirecional:** data down, events up; why a child cannot write a prop; controlled components as the same pattern; what Flux described.
- [ ] **Lesson 3 — When it hurts / Quando dói:** prop drilling through layers that do not care; composition (`children`) as an alternative; the signals that say to reach for context.
- [ ] **Challenge (15):** Beginner plus useEffect and data fetching.
- [ ] **Side quest — URL as state / URL como estado:** what belongs in the URL (filters, page, selection); shareable and back-button-safe state; a router as the reader/writer of that state; the trade-off of putting too much there.

---

### Task 10: Context (Intermediate)

**File:** `src/content/react/intermediate/context.ts` · **Interview questions:** 43, 46, 48

- [ ] **Lesson 1 — Providing and consuming / Provendo e consumindo:** `createContext`, provider, `useContext`; the default value and when it applies; nesting providers.
- [ ] **Lesson 2 — Re-renders / Re-renderizações:** every consumer re-renders when the value changes; a new object each render as the classic bug; memoizing the value; splitting one context into two.
- [ ] **Lesson 3 — Choosing / Escolhendo:** context vs lifting vs a store; context is not a state manager; a custom hook wrapping `useContext` with a guard.
- [ ] **Challenge (15):** Beginner plus useEffect, data fetching, lifting state.
- [ ] **Side quest — Theming and localization / Temas e localização:** sharing theme and locale through context; tokens vs hardcoded colors; system preference and first-paint consistency; translation catalogs and language fallback; locale-aware number/date formatting with `Intl`, without requiring a translation library's API (question 80).

---

### Task 11: Refs (Intermediate)

**File:** `src/content/react/intermediate/refs.ts` · **Interview questions:** 28, 36

- [ ] **Lesson 1 — useRef / useRef:** a box that survives renders without causing one; reading `.current`; ref vs state; a ref for the previous value.
- [ ] **Lesson 2 — DOM refs / Refs de DOM:** attaching to an element; focusing and measuring; when the ref is populated; a callback ref.
- [ ] **Lesson 3 — Forwarding / Encaminhando:** passing a ref to a child; `ref` as a normal prop in React 19 and what `forwardRef` did before; `useImperativeHandle` in one breath; why exposing imperative APIs is a last resort.
- [ ] **Challenge (15):** Beginner plus useEffect, data fetching, lifting state, context.
- [ ] **Side quest — Animation / Animação:** why animating means touching the DOM every frame; CSS transitions first; what a motion library gives (interruption, layout, exit); animating a list that reorders.

---

### Task 12: Custom hooks (Intermediate)

**File:** `src/content/react/intermediate/custom-hooks.ts` · **Interview questions:** 24, 25, 34

- [ ] **Lesson 1 — Rules of hooks / Regras dos hooks:** top level only; why order matters; hooks in components and other hooks only; the `use` prefix convention.
- [ ] **Lesson 2 — Extracting a hook / Extraindo um hook:** moving stateful logic out of a component; what a hook returns; two components using one hook do not share state.
- [ ] **Lesson 3 — Designing hooks / Desenhando hooks:** arguments and returns that read well; a hook that wraps an effect; composing hooks; when it should have been a plain function.
- [ ] **Challenge (15):** Beginner plus useEffect through refs.
- [ ] **Side quest — Hook collections / Coleções de hooks:** what libraries of hooks solve; judging one before adopting; copying instead of installing; hooks that hide a subscription.

---

### Task 13: TypeScript with React (Intermediate)

**File:** `src/content/react/intermediate/typescript.ts` · **Interview questions:** 19, 22

- [ ] **Lesson 1 — Typing props / Tipando props:** a props type; optional props and defaults; `children` as `ReactNode`; union props that make impossible states unrepresentable.
- [ ] **Lesson 2 — Typing hooks / Tipando hooks:** `useState<T>` and inference; state that starts `null`; typing a ref; typing a custom hook's return.
- [ ] **Lesson 3 — Events and generics / Eventos e genéricos:** typing a change and submit handler; `React.ComponentProps` to inherit an element's props; a generic component (a typed list); `PropTypes` as the runtime predecessor.
- [ ] **Challenge (15):** Beginner plus useEffect through custom hooks.
- [ ] **Side quest — Generated types / Tipos gerados:** types from the API's schema instead of by hand; drift between server and client; where generation belongs; the limits of trusting generated types.

---

### Task 14: Performance basics (Intermediate)

**File:** `src/content/react/intermediate/performance.ts` · **Interview questions:** 17, 30, 31, 35, 56

- [ ] **Lesson 1 — What re-renders / O que re-renderiza:** a state change re-renders the component and its subtree; a re-render is not a DOM update; children as props escaping a re-render.
- [ ] **Lesson 2 — memo, useMemo, useCallback:** what each memoizes; reference equality as the reason `useCallback` exists; when memoizing costs more than it saves.
- [ ] **Lesson 3 — Expensive work / Trabalho caro:** keeping the main thread free; debouncing input; moving work out of render; measuring before optimizing.
- [ ] **Challenge (15):** the whole Beginner level plus useEffect through TypeScript.
- [ ] **Side quest — Measuring / Medindo:** the Profiler and what its flame graph says; why "it feels slow" is not a diagnosis; the metric that matches the complaint; optimizing the wrong thing.

---

### Task 15: Reducers (Advanced)

**File:** `src/content/react/advanced/reducers.ts` · **Interview questions:** 32

- [ ] **Lesson 1 — useReducer / useReducer:** state, action, reducer; `dispatch` instead of setters; when it beats `useState`.
- [ ] **Lesson 2 — Writing reducers / Escrevendo reducers:** pure, no mutation, returns the next state; the default case; deriving instead of storing; the lazy initializer.
- [ ] **Lesson 3 — Reducer plus context / Reducer com context:** passing state and dispatch down; splitting the two contexts; where this stops being enough.
- [ ] **Challenge (15):** all preceding units, from JSX basics through Performance basics (Beginner and Intermediate).
- [ ] **Side quest — State machines / Máquinas de estado:** the impossible states a boolean soup allows; states and transitions as data; what XState formalizes; when a reducer is already the machine.

---

### Task 16: Suspense & lazy (Advanced)

**File:** `src/content/react/advanced/suspense.ts` · **Interview questions:** 38, 42, 51

- [ ] **Lesson 1 — Suspense / Suspense:** a boundary and its fallback; what suspending means; nesting boundaries for granularity.
- [ ] **Lesson 2 — lazy / lazy:** `lazy` + `import()`; where the boundary goes; what code splitting does to the bundle; splitting by route.
- [ ] **Lesson 3 — Loading UX / UX de carregamento:** skeleton vs spinner; layout shift; avoiding a fallback flash; `useTransition` keeping the old UI in place.
- [ ] **Challenge (15):** all preceding units, from JSX basics through Reducers.
- [ ] **Side quest — Bundles / Bundles:** what ships on first load; a bundle analyzer's picture; a dependency that costs more than the feature; splitting by route vs by interaction.

---

### Task 17: Error boundaries (Advanced)

**File:** `src/content/react/advanced/error-boundaries.ts` · **Interview questions:** 37

- [ ] **Lesson 1 — Catching render errors / Capturando erros de renderização:** what a boundary catches and what it does not (events, async, SSR); the class API; the fallback.
- [ ] **Lesson 2 — Placement / Posicionamento:** one at the root vs one per region; resetting a boundary; what the user should see.
- [ ] **Lesson 3 — Errors outside render / Erros fora da renderização:** try/catch in handlers and async code; error state in a reducer; unhandled rejections.
- [ ] **Challenge (15):** all preceding units, from JSX basics through Suspense & lazy.
- [ ] **Side quest — Error monitoring / Monitoramento de erros:** knowing it broke for someone else; what a report needs (stack, release, user path); source maps; noise and sampling.

---

### Task 18: Portals (Advanced)

**File:** `src/content/react/advanced/portals.ts` · **Interview questions:** 40

- [ ] **Lesson 1 — createPortal / createPortal:** rendering into another DOM node while staying in the React tree; the problem it solves (overflow, stacking).
- [ ] **Lesson 2 — Events through portals / Eventos através de portais:** bubbling follows the React tree, not the DOM; a click outside a portal; context still reaching it.
- [ ] **Lesson 3 — Overlays / Sobreposições:** a dialog's focus, Escape and scroll lock; `aria-modal`; returning focus on close.
- [ ] **Challenge (15):** all preceding units, from JSX basics through Error boundaries.
- [ ] **Side quest — Accessible overlays / Sobreposições acessíveis:** what a keyboard user needs from a dialog; the focus trap; what a headless library gives; why hand-rolled dialogs break.

---

### Task 19: Render patterns (Advanced)

**File:** `src/content/react/advanced/render-patterns.ts` · **Interview questions:** 18, 33, 47, 62

- [ ] **Lesson 1 — Composition / Composição:** `children` as the default extension point; slots as props; composition instead of configuration flags.
- [ ] **Lesson 2 — HOCs and render props / HOCs e render props:** what each solved; how hooks replaced most of them; where they still appear; the wrapper-hell cost.
- [ ] **Lesson 3 — Anti-patterns / Anti-padrões:** components defined inside components; keys from indexes; state duplicated from props; side effects during render.
- [ ] **Challenge (15):** all preceding units, from JSX basics through Portals.
- [ ] **Side quest — Headless components / Componentes headless:** behavior and accessibility without markup; the styling freedom it buys; what you take on; `useId` and generated ids as the glue.

---

### Task 20: Testing components (Advanced)

**File:** `src/content/react/advanced/testing.ts` · **Interview questions:** 87, 88, 89, 90, 91, 92, 93, 94, 96, 97

- [ ] **Lesson 1 — What to test / O que testar:** behavior over implementation; rendering and asserting on what a user sees; queries by role and label; what a snapshot is worth.
- [ ] **Lesson 2 — Interaction / Interação:** firing events; `findBy` and waiting; testing a form; testing a component that uses context.
- [ ] **Lesson 3 — Async and mocks / Assíncrono e mocks:** mocking a fetch; faking timers; testing a custom hook; a test that passes for the wrong reason.
- [ ] **Challenge (15):** all preceding units, from JSX basics through Render patterns.
- [ ] **Side quest — End-to-end tests / Testes ponta a ponta:** the click a unit test cannot make; the pyramid and its cost; flakiness and what causes it; what belongs in E2E and what does not.

---

### Task 21: Class components (Advanced)

**File:** `src/content/react/advanced/class-components.ts` · **Interview questions:** 10, 11, 29, 53

- [ ] **Lesson 1 — The class API / A API de classe:** `render`, `this.props`, `this.state`; `setState` merging, not replacing; the callback argument and why it exists.
- [ ] **Lesson 2 — Lifecycle / Ciclo de vida:** mount, update, unmount; the three methods that matter today; the `useEffect` equivalents; `componentDidCatch` still being class-only.
- [ ] **Lesson 3 — Reading old code / Lendo código antigo:** binding `this`; a class translated to a function component; when a class is still the answer.
- [ ] **Challenge (15):** all preceding units, from JSX basics through Testing components.
- [ ] **Side quest — Migrating / Migrando:** moving a legacy screen forward without a rewrite; the order that keeps it shippable; what not to convert; the risk of a big-bang migration.

---

### Task 22: Concurrent rendering (Expert)

**File:** `src/content/react/expert/concurrent.ts` · **Interview questions:** 54, 55, 109

- [ ] **Lesson 1 — Interruptible rendering / Renderização interrompível:** React can pause and resume; urgent vs non-urgent updates; what that buys a typing user.
- [ ] **Lesson 2 — useTransition / useTransition:** marking an update as a transition; `isPending`; the stale UI staying interactive.
- [ ] **Lesson 3 — useDeferredValue / useDeferredValue:** deferring a value instead of an update; when it beats a transition; debounce compared with both.
- [ ] **Challenge (15):** all preceding units, from JSX basics through Class components (Beginner, Intermediate and Advanced).
- [ ] **Side quest — Streaming / Streaming:** HTML arriving in pieces; what the user sees first; Suspense boundaries as flush points; the cost to time-to-interactive.

---

### Task 23: Actions & the use hook (Expert)

**File:** `src/content/react/expert/actions.ts` · **Interview questions:** 101, 102, 103, 104, 105, 110

- [ ] **Lesson 1 — Actions / Actions:** an async function passed to `action`; pending, error and result handled for you; the form that works before hydration.
- [ ] **Lesson 2 — useActionState / useActionState:** the reducer-shaped signature; the returned state and pending flag; submitting the same action twice.
- [ ] **Lesson 3 — useOptimistic and use / useOptimistic e use:** showing the result before the server answers; reverting on failure; `use` reading a promise or context; why `use` is not `useEffect` + fetch.
- [ ] **Challenge (15):** all preceding units, from JSX basics through Concurrent rendering.
- [ ] **Side quest — Forms without a client / Formulários sem cliente:** what still works with JavaScript off; progressive enhancement as a default; where that stops being possible.

---

### Task 24: Server components (Expert)

**File:** `src/content/react/expert/server-components.ts` · **Interview questions:** 39, 57, 58, 106, 107

- [ ] **Lesson 1 — Server vs client / Servidor vs cliente:** where each runs; what a server component cannot do (state, effects, handlers); `"use client"` as a boundary, not a file type.
- [ ] **Lesson 2 — Composing them / Compondo:** passing server-rendered children into a client component; serializable props; the waterfall to avoid.
- [ ] **Lesson 3 — Rendering strategies / Estratégias de renderização:** SSR, static generation, hydration; what hydration is and how it fails; when each strategy fits.
- [ ] **Challenge (15):** all preceding units, from JSX basics through Actions & the use hook.
- [ ] **Side quest — Frameworks / Frameworks:** who runs your React; what a framework owns (routing, bundling, data, deployment); the lock-in trade; React without one.

---

### Task 25: Compiler & memoization (Expert)

**File:** `src/content/react/expert/compiler.ts` · **Interview questions:** 108

- [ ] **Lesson 1 — What the compiler does / O que o compilador faz:** memoizing automatically; the rules it relies on; what it does not fix.
- [ ] **Lesson 2 — Code it can and cannot help / Código que ele ajuda ou não:** mutation during render; escape hatches; when hand-written `useMemo` still earns its place.
- [ ] **Lesson 3 — Adopting it / Adotando:** the linter first; incremental adoption; reading the output; measuring the difference.
- [ ] **Challenge (15):** all preceding units, from JSX basics through Server components.
- [ ] **Side quest — Build tooling / Ferramentas de build:** what a bundler does to your source; dev server vs production build; source maps; the build step you should understand before debugging one.

---

### Task 26: Reconciliation internals (Expert)

**File:** `src/content/react/expert/reconciliation.ts` · **Interview questions:** 3, 4, 12, 13, 14

- [ ] **Lesson 1 — The virtual DOM / O DOM virtual:** an element tree as plain objects; diffing; the benefit and the cost of the abstraction; Shadow DOM being unrelated.
- [ ] **Lesson 2 — Reconciliation / Reconciliação:** the same position, the same type, keys; when state is preserved and when it is thrown away; remounting on a type change.
- [ ] **Lesson 3 — Fiber / Fiber:** work split into units; render and commit phases; why that is what makes interruption possible.
- [ ] **Challenge (15):** all preceding units, from JSX basics through Compiler & memoization, across every level.
- [ ] **Side quest — Reading React's source / Lendo o código do React:** where to start; the packages that matter; reading a PR or an RFC; when curiosity pays off.

---

## Self-review

**Spec coverage:** side quest model → Task 1; screen → Task 2; content standard and the 23 units → Tasks 3–26; tests → Tasks 1 and 3; ordering (infrastructure, then level by level) → task order.

**Deliberate compression:** the 23 content tasks share one recipe instead of repeating identical instructions 23 times; each task carries its own full topic table, which is the part that varies. Writing 900 exercises inline in a plan would make it unreadable and would duplicate the content files themselves.

**Type consistency:** `SideQuestRef` fields match across Tasks 1 and 2; `sideQuestsOf`/`findLesson` signatures match their consumers; the `<unit>-extra` id convention and the 2× XP rule are stated identically in Tasks 1, 3 and the recipe.

**Scale warning for the executor:** each content task is roughly 36 exercises and takes a full session's attention. Do not batch them. Ship after any task: units not yet written stay "coming soon", which is a valid released state.
