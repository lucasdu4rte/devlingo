# devlingo MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the devlingo MVP: a static Next.js site with the React track, a Duolingo-style lesson path, three exercise types, XP/streak progress in localStorage, dark/light theme, and en + pt-BR.

**Architecture:** Typed content files in `src/content` feed two screens under `src/app/[locale]/`: the track (path of lessons) and the lesson runner. Pure modules in `src/lib` own progress, answer checking, and highlighting; UI components are thin. Everything renders statically; a small `proxy.ts` only redirects `/` to a locale.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shiki, Vitest 5, npm, Node 24 via fnm.

**Spec:** `docs/superpowers/specs/2026-09-06-devlingo-mvp-design.md`

## Global Constraints

- Node via `fnm`; `.nvmrc` pins `24`. Never install Node another way. In the Bash tool run `eval "$(fnm env --shell zsh)"` before `node`/`npm` if `node` is not on PATH.
- Package manager: npm. Scripts: `dev`, `build` (`tsc --noEmit && vitest run && next build`), `lint` (`eslint . && prettier --check .`), `test` (`vitest run`).
- Locales: `en` (default and fallback) and `pt-BR`. UI strings only through `t()`; lesson content strings are `{ en, "pt-BR"? }` through `localize()`.
- Lesson ids are global, flat, stable kebab-case (`jsx-basics-1`). Never rename.
- Progress key `devlingo:progress`; theme key `devlingo:theme`. Dark is the default theme.
- Code style: minimum that works, early returns, no nested ternaries, no comments that restate code, no speculative abstractions. Deliberate shortcuts get a `// ponytail:` comment.
- Commits follow Conventional Commits. Never push. Never add a Co-Authored-By trailer.
- Colors only through the semantic Tailwind tokens defined in Task 7 (`bg-canvas`, `text-muted`, …), never raw hex in components.
- Icons are inline SVG, never emoji. Hit targets ≥ 44px on mobile.
- No idle animation on the exercise screen. All motion respects `prefers-reduced-motion`.

---

## File structure

```
.nvmrc                              Node 24
.prettierrc / .prettierignore
vitest.config.ts                    alias @ → src, node environment
.github/workflows/ci.yml            lint, test, build on PR
src/proxy.ts                        "/" → "/<locale>"
src/app/globals.css                 tokens, fonts, motion
src/app/[locale]/layout.tsx         root layout: html lang, fonts, theme script, ViewTransition
src/app/[locale]/page.tsx           redirect → /[locale]/react
src/app/[locale]/[track]/page.tsx   track screen (server) + Header + side cards
src/app/[locale]/[track]/[lessonId]/page.tsx  lesson screen (server) → LessonRunner
src/components/Header.tsx           brand, streak, XP, ThemeToggle, LocaleSwitcher (client)
src/components/ThemeToggle.tsx
src/components/LocaleSwitcher.tsx
src/components/icons.tsx            SVG icons
src/components/Button.tsx           the big 3D button
src/components/TrackPath.tsx        client: nodes + popover state
src/components/LessonNode.tsx
src/components/LessonPopover.tsx
src/components/LessonRunner.tsx     client state machine
src/components/SingleChoice.tsx
src/components/MultiChoice.tsx
src/components/FillBlank.tsx
src/components/ProgressBar.tsx
src/components/CodeBlock.tsx        renders highlighted HTML
src/components/LessonComplete.tsx
src/content/types.ts                Locale, Text, Exercise, Lesson, Unit, Level, Track
src/content/tracks.ts               tracks, findTrack, lessonsOf
src/content/react.ts                React track: levels and units
src/content/react/beginner/{jsx-basics,components-props,state,events}.ts
src/content/content.test.ts
src/i18n/{index.ts,en.json,pt-BR.json,i18n.test.ts}
src/lib/progress.ts / progress.test.ts
src/lib/check.ts / check.test.ts
src/lib/highlight.ts
```

---

### Task 1: Scaffold and tooling

**Files:**
- Create: `.nvmrc`, `vitest.config.ts`, `.prettierrc`, `.prettierignore`, `package.json` scripts
- Modify: `.gitignore` (append), `tsconfig.json` (exclude tests from Next type-check is not needed; keep as generated)

**Interfaces:**
- Produces: npm scripts `dev`, `build`, `lint`, `test`; `@/` alias resolving to `src/` in both Next and Vitest.

- [ ] **Step 1: Pin Node and scaffold in a temp dir** (the repo already has `docs/` and `.superpowers/`, and create-next-app refuses non-empty dirs with unknown entries)

```bash
cd /Users/lucasduarte/Apps/study/devlingo
echo 24 > .nvmrc
eval "$(fnm env --shell zsh)" && fnm use
SCAFFOLD=/private/tmp/claude-501/-Users-lucasduarte-Apps-study-devlingo/40e8b984-1590-4876-8ffd-0f6e4805fcd3/scratchpad/scaffold
rm -rf "$SCAFFOLD" && mkdir -p "$SCAFFOLD"
npx -y create-next-app@latest "$SCAFFOLD" --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --disable-git --yes
rsync -a --exclude node_modules "$SCAFFOLD"/ ./
```

- [ ] **Step 2: Merge .gitignore and remove scaffold noise**

```bash
grep -q '^.superpowers/' .gitignore || printf '\n.superpowers/\n' >> .gitignore
rm -f src/app/page.tsx src/app/layout.tsx public/*.svg
rm -f AGENTS.md
```

(`src/app/layout.tsx` is removed because the root layout will live in `src/app/[locale]/layout.tsx`, Task 7.)

- [ ] **Step 3: Install dev tooling**

```bash
npm install
npm install -D vitest prettier
```

- [ ] **Step 4: Vitest config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  test: { environment: "node", include: ["src/**/*.test.ts"] },
});
```

- [ ] **Step 5: Prettier config**

Create `.prettierrc`:

```json
{ "printWidth": 100 }
```

Create `.prettierignore`:

```
.next
node_modules
.superpowers
package-lock.json
```

- [ ] **Step 6: Scripts**

Edit `package.json` `"scripts"` to exactly:

```json
{
  "dev": "next dev",
  "build": "tsc --noEmit && vitest run && next build",
  "start": "next start",
  "lint": "eslint . && prettier --check .",
  "format": "prettier --write .",
  "test": "vitest run"
}
```

- [ ] **Step 7: Smoke test placeholder page so the build passes**

Create `src/app/[locale]/page.tsx` (temporary, replaced in Task 8):

```tsx
export default function Page() {
  return <main>devlingo</main>;
}
```

Create `src/app/[locale]/layout.tsx` (temporary, replaced in Task 7):

```tsx
import "../globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

Create `src/lib/smoke.test.ts` (deleted in Task 3):

```ts
import { expect, test } from "vitest";

test("vitest runs", () => {
  expect(1 + 1).toBe(2);
});
```

- [ ] **Step 8: Verify**

Run: `npm run format && npm run lint && npm run build`
Expected: prettier writes, lint passes, vitest reports 1 passed, `next build` succeeds with route `/[locale]`.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "chore: scaffold next.js app with vitest and prettier"
```

---

### Task 2: Content types and i18n

**Files:**
- Create: `src/content/types.ts`, `src/i18n/index.ts`, `src/i18n/en.json`, `src/i18n/pt-BR.json`
- Test: `src/i18n/i18n.test.ts`

**Interfaces:**
- Produces:
  - `locales: readonly ["en", "pt-BR"]`, `type Locale`, `type Text = { en: string; "pt-BR"?: string }`
  - `Exercise`, `Lesson`, `Unit`, `Level`, `Track` types as in the spec
  - `t(locale: Locale, key: MessageKey, vars?: Record<string, string | number>): string`
  - `localize(locale: Locale, text: Text): string`
  - `isLocale(value: string): value is Locale`

- [ ] **Step 1: Types**

Create `src/content/types.ts`:

```ts
export const locales = ["en", "pt-BR"] as const;
export type Locale = (typeof locales)[number];
export type Text = { en: string; "pt-BR"?: string };

export type SingleChoice = {
  type: "single-choice";
  prompt: Text;
  code?: string;
  options: Text[];
  correct: number;
};
export type MultiChoice = {
  type: "multi-choice";
  prompt: Text;
  code?: string;
  options: Text[];
  correct: number[];
};
export type FillBlank = { type: "fill-blank"; prompt: Text; code: string; answer: string };
export type Exercise = SingleChoice | MultiChoice | FillBlank;

export type Lesson = { id: string; title: Text; description: Text; xp: number; exercises: Exercise[] };
export type Unit = { id: string; title: Text; lessons: Lesson[] };
export type LevelId = "beginner" | "intermediate" | "advanced" | "expert";
export type Level = { id: LevelId; title: Text; units: Unit[] };
export type Track = { id: string; title: Text; levels: Level[] };
```

- [ ] **Step 2: Failing i18n tests**

Create `src/i18n/i18n.test.ts`:

```ts
import { describe, expect, test } from "vitest";
import en from "./en.json";
import ptBR from "./pt-BR.json";
import { localize, t } from "./index";

describe("t", () => {
  test("returns the english string", () => {
    expect(t("en", "lesson.check")).toBe("Check");
  });
  test("returns the pt-BR string", () => {
    expect(t("pt-BR", "lesson.check")).toBe("Verificar");
  });
  test("falls back to english when pt-BR lacks the key", () => {
    expect(t("pt-BR", "app.name")).toBe("devlingo");
  });
  test("interpolates variables", () => {
    expect(t("en", "track.unit", { n: 3 })).toBe("Unit 3");
  });
});

describe("localize", () => {
  test("picks the locale when present", () => {
    expect(localize("pt-BR", { en: "Hello", "pt-BR": "Olá" })).toBe("Olá");
  });
  test("falls back to english", () => {
    expect(localize("pt-BR", { en: "Hello" })).toBe("Hello");
  });
});

test("pt-BR has no key missing from en", () => {
  const unknown = Object.keys(ptBR).filter((key) => !(key in en));
  expect(unknown).toEqual([]);
});
```

- [ ] **Step 3: Run to verify it fails**

Run: `npx vitest run src/i18n`
Expected: FAIL, cannot resolve `./en.json` / `./index`.

- [ ] **Step 4: Messages**

Create `src/i18n/en.json`:

```json
{
  "app.name": "devlingo",
  "header.streak": "Day streak",
  "header.xp": "Total XP",
  "theme.dark": "Dark theme",
  "theme.light": "Light theme",
  "theme.system": "System theme",
  "locale.switch": "Português",
  "track.unit": "Unit {n}",
  "track.lesson": "Lesson {n}",
  "track.comingSoon": "coming soon",
  "track.start": "Start",
  "track.locked": "Complete the previous lesson to unlock",
  "track.exercises": "{n} exercises · +{xp} XP",
  "track.track": "Track",
  "track.progress": "Progress",
  "track.progressCount": "{done} / {total} lessons",
  "track.upNext": "Up next",
  "track.allDone": "All available lessons completed",
  "lesson.close": "Back to track",
  "lesson.check": "Check",
  "lesson.continue": "Continue",
  "lesson.correct": "Nice!",
  "lesson.wrong": "Not quite",
  "lesson.correctAnswer": "Correct answer: {answer}",
  "lesson.correctHighlighted": "Correct answers are highlighted in green",
  "lesson.selectAll": "Select all that apply",
  "lesson.typeAnswer": "Type the missing word",
  "lesson.complete": "Lesson complete!",
  "lesson.xpEarned": "XP earned",
  "lesson.streak": "Streak",
  "lesson.days": "{n} days"
}
```

Create `src/i18n/pt-BR.json`:

```json
{
  "header.streak": "Dias seguidos",
  "header.xp": "XP total",
  "theme.dark": "Tema escuro",
  "theme.light": "Tema claro",
  "theme.system": "Tema do sistema",
  "locale.switch": "English",
  "track.unit": "Unidade {n}",
  "track.lesson": "Lição {n}",
  "track.comingSoon": "em breve",
  "track.start": "Começar",
  "track.locked": "Complete a lição anterior para desbloquear",
  "track.exercises": "{n} exercícios · +{xp} XP",
  "track.track": "Trilha",
  "track.progress": "Progresso",
  "track.progressCount": "{done} / {total} lições",
  "track.upNext": "Próxima",
  "track.allDone": "Todas as lições disponíveis concluídas",
  "lesson.close": "Voltar para a trilha",
  "lesson.check": "Verificar",
  "lesson.continue": "Continuar",
  "lesson.correct": "Boa!",
  "lesson.wrong": "Quase",
  "lesson.correctAnswer": "Resposta certa: {answer}",
  "lesson.correctHighlighted": "As respostas certas estão em verde",
  "lesson.selectAll": "Selecione todas as corretas",
  "lesson.typeAnswer": "Digite a palavra que falta",
  "lesson.complete": "Lição concluída!",
  "lesson.xpEarned": "XP ganho",
  "lesson.streak": "Sequência",
  "lesson.days": "{n} dias"
}
```

- [ ] **Step 5: Implementation**

Create `src/i18n/index.ts`:

```ts
import type { Locale, Text } from "@/content/types";
import { locales } from "@/content/types";
import en from "./en.json";
import ptBR from "./pt-BR.json";

export { locales };
export type { Locale, Text };
export type MessageKey = keyof typeof en;

const messages: Record<Locale, Partial<Record<MessageKey, string>>> = { en, "pt-BR": ptBR };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function t(locale: Locale, key: MessageKey, vars: Record<string, string | number> = {}) {
  const template = messages[locale][key] ?? en[key];
  return Object.entries(vars).reduce(
    (out, [name, value]) => out.replaceAll(`{${name}}`, String(value)),
    template,
  );
}

export function localize(locale: Locale, text: Text) {
  return text[locale] ?? text.en;
}
```

- [ ] **Step 6: Run tests**

Run: `npx vitest run src/i18n`
Expected: 7 passed.

- [ ] **Step 7: Commit**

```bash
git add src/content/types.ts src/i18n
git commit -m "feat(i18n): add content types, message catalogs and t()"
```

---

### Task 3: Progress module

**Files:**
- Create: `src/lib/progress.ts`
- Test: `src/lib/progress.test.ts`
- Delete: `src/lib/smoke.test.ts`

**Interfaces:**
- Produces:
  - `type Progress = { xp: number; streak: number; lastActiveDay: string | null; completedLessons: string[] }`
  - `EMPTY: Progress`
  - `load(): Progress`, `save(progress: Progress): void`
  - `completeLesson(lessonId: string, xp: number): Progress`
  - `lessonStatus(lessonId: string, previousLessonId: string | null, progress: Progress): "completed" | "current" | "locked"`
  - `type LessonStatus`

- [ ] **Step 1: Failing tests**

Create `src/lib/progress.test.ts`:

```ts
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { EMPTY, completeLesson, lessonStatus, load, save } from "./progress";

const store = new Map<string, string>();

beforeEach(() => {
  store.clear();
  vi.stubGlobal("localStorage", {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => store.set(key, value),
  });
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2026, 8, 6, 12, 0, 0));
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("load", () => {
  test("returns EMPTY when nothing is stored", () => {
    expect(load()).toEqual(EMPTY);
  });
  test("returns EMPTY on invalid json", () => {
    store.set("devlingo:progress", "{nope");
    expect(load()).toEqual(EMPTY);
  });
  test("returns EMPTY on wrong shape", () => {
    store.set("devlingo:progress", JSON.stringify({ xp: "12", completedLessons: "x" }));
    expect(load()).toEqual(EMPTY);
  });
  test("round-trips through save", () => {
    const progress = { xp: 30, streak: 2, lastActiveDay: "2026-09-05", completedLessons: ["a"] };
    save(progress);
    expect(load()).toEqual(progress);
  });
});

describe("completeLesson", () => {
  test("adds the lesson, xp and starts a streak", () => {
    expect(completeLesson("jsx-basics-1", 15)).toEqual({
      xp: 15,
      streak: 1,
      lastActiveDay: "2026-09-06",
      completedLessons: ["jsx-basics-1"],
    });
  });
  test("is idempotent", () => {
    completeLesson("jsx-basics-1", 15);
    expect(completeLesson("jsx-basics-1", 15).xp).toBe(15);
    expect(load().completedLessons).toEqual(["jsx-basics-1"]);
  });
  test("keeps the streak on the same day", () => {
    save({ xp: 0, streak: 3, lastActiveDay: "2026-09-06", completedLessons: [] });
    expect(completeLesson("a", 10).streak).toBe(3);
  });
  test("increments the streak on the next day", () => {
    save({ xp: 0, streak: 3, lastActiveDay: "2026-09-05", completedLessons: [] });
    expect(completeLesson("a", 10).streak).toBe(4);
  });
  test("resets the streak after a gap", () => {
    save({ xp: 0, streak: 3, lastActiveDay: "2026-09-01", completedLessons: [] });
    expect(completeLesson("a", 10).streak).toBe(1);
  });
});

describe("lessonStatus", () => {
  const progress = { ...EMPTY, completedLessons: ["a"] };
  test("first lesson of the track is current", () => {
    expect(lessonStatus("a", null, EMPTY)).toBe("current");
  });
  test("completed lesson", () => {
    expect(lessonStatus("a", null, progress)).toBe("completed");
  });
  test("lesson after a completed one is current", () => {
    expect(lessonStatus("b", "a", progress)).toBe("current");
  });
  test("lesson after an incomplete one is locked", () => {
    expect(lessonStatus("c", "b", progress)).toBe("locked");
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/lib/progress`
Expected: FAIL, cannot resolve `./progress`.

- [ ] **Step 3: Implementation**

Create `src/lib/progress.ts`:

```ts
export type Progress = {
  xp: number;
  streak: number;
  lastActiveDay: string | null;
  completedLessons: string[];
};

export type LessonStatus = "completed" | "current" | "locked";

const KEY = "devlingo:progress";

export const EMPTY: Progress = { xp: 0, streak: 0, lastActiveDay: null, completedLessons: [] };

function isProgress(value: unknown): value is Progress {
  if (typeof value !== "object" || value === null) return false;
  const p = value as Record<string, unknown>;
  return (
    typeof p.xp === "number" &&
    typeof p.streak === "number" &&
    (p.lastActiveDay === null || typeof p.lastActiveDay === "string") &&
    Array.isArray(p.completedLessons)
  );
}

export function load(): Progress {
  if (typeof localStorage === "undefined") return EMPTY;
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) ?? "");
    return isProgress(parsed) ? parsed : EMPTY;
  } catch {
    return EMPTY;
  }
}

export function save(progress: Progress) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(progress));
}

function dayKey(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function nextStreak(progress: Progress, today: Date) {
  const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
  if (progress.lastActiveDay === dayKey(today)) return progress.streak;
  if (progress.lastActiveDay === dayKey(yesterday)) return progress.streak + 1;
  return 1;
}

// ponytail: no passive streak decay; a missed day only shows once the next lesson is completed.
export function completeLesson(lessonId: string, xp: number): Progress {
  const progress = load();
  if (progress.completedLessons.includes(lessonId)) return progress;
  const today = new Date();
  const next: Progress = {
    xp: progress.xp + xp,
    streak: nextStreak(progress, today),
    lastActiveDay: dayKey(today),
    completedLessons: [...progress.completedLessons, lessonId],
  };
  save(next);
  return next;
}

export function lessonStatus(
  lessonId: string,
  previousLessonId: string | null,
  progress: Progress,
): LessonStatus {
  if (progress.completedLessons.includes(lessonId)) return "completed";
  if (previousLessonId === null) return "current";
  if (progress.completedLessons.includes(previousLessonId)) return "current";
  return "locked";
}
```

- [ ] **Step 4: Run tests, delete the smoke test**

```bash
rm src/lib/smoke.test.ts
npx vitest run src/lib/progress
```
Expected: 13 passed.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(progress): add localStorage progress module with streak and lesson status"
```

---

### Task 4: Answer checking

**Files:**
- Create: `src/lib/check.ts`
- Test: `src/lib/check.test.ts`

**Interfaces:**
- Produces: `type Answer = number | number[] | string`, `isCorrect(exercise: Exercise, answer: Answer | null): boolean`, `isAnswered(exercise: Exercise, answer: Answer | null): boolean`

- [ ] **Step 1: Failing tests**

Create `src/lib/check.test.ts`:

```ts
import { describe, expect, test } from "vitest";
import type { Exercise } from "@/content/types";
import { isAnswered, isCorrect } from "./check";

const single: Exercise = {
  type: "single-choice",
  prompt: { en: "?" },
  options: [{ en: "a" }, { en: "b" }],
  correct: 1,
};
const multi: Exercise = {
  type: "multi-choice",
  prompt: { en: "?" },
  options: [{ en: "a" }, { en: "b" }, { en: "c" }],
  correct: [0, 2],
};
const fill: Exercise = { type: "fill-blank", prompt: { en: "?" }, code: "___", answer: "useState" };

describe("isCorrect", () => {
  test("single-choice", () => {
    expect(isCorrect(single, 1)).toBe(true);
    expect(isCorrect(single, 0)).toBe(false);
    expect(isCorrect(single, null)).toBe(false);
  });
  test("multi-choice ignores order and rejects extras", () => {
    expect(isCorrect(multi, [2, 0])).toBe(true);
    expect(isCorrect(multi, [0])).toBe(false);
    expect(isCorrect(multi, [0, 1, 2])).toBe(false);
  });
  test("fill-blank trims and ignores case", () => {
    expect(isCorrect(fill, "  UseState ")).toBe(true);
    expect(isCorrect(fill, "useEffect")).toBe(false);
  });
});

describe("isAnswered", () => {
  test("requires a selection, at least one pick, or non-empty text", () => {
    expect(isAnswered(single, null)).toBe(false);
    expect(isAnswered(single, 0)).toBe(true);
    expect(isAnswered(multi, [])).toBe(false);
    expect(isAnswered(multi, [1])).toBe(true);
    expect(isAnswered(fill, "  ")).toBe(false);
    expect(isAnswered(fill, "x")).toBe(true);
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/lib/check`
Expected: FAIL, cannot resolve `./check`.

- [ ] **Step 3: Implementation**

Create `src/lib/check.ts`:

```ts
import type { Exercise } from "@/content/types";

export type Answer = number | number[] | string;

export function isAnswered(exercise: Exercise, answer: Answer | null) {
  if (answer === null) return false;
  if (exercise.type === "multi-choice") return Array.isArray(answer) && answer.length > 0;
  if (exercise.type === "fill-blank") return typeof answer === "string" && answer.trim() !== "";
  return typeof answer === "number";
}

export function isCorrect(exercise: Exercise, answer: Answer | null): boolean {
  if (!isAnswered(exercise, answer)) return false;
  switch (exercise.type) {
    case "single-choice":
      return answer === exercise.correct;
    case "multi-choice": {
      const picked = [...(answer as number[])].sort();
      const expected = [...exercise.correct].sort();
      return picked.length === expected.length && picked.every((v, i) => v === expected[i]);
    }
    case "fill-blank":
      return (answer as string).trim().toLowerCase() === exercise.answer.toLowerCase();
  }
}
```

- [ ] **Step 4: Run tests**

Run: `npx vitest run src/lib/check`
Expected: 4 passed.

- [ ] **Step 5: Commit**

```bash
git add src/lib/check.ts src/lib/check.test.ts
git commit -m "feat(lesson): add pure answer checking"
```

---

### Task 5: React track structure, content helpers, validation test, unit 1

**Files:**
- Create: `src/content/react.ts`, `src/content/tracks.ts`, `src/content/react/beginner/jsx-basics.ts`
- Test: `src/content/content.test.ts`

**Interfaces:**
- Produces:
  - `tracks: Track[]`, `findTrack(id: string): Track | undefined`
  - `type LessonRef = { lesson: Lesson; unit: Unit; level: Level; unitIndex: number; indexInUnit: number; previousLessonId: string | null }`
  - `lessonsOf(track: Track): LessonRef[]` in path order, only lessons that exist
  - `findLesson(track: Track, lessonId: string): LessonRef | undefined`

- [ ] **Step 1: Failing content validation test**

Create `src/content/content.test.ts`:

```ts
import { describe, expect, test } from "vitest";
import { lessonsOf, tracks } from "./tracks";
import type { Exercise, Text } from "./types";

const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function texts(exercise: Exercise): Text[] {
  if (exercise.type === "fill-blank") return [exercise.prompt];
  return [exercise.prompt, ...exercise.options];
}

describe.each(tracks)("track $id", (track) => {
  const refs = lessonsOf(track);

  test("has at least one lesson", () => {
    expect(refs.length).toBeGreaterThan(0);
  });

  test("lesson ids are unique and kebab-case", () => {
    const ids = refs.map((r) => r.lesson.id);
    expect(new Set(ids).size).toBe(ids.length);
    ids.forEach((id) => expect(id).toMatch(KEBAB));
  });

  test("previousLessonId chains in order", () => {
    refs.forEach((ref, i) => {
      expect(ref.previousLessonId).toBe(i === 0 ? null : refs[i - 1].lesson.id);
    });
  });

  describe.each(refs)("lesson $lesson.id", ({ lesson }) => {
    test("has 5 to 8 exercises and positive xp", () => {
      expect(lesson.exercises.length).toBeGreaterThanOrEqual(5);
      expect(lesson.exercises.length).toBeLessThanOrEqual(8);
      expect(lesson.xp).toBeGreaterThan(0);
      expect(lesson.title.en).not.toBe("");
      expect(lesson.description.en).not.toBe("");
    });

    test.each(lesson.exercises.map((e, i) => [i, e] as const))("exercise %i is valid", (_, e) => {
      texts(e).forEach((text) => expect(text.en.trim()).not.toBe(""));
      if (e.type === "single-choice") {
        expect(e.correct).toBeGreaterThanOrEqual(0);
        expect(e.correct).toBeLessThan(e.options.length);
        expect(new Set(e.options.map((o) => o.en)).size).toBe(e.options.length);
      }
      if (e.type === "multi-choice") {
        expect(e.correct.length).toBeGreaterThanOrEqual(2);
        expect(new Set(e.correct).size).toBe(e.correct.length);
        e.correct.forEach((c) => expect(c).toBeLessThan(e.options.length));
        expect(new Set(e.options.map((o) => o.en)).size).toBe(e.options.length);
      }
      if (e.type === "fill-blank") {
        expect(e.code.split("___").length).toBe(2);
        expect(e.answer.trim()).not.toBe("");
      }
    });
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/content`
Expected: FAIL, cannot resolve `./tracks`.

- [ ] **Step 3: Track helpers**

Create `src/content/tracks.ts`:

```ts
import { react } from "./react";
import type { Lesson, Level, Track, Unit } from "./types";

export const tracks: Track[] = [react];

export type LessonRef = {
  lesson: Lesson;
  unit: Unit;
  level: Level;
  unitIndex: number;
  indexInUnit: number;
  previousLessonId: string | null;
};

export function findTrack(id: string) {
  return tracks.find((track) => track.id === id);
}

export function lessonsOf(track: Track): LessonRef[] {
  const refs: LessonRef[] = [];
  let unitIndex = 0;
  for (const level of track.levels) {
    for (const unit of level.units) {
      unitIndex += 1;
      unit.lessons.forEach((lesson, indexInUnit) => {
        const previous = refs.at(-1);
        refs.push({
          lesson,
          unit,
          level,
          unitIndex,
          indexInUnit,
          previousLessonId: previous ? previous.lesson.id : null,
        });
      });
    }
  }
  return refs;
}

export function findLesson(track: Track, lessonId: string) {
  return lessonsOf(track).find((ref) => ref.lesson.id === lessonId);
}
```

- [ ] **Step 4: Track skeleton**

Create `src/content/react.ts`:

```ts
import type { Track, Unit } from "./types";
import { jsxBasics } from "./react/beginner/jsx-basics";

const soon = (id: string, en: string, ptBR: string): Unit => ({
  id,
  title: { en, "pt-BR": ptBR },
  lessons: [],
});

export const react: Track = {
  id: "react",
  title: { en: "React" },
  levels: [
    {
      id: "beginner",
      title: { en: "Beginner", "pt-BR": "Iniciante" },
      units: [
        jsxBasics,
        soon("components-props", "Components & props", "Componentes e props"),
        soon("state", "State with useState", "Estado com useState"),
        soon("events", "Handling events", "Eventos"),
        soon("lists-keys", "Lists & keys", "Listas e keys"),
        soon("conditional-rendering", "Conditional rendering", "Renderização condicional"),
        soon("forms", "Forms", "Formulários"),
      ],
    },
    {
      id: "intermediate",
      title: { en: "Intermediate", "pt-BR": "Intermediário" },
      units: [
        soon("use-effect", "useEffect", "useEffect"),
        soon("lifting-state", "Lifting state up", "Elevando o estado"),
        soon("context", "Context", "Context"),
        soon("refs", "Refs", "Refs"),
        soon("custom-hooks", "Custom hooks", "Hooks customizados"),
        soon("performance", "Performance basics", "Básico de performance"),
      ],
    },
    {
      id: "advanced",
      title: { en: "Advanced", "pt-BR": "Avançado" },
      units: [
        soon("reducers", "Reducers", "Reducers"),
        soon("suspense", "Suspense & lazy", "Suspense e lazy"),
        soon("error-boundaries", "Error boundaries", "Error boundaries"),
        soon("portals", "Portals", "Portals"),
        soon("render-patterns", "Render patterns", "Padrões de renderização"),
        soon("testing", "Testing components", "Testando componentes"),
      ],
    },
    {
      id: "expert",
      title: { en: "Expert", "pt-BR": "Especialista" },
      units: [
        soon("concurrent", "Concurrent rendering", "Renderização concorrente"),
        soon("server-components", "Server components", "Server components"),
        soon("compiler", "Compiler & memoization", "Compilador e memoização"),
        soon("reconciliation", "Reconciliation internals", "Internals da reconciliação"),
      ],
    },
  ],
};
```

- [ ] **Step 5: Unit 1 content**

Create `src/content/react/beginner/jsx-basics.ts`:

```ts
import type { Unit } from "@/content/types";

export const jsxBasics: Unit = {
  id: "jsx-basics",
  title: { en: "JSX basics", "pt-BR": "Básico de JSX" },
  lessons: [
    {
      id: "jsx-basics-1",
      title: { en: "What is JSX?", "pt-BR": "O que é JSX?" },
      description: {
        en: "Learn what JSX is and how it turns into React elements.",
        "pt-BR": "Entenda o que é JSX e como ele vira elementos React.",
      },
      xp: 10,
      exercises: [
        {
          type: "single-choice",
          prompt: { en: "What is JSX?", "pt-BR": "O que é JSX?" },
          options: [
            { en: "A syntax extension that lets you write markup inside JavaScript", "pt-BR": "Uma extensão de sintaxe para escrever marcação dentro do JavaScript" },
            { en: "A new programming language", "pt-BR": "Uma nova linguagem de programação" },
            { en: "A CSS preprocessor", "pt-BR": "Um pré-processador de CSS" },
            { en: "A templating engine that runs on the server", "pt-BR": "Um motor de templates que roda no servidor" },
          ],
          correct: 0,
        },
        {
          type: "single-choice",
          prompt: { en: "What does this expression evaluate to?", "pt-BR": "O que essa expressão produz?" },
          code: `const el = <h1>Hi</h1>;`,
          options: [
            { en: "A React element describing an h1", "pt-BR": "Um elemento React descrevendo um h1" },
            { en: "A real DOM node", "pt-BR": "Um nó real do DOM" },
            { en: "The string \"<h1>Hi</h1>\"", "pt-BR": "A string \"<h1>Hi</h1>\"" },
            { en: "A syntax error", "pt-BR": "Um erro de sintaxe" },
          ],
          correct: 0,
        },
        {
          type: "fill-blank",
          prompt: { en: "Complete the equivalent call", "pt-BR": "Complete a chamada equivalente" },
          code: `const el = React.___("h1", null, "Hi");`,
          answer: "createElement",
        },
        {
          type: "multi-choice",
          prompt: { en: "Pick the 2 true statements about JSX", "pt-BR": "Escolha as 2 afirmações verdadeiras sobre JSX" },
          options: [
            { en: "Browsers cannot run JSX directly", "pt-BR": "Navegadores não executam JSX diretamente" },
            { en: "JSX is required to use React", "pt-BR": "JSX é obrigatório para usar React" },
            { en: "JSX compiles to function calls", "pt-BR": "JSX compila para chamadas de função" },
            { en: "JSX only works with class components", "pt-BR": "JSX só funciona com componentes de classe" },
          ],
          correct: [0, 2],
        },
        {
          type: "single-choice",
          prompt: { en: "Which file extension is conventional for React components with JSX in TypeScript?", "pt-BR": "Qual extensão é a convenção para componentes React com JSX em TypeScript?" },
          options: [{ en: ".tsx" }, { en: ".jsx" }, { en: ".ts" }, { en: ".html" }],
          correct: 0,
        },
        {
          type: "single-choice",
          prompt: { en: "Why does this fail to compile?", "pt-BR": "Por que isso não compila?" },
          code: `return <h1>Hi</h1><p>There</p>;`,
          options: [
            { en: "JSX must return a single root element", "pt-BR": "JSX precisa retornar um único elemento raiz" },
            { en: "p is not allowed after h1", "pt-BR": "p não pode vir depois de h1" },
            { en: "return cannot contain JSX", "pt-BR": "return não pode conter JSX" },
            { en: "It compiles fine", "pt-BR": "Compila normalmente" },
          ],
          correct: 0,
        },
      ],
    },
    {
      id: "jsx-basics-2",
      title: { en: "Expressions in JSX", "pt-BR": "Expressões no JSX" },
      description: {
        en: "Embed variables and function calls with curly braces.",
        "pt-BR": "Insira variáveis e chamadas de função com chaves.",
      },
      xp: 15,
      exercises: [
        {
          type: "single-choice",
          prompt: { en: "What does this render?", "pt-BR": "O que isso renderiza?" },
          code: `const name = "Ada";\nconst el = <h1>Hello, {name}</h1>;`,
          options: [
            { en: "Hello, Ada" },
            { en: "Hello, {name}" },
            { en: "Hello, name" },
            { en: "A syntax error", "pt-BR": "Um erro de sintaxe" },
          ],
          correct: 0,
        },
        {
          type: "fill-blank",
          prompt: { en: "Embed the expression", "pt-BR": "Insira a expressão" },
          code: `const el = <p>Total: ___price * 2}</p>;`,
          answer: "{",
        },
        {
          type: "single-choice",
          prompt: { en: "Which of these can go inside curly braces in JSX?", "pt-BR": "O que pode ir dentro das chaves no JSX?" },
          options: [
            { en: "Any JavaScript expression", "pt-BR": "Qualquer expressão JavaScript" },
            { en: "Only variables", "pt-BR": "Apenas variáveis" },
            { en: "if statements", "pt-BR": "Instruções if" },
            { en: "for loops", "pt-BR": "Laços for" },
          ],
          correct: 0,
        },
        {
          type: "single-choice",
          prompt: { en: "What does this render?", "pt-BR": "O que isso renderiza?" },
          code: `const el = <p>{2 + 3}</p>;`,
          options: [{ en: "5" }, { en: "2 + 3" }, { en: "{5}" }, { en: "23" }],
          correct: 0,
        },
        {
          type: "multi-choice",
          prompt: { en: "Pick the 2 values React renders as nothing", "pt-BR": "Escolha os 2 valores que o React renderiza como nada" },
          options: [{ en: "null" }, { en: "0" }, { en: "false" }, { en: "\"\" + 1" }],
          correct: [0, 2],
        },
        {
          type: "single-choice",
          prompt: { en: "How do you call a function inside JSX?", "pt-BR": "Como chamar uma função dentro do JSX?" },
          options: [
            { en: "<p>{format(date)}</p>" },
            { en: "<p>format(date)</p>" },
            { en: "<p>{{ format(date) }}</p>" },
            { en: "<p>%format(date)%</p>" },
          ],
          correct: 0,
        },
        {
          type: "fill-blank",
          prompt: { en: "Interpolate the size into the class name", "pt-BR": "Interpole o tamanho no nome da classe" },
          code: "const el = <div className={`card ___{size}`}>...</div>;",
          answer: "$",
        },
      ],
    },
    {
      id: "jsx-basics-3",
      title: { en: "Attributes and children", "pt-BR": "Atributos e filhos" },
      description: {
        en: "className, camelCase attributes, and nesting elements.",
        "pt-BR": "className, atributos em camelCase e aninhamento de elementos.",
      },
      xp: 15,
      exercises: [
        {
          type: "fill-blank",
          prompt: { en: "Set a CSS class in JSX", "pt-BR": "Defina uma classe CSS no JSX" },
          code: `const el = <div ___="card">Hi</div>;`,
          answer: "className",
        },
        {
          type: "single-choice",
          prompt: { en: "Which attribute name is correct in JSX?", "pt-BR": "Qual nome de atributo está correto no JSX?" },
          options: [{ en: "onClick" }, { en: "onclick" }, { en: "on-click" }, { en: "OnClick" }],
          correct: 0,
        },
        {
          type: "single-choice",
          prompt: { en: "How do you pass a number as an attribute?", "pt-BR": "Como passar um número como atributo?" },
          options: [
            { en: "<Item count={3} />" },
            { en: "<Item count=\"3\" />" },
            { en: "<Item count=3 />" },
            { en: "<Item count={{3}} />" },
          ],
          correct: 0,
        },
        {
          type: "single-choice",
          prompt: { en: "What is the JSX equivalent of the HTML for attribute on a label?", "pt-BR": "Qual o equivalente em JSX do atributo for de um label?" },
          options: [{ en: "htmlFor" }, { en: "for" }, { en: "labelFor" }, { en: "forId" }],
          correct: 0,
        },
        {
          type: "single-choice",
          prompt: { en: "What does this render?", "pt-BR": "O que isso renderiza?" },
          code: `const el = (\n  <ul>\n    <li>One</li>\n    <li>Two</li>\n  </ul>\n);`,
          options: [
            { en: "A list with two items", "pt-BR": "Uma lista com dois itens" },
            { en: "Two separate lists", "pt-BR": "Duas listas separadas" },
            { en: "A syntax error because of the parentheses", "pt-BR": "Um erro de sintaxe por causa dos parênteses" },
            { en: "Only the last item", "pt-BR": "Só o último item" },
          ],
          correct: 0,
        },
        {
          type: "single-choice",
          prompt: { en: "How do you group siblings without adding a DOM node?", "pt-BR": "Como agrupar irmãos sem adicionar um nó no DOM?" },
          options: [
            { en: "<>...</> (a Fragment)", "pt-BR": "<>...</> (um Fragment)" },
            { en: "<div>...</div>" },
            { en: "<group>...</group>" },
            { en: "[...] (an array)", "pt-BR": "[...] (um array)" },
          ],
          correct: 0,
        },
      ],
    },
  ],
};
```

- [ ] **Step 6: Run tests**

Run: `npx vitest run src/content`
Expected: all pass (3 lessons, 19 exercises: 6 + 7 + 6). If a lesson fails, fix the content, not the test.

- [ ] **Step 7: Type-check and commit**

```bash
npx tsc --noEmit
git add src/content
git commit -m "feat(content): add react track skeleton, helpers, validation and jsx basics unit"
```

---

### Task 6: Units 2–4 content

**Files:**
- Create: `src/content/react/beginner/components-props.ts`, `src/content/react/beginner/state.ts`, `src/content/react/beginner/events.ts`
- Modify: `src/content/react.ts` (replace the three `soon(...)` entries with the imported units)

**Interfaces:**
- Consumes: `Unit`, `Exercise` types (Task 2), validation test (Task 5).
- Produces: `componentsProps`, `state`, `events` units, ids `components-props-N`, `state-N`, `events-N`.

Write every exercise in the same shape as Task 5. Every `Text` gets `en`; add `"pt-BR"` to every prompt and option that is a sentence (leave pure code/identifier options English-only). `xp`: 10 for the first lesson of a unit, 15 for the rest. Each lesson 5–7 exercises, mixing types: at least one `fill-blank` and one `multi-choice` per lesson.

- [ ] **Step 1: `components-props.ts`** — `export const componentsProps: Unit`, id `components-props`, title "Components & props" / "Componentes e props". Lessons:

  1. `components-props-1` "Your first component" / "Seu primeiro componente" — description "Write a function component and render it." Exercises: single (what a component is: a function returning JSX); single with code `function Card() { return <div>Hi</div>; }` asking how to render it → `<Card />`; fill-blank `function ___() { return <p>Hi</p>; }` answer `Greeting` with prompt "Name the component in PascalCase to match the usage `<Greeting />`"; single (why `<card />` renders an unknown HTML tag: lowercase means DOM element); multi "Pick the 2 rules a component must follow" → returns JSX / name starts with capital letter; single "Where can a component be defined?" → at module top level, not inside another component.
  2. `components-props-2` "Passing props" / "Passando props" — description "Send data into a component with attributes." Exercises: fill-blank `function Hello(___) { return <h1>Hi {props.name}</h1>; }` answer `props`; single with code `<Hello name="Ada" />` what is `props.name` → "Ada"; single "How do you pass a number?" → `age={30}`; fill-blank destructuring `function Hello({ ___ }) { return <h1>Hi {name}</h1>; }` answer `name`; multi "Pick the 2 true statements about props" → read-only / can be any JS value; single "What happens if a prop is missing?" → `undefined`.
  3. `components-props-3` "Children and composition" / "Children e composição" — description "Nest components and use the children prop." Exercises: fill-blank `function Card({ ___ }) { return <div className="card">{children}</div>; }` answer `children`; single with code `<Card><p>Hi</p></Card>` what is `children` → the `<p>` element; single "How do you set a default value for a prop?" → default parameter `{ size = "md" }`; multi "Pick the 2 valid ways to reuse markup" → extract a component / pass children; single "Can a component render another component?" → yes, any number of times; single with code showing `Card` rendering `<Title />` and `<Body />` asking output order → in the order written.

- [ ] **Step 2: `state.ts`** — `export const state: Unit`, id `state`, title "State with useState" / "Estado com useState". Lessons:

  1. `state-1` "Why state?" / "Por que estado?" — description "Understand why a plain variable does not update the screen." Exercises: single with code `let count = 0; function inc() { count++ }` why UI doesn't change → React doesn't know it changed, no re-render; single "What is state?" → data that React tracks and re-renders on change; fill-blank `import { ___ } from "react";` answer `useState`; single "Where must hooks be called?" → top level of a component; multi "Pick the 2 things useState returns" → current value / setter function; single "Which name is conventional?" → `[count, setCount]`.
  2. `state-2` "Updating state" / "Atualizando o estado" — description "Set new values and trigger re-renders." Exercises: fill-blank `const [count, setCount] = useState(___);` prompt "Start the counter at zero" answer `0`; single with code `setCount(count + 1)` inside a click handler, what happens → re-render with new value; single "Why is `count = 5` wrong?" → mutation doesn't re-render; fill-blank `setCount(___ => c + 1);` answer `c` prompt "Use the updater form"; multi "Pick the 2 true statements" → state updates are batched / state is local to the component instance; single with code calling `setCount(count + 1)` twice in one handler asking final increment → 1, because `count` is stale in both calls.
  3. `state-3` "Objects and arrays in state" / "Objetos e arrays no estado" — description "Replace, never mutate." Exercises: single with code `user.name = "Ada"; setUser(user)` why no update → same reference; fill-blank `setUser({ ___user, name: "Ada" });` answer `...`; single "How do you add an item to an array in state?" → `setItems([...items, item])`; fill-blank `setItems(items.___(i => i.id !== id));` answer `filter`; multi "Pick the 2 methods that mutate an array" → `push` / `splice`; single "How many useState calls can a component have?" → any number.

- [ ] **Step 3: `events.ts`** — `export const events: Unit`, id `events`, title "Handling events" / "Eventos". Lessons:

  1. `events-1` "Click handlers" / "Handlers de clique" — description "Respond to clicks with onClick." Exercises: fill-blank `<button ___={handleClick}>Go</button>` answer `onClick`; single "Which is correct?" → `onClick={handleClick}` vs `onClick={handleClick()}` (calling it runs immediately); single with code inline arrow `onClick={() => setOpen(true)}` what happens on click → `setOpen(true)` runs; multi "Pick the 2 true statements" → handlers receive an event object / handler names are camelCase; single "Where is the handler defined by convention?" → inside the component, before return; fill-blank `function handleClick(___) { e.preventDefault(); }` answer `e`.
  2. `events-2` "Event object and forms" / "Objeto de evento e formulários" — description "Read input values and prevent default behavior." Exercises: fill-blank `<input onChange={e => setText(e.___.value)} />` answer `target`; single "What does `e.preventDefault()` do in a submit handler?" → stops the page reload; single "Which event fires on every keystroke in React?" → `onChange`; multi "Pick the 2 true statements about React events" → they are synthetic wrappers / they work the same across browsers; fill-blank `<form ___={handleSubmit}>` answer `onSubmit`; single with code controlled input `value={text}` without `onChange` → React warns, input is read-only.
  3. `events-3` "Passing arguments" / "Passando argumentos" — description "Send extra data to a handler." Exercises: single "How do you pass an id to a handler?" → `onClick={() => remove(id)}`; single with code `onClick={remove(id)}` what's wrong → runs during render; fill-blank `<li onClick={() => select(___)}>{item.name}</li>` answer `item` (prompt "Pass the whole item"); multi "Pick the 2 ways to pass arguments" → arrow function / `bind`; single "Does an inline arrow create a new function each render?" → yes, and that's fine for most cases; single "How do child components notify parents?" → parent passes a callback prop.

- [ ] **Step 4: Wire the units**

In `src/content/react.ts` import the three units and replace the matching `soon(...)` calls:

```ts
import { componentsProps } from "./react/beginner/components-props";
import { state } from "./react/beginner/state";
import { events } from "./react/beginner/events";
// units: [jsxBasics, componentsProps, state, events, soon("lists-keys", ...), ...]
```

- [ ] **Step 5: Run validation**

Run: `npx vitest run src/content && npx tsc --noEmit`
Expected: all pass, 12 lessons. Fix content, not tests.

- [ ] **Step 6: Commit**

```bash
git add src/content
git commit -m "feat(content): add components, state and events units"
```

---

### Task 7: Design tokens, fonts, theme

**Files:**
- Modify: `src/app/globals.css` (replace), `src/app/[locale]/layout.tsx` (replace)
- Create: `src/components/ThemeToggle.tsx`, `src/components/icons.tsx`, `src/components/Button.tsx`

**Interfaces:**
- Produces:
  - Tailwind color tokens: `canvas`, `surface`, `surface-2`, `border`, `text`, `muted`, `primary`, `primary-dark`, `primary-soft`, `ok`, `ok-dark`, `ok-soft`, `ok-text`, `ok-on`, `bad`, `bad-dark`, `bad-soft`, `bad-text`, `streak`, `xp`, `locked`, `locked-dark`, `locked-text`, `code`, `unit-2`, `unit-3`
  - Fonts: `font-display` (Sora), `font-sans` (DM Sans), `font-mono` (JetBrains Mono)
  - `Button({ variant: "ok" | "bad" | "primary" | "disabled", ... })`
  - `Icon` components: `Star`, `Lock`, `Play`, `Flame`, `Bolt`, `Check`, `Close`, `Moon`, `Sun`, `Monitor`, `Trophy` (all accept `className`, `size`)
  - `ThemeToggle({ locale })`

- [ ] **Step 1: globals.css**

Replace `src/app/globals.css`:

```css
@import "tailwindcss";

:root {
  --bg: #0f1117;
  --surface: #181b24;
  --surface-2: #20242f;
  --border: #2c3140;
  --text: #e8eaf1;
  --muted: #9298a8;
  --primary: #8b7cff;
  --primary-dark: #5f4fd6;
  --primary-soft: #2a2650;
  --ok: #3ddc97;
  --ok-dark: #22a86e;
  --ok-soft: #153d2e;
  --ok-text: #5ff0b0;
  --ok-on: #0b2a1e;
  --bad: #ff6b6b;
  --bad-dark: #c94848;
  --bad-soft: #4a2024;
  --bad-text: #ff8a8a;
  --streak: #ff9f43;
  --xp: #ffd166;
  --locked: #2a2e3a;
  --locked-dark: #1c1f28;
  --locked-text: #6b7080;
  --code: #0a0c12;
  color-scheme: dark;
}

html.light {
  --bg: #f6f7fb;
  --surface: #ffffff;
  --surface-2: #f0f1f6;
  --border: #e1e4ec;
  --text: #1b1d26;
  --muted: #6a7080;
  --primary: #6a5cff;
  --primary-dark: #4a3ed1;
  --primary-soft: #ebe8ff;
  --ok: #22c48a;
  --ok-dark: #178f63;
  --ok-soft: #dcf7ec;
  --ok-text: #107a52;
  --ok-on: #ffffff;
  --bad: #f0524f;
  --bad-dark: #c23c3a;
  --bad-soft: #ffe3e2;
  --bad-text: #c22f2d;
  --streak: #f0842a;
  --xp: #e6a800;
  --locked: #e6e8ef;
  --locked-dark: #cfd2dc;
  --locked-text: #9aa0b0;
  --code: #1b1d26;
  color-scheme: light;
}

@theme inline {
  --color-canvas: var(--bg);
  --color-surface: var(--surface);
  --color-surface-2: var(--surface-2);
  --color-border: var(--border);
  --color-text: var(--text);
  --color-muted: var(--muted);
  --color-primary: var(--primary);
  --color-primary-dark: var(--primary-dark);
  --color-primary-soft: var(--primary-soft);
  --color-ok: var(--ok);
  --color-ok-dark: var(--ok-dark);
  --color-ok-soft: var(--ok-soft);
  --color-ok-text: var(--ok-text);
  --color-ok-on: var(--ok-on);
  --color-bad: var(--bad);
  --color-bad-dark: var(--bad-dark);
  --color-bad-soft: var(--bad-soft);
  --color-bad-text: var(--bad-text);
  --color-streak: var(--streak);
  --color-xp: var(--xp);
  --color-locked: var(--locked);
  --color-locked-dark: var(--locked-dark);
  --color-locked-text: var(--locked-text);
  --color-code: var(--code);
  --color-unit-2: #2fb8d6;
  --color-unit-3: #e26fa0;
  --font-display: var(--font-sora);
  --font-sans: var(--font-dm-sans);
  --font-mono: var(--font-jetbrains-mono);
}

body {
  background: var(--bg);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
}

.shiki {
  background: var(--code) !important;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid var(--border);
  font-size: 13px;
  line-height: 1.6;
  overflow-x: auto;
}

.shiki .blank {
  background: var(--xp);
  color: #1b1d26;
  border-radius: 4px;
  padding: 0 8px;
  font-weight: 700;
}
```

- [ ] **Step 2: Root layout with fonts and theme script**

Replace `src/app/[locale]/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Sora } from "next/font/google";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n";
import "../globals.css";

const sora = Sora({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-sora" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-dm-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = { title: "devlingo", description: "Learn React one lesson at a time." };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const themeScript = `(function(){try{var t=localStorage.getItem("devlingo:theme");var light=t==="light"||(t==="system"&&matchMedia("(prefers-color-scheme: light)").matches);if(light)document.documentElement.classList.add("light")}catch(e){}})()`;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} className={`${sora.variable} ${dmSans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh bg-canvas font-sans text-text">{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Icons**

Create `src/components/icons.tsx`:

```tsx
type IconProps = { size?: number; className?: string };

function Svg({ size = 24, className, children, fill = "none" }: IconProps & { children: React.ReactNode; fill?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const Star = (p: IconProps) => (
  <Svg {...p} fill="currentColor"><path stroke="none" d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z" /></Svg>
);
export const Lock = (p: IconProps) => (
  <Svg {...p}><rect x="5" y="11" width="14" height="10" rx="2.5" /><path d="M8 11V7.5a4 4 0 0 1 8 0V11" /></Svg>
);
export const Play = (p: IconProps) => (
  <Svg {...p} fill="currentColor"><path stroke="none" d="M8 5.5v13l11-6.5z" /></Svg>
);
export const Flame = (p: IconProps) => (
  <Svg {...p} fill="currentColor"><path stroke="none" d="M12 2c1 4 5 5.5 5 11a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5.3 1.3 1 2 2 2.5 0-3.5 0-6 1-9z" /></Svg>
);
export const Bolt = (p: IconProps) => (
  <Svg {...p} fill="currentColor"><path stroke="none" d="M13 2L4 14h6l-1 8 9-12h-6z" /></Svg>
);
export const Check = (p: IconProps) => <Svg {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></Svg>;
export const Close = (p: IconProps) => <Svg {...p}><path d="M6 6l12 12M18 6L6 18" /></Svg>;
export const Moon = (p: IconProps) => (
  <Svg {...p}><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" /></Svg>
);
export const Sun = (p: IconProps) => (
  <Svg {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" /></Svg>
);
export const Monitor = (p: IconProps) => (
  <Svg {...p}><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></Svg>
);
export const Trophy = (p: IconProps) => (
  <Svg {...p}><path d="M8 4h8v5a4 4 0 0 1-8 0z" /><path d="M8 5H5a3 3 0 0 0 3 5M16 5h3a3 3 0 0 1-3 5M12 13v4M8 21h8M9 17h6" /></Svg>
);
```

- [ ] **Step 4: Button**

Create `src/components/Button.tsx`:

```tsx
import type { ComponentProps } from "react";

const variants = {
  primary: "bg-primary text-white shadow-[0_4px_0_var(--primary-dark)]",
  ok: "bg-ok text-ok-on shadow-[0_4px_0_var(--ok-dark)]",
  bad: "bg-bad text-white shadow-[0_4px_0_var(--bad-dark)]",
  disabled: "bg-surface-2 text-muted",
};

type Props = ComponentProps<"button"> & { variant: keyof typeof variants };

export function Button({ variant, className = "", ...rest }: Props) {
  return (
    <button
      disabled={variant === "disabled"}
      className={`block w-full min-h-[50px] rounded-2xl px-4 py-3.5 text-[15px] font-extrabold uppercase tracking-wider transition-transform active:translate-y-[2px] active:shadow-none ${variants[variant]} ${className}`}
      {...rest}
    />
  );
}
```

- [ ] **Step 5: ThemeToggle**

Create `src/components/ThemeToggle.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { t, type Locale } from "@/i18n";
import { Monitor, Moon, Sun } from "./icons";

type Theme = "dark" | "light" | "system";
const KEY = "devlingo:theme";
const order: Theme[] = ["dark", "light", "system"];

function readTheme(): Theme {
  try {
    const stored = localStorage.getItem(KEY);
    return order.includes(stored as Theme) ? (stored as Theme) : "dark";
  } catch {
    return "dark";
  }
}

function applyTheme(theme: Theme) {
  const light = theme === "light" || (theme === "system" && matchMedia("(prefers-color-scheme: light)").matches);
  document.documentElement.classList.toggle("light", light);
}

export function ThemeToggle({ locale }: { locale: Locale }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => setTheme(readTheme()), []);

  function cycle() {
    const next = order[(order.indexOf(theme) + 1) % order.length];
    setTheme(next);
    applyTheme(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {}
  }

  const Icon = { dark: Moon, light: Sun, system: Monitor }[theme];
  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={t(locale, `theme.${theme}`)}
      className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-border text-muted"
    >
      <Icon size={16} />
    </button>
  );
}
```

- [ ] **Step 6: Verify**

Run: `npm run format && npm run lint && npx tsc --noEmit && npm run build`
Expected: passes. `npm run dev`, open `http://localhost:3000/en`: dark background, "devlingo" text in DM Sans. Add `localStorage.setItem("devlingo:theme","light")` in the console and reload: light palette, no flash.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(ui): add design tokens, fonts, icons, button and theme toggle"
```

---

### Task 8: Routing, proxy, header

**Files:**
- Create: `src/proxy.ts`, `src/components/Header.tsx`, `src/components/LocaleSwitcher.tsx`
- Modify: `src/app/[locale]/page.tsx` (replace), create `src/app/[locale]/[track]/page.tsx` (placeholder, completed in Task 9)

**Interfaces:**
- Produces: `Header({ locale, trackId })`, `LocaleSwitcher({ locale })`. Route `/` → `/<locale>`; `/[locale]` → `/[locale]/react`.

- [ ] **Step 1: Proxy**

Create `src/proxy.ts`:

```ts
import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const accept = request.headers.get("accept-language") ?? "";
  const locale = accept.toLowerCase().startsWith("pt") ? "pt-BR" : "en";
  return NextResponse.redirect(new URL(`/${locale}`, request.url));
}

export const config = { matcher: "/" };
```

- [ ] **Step 2: Locale root redirect**

Replace `src/app/[locale]/page.tsx`:

```tsx
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`/${locale}/react`);
}
```

- [ ] **Step 3: LocaleSwitcher**

Create `src/components/LocaleSwitcher.tsx`:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { t, type Locale } from "@/i18n";

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const other: Locale = locale === "en" ? "pt-BR" : "en";
  const href = pathname.replace(`/${locale}`, `/${other}`);
  return (
    <Link
      href={href}
      aria-label={t(locale, "locale.switch")}
      className="flex h-11 min-w-11 items-center justify-center rounded-xl border-2 border-border px-2 text-xs font-bold text-muted"
    >
      {other === "en" ? "EN" : "PT"}
    </Link>
  );
}
```

- [ ] **Step 4: Header**

Create `src/components/Header.tsx`:

```tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { t, type Locale } from "@/i18n";
import { EMPTY, load } from "@/lib/progress";
import { Bolt, Flame } from "./icons";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";

export function Header({ locale, trackId }: { locale: Locale; trackId: string }) {
  const [progress, setProgress] = useState(EMPTY);
  useEffect(() => setProgress(load()), []);

  return (
    <header className="sticky top-0 z-10 border-b-2 border-border bg-surface">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 lg:px-12">
        <Link href={`/${locale}/${trackId}`} className="font-display text-xl font-extrabold tracking-tight text-primary">
          {t(locale, "app.name")}
        </Link>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-bold text-streak" title={t(locale, "header.streak")}>
            <Flame size={18} />
            {progress.streak}
          </span>
          <span className="flex items-center gap-1 font-bold text-xp" title={t(locale, "header.xp")}>
            <Bolt size={18} />
            {progress.xp}
          </span>
          <ThemeToggle locale={locale} />
          <LocaleSwitcher locale={locale} />
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 5: Placeholder track page**

Create `src/app/[locale]/[track]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { findTrack, tracks } from "@/content/tracks";
import { localize, type Locale } from "@/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return tracks.map((track) => ({ track: track.id }));
}

export default async function TrackPage({ params }: { params: Promise<{ locale: Locale; track: string }> }) {
  const { locale, track: trackId } = await params;
  const track = findTrack(trackId);
  if (!track) notFound();
  return (
    <>
      <Header locale={locale} trackId={track.id} />
      <main className="p-4">{localize(locale, track.title)}</main>
    </>
  );
}
```

- [ ] **Step 6: Verify**

Run: `npm run format && npm run lint && npx tsc --noEmit && npm run build`
Expected: routes `/[locale]`, `/[locale]/[track]` prerendered for `en` and `pt-BR`. `npm run dev`: `curl -I -H "Accept-Language: pt-BR" http://localhost:3000/` returns 307 to `/pt-BR`; `/en` redirects to `/en/react`; `/xx/react` is 404; the header shows 0 streak / 0 XP, theme and locale buttons work.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(routing): add locale proxy, redirects and header"
```

---

### Task 9: Track screen

**Files:**
- Create: `src/components/TrackPath.tsx`, `src/components/LessonNode.tsx`, `src/components/LessonPopover.tsx`
- Modify: `src/app/[locale]/[track]/page.tsx`

**Interfaces:**
- Consumes: `lessonsOf`, `LessonRef` (Task 5); `load`, `lessonStatus` (Task 3); `t`, `localize` (Task 2); `Button`, icons (Task 7).
- Produces: `TrackPath({ track, locale })` client component rendering the whole path and the side cards' data via `useProgress`.

- [ ] **Step 1: LessonNode**

Create `src/components/LessonNode.tsx`:

```tsx
import type { LessonStatus } from "@/lib/progress";
import { Lock, Play, Star } from "./icons";

const styles: Record<LessonStatus, string> = {
  completed: "bg-ok text-ok-on shadow-[0_7px_0_var(--ok-dark)]",
  current: "bg-primary text-white shadow-[0_7px_0_var(--primary-dark)] outline outline-[5px] outline-primary-soft",
  locked: "bg-locked text-locked-text shadow-[0_7px_0_var(--locked-dark)]",
};

const icons: Record<LessonStatus, React.ComponentType<{ size?: number }>> = {
  completed: Star,
  current: Play,
  locked: Lock,
};

export function LessonNode({
  status,
  label,
  offset,
  startLabel,
  onClick,
}: {
  status: LessonStatus;
  label: string;
  offset: number;
  startLabel?: string;
  onClick: () => void;
}) {
  const Icon = icons[status];
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      style={{ transform: `translateX(${offset}px)` }}
      className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${styles[status]}`}
    >
      {startLabel && (
        <span className="absolute -top-10 rounded-xl border-2 border-border bg-surface px-2.5 py-1.5 text-xs font-extrabold tracking-wider text-primary">
          {startLabel}
        </span>
      )}
      <Icon size={26} />
    </button>
  );
}

export function ComingSoonNode({ offset }: { offset: number }) {
  return (
    <div
      style={{ transform: `translateX(${offset}px)` }}
      className="h-16 w-16 shrink-0 rounded-full border-[3px] border-dashed border-border"
    />
  );
}
```

- [ ] **Step 2: LessonPopover**

Create `src/components/LessonPopover.tsx`:

```tsx
import Link from "next/link";
import type { LessonRef } from "@/content/tracks";
import { localize, t, type Locale } from "@/i18n";
import type { LessonStatus } from "@/lib/progress";
import { Button } from "./Button";
import { Lock } from "./icons";

export function LessonPopover({
  lesson,
  status,
  locale,
  href,
  onClose,
}: {
  lesson: LessonRef;
  status: LessonStatus;
  locale: Locale;
  href: string;
  onClose: () => void;
}) {
  const locked = status === "locked";
  return (
    <div className="fixed inset-0 z-20" onClick={onClose}>
      <div className="absolute inset-0 bg-black/55" />
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute inset-x-4 bottom-4 mx-auto flex max-w-md flex-col gap-1.5 rounded-2xl border-2 bg-surface p-4 shadow-2xl ${locked ? "border-border" : "border-primary"}`}
      >
        <div className={`flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider ${locked ? "text-muted" : "text-primary"}`}>
          {locked && <Lock size={13} />}
          {t(locale, "track.lesson", { n: lesson.indexInUnit + 1 })} · {localize(locale, lesson.unit.title)}
        </div>
        <div className="font-display text-lg font-bold">{localize(locale, lesson.lesson.title)}</div>
        <p className="mb-2 text-sm leading-relaxed text-muted">
          {localize(locale, lesson.lesson.description)}
          {!locked && ` · ${t(locale, "track.exercises", { n: lesson.lesson.exercises.length, xp: lesson.lesson.xp })}`}
        </p>
        {locked ? (
          <Button variant="disabled">{t(locale, "track.locked")}</Button>
        ) : (
          <Link href={href} className="block">
            <Button variant="primary" tabIndex={-1}>{t(locale, "track.start")}</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: TrackPath**

Create `src/components/TrackPath.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { lessonsOf, type LessonRef } from "@/content/tracks";
import type { Track } from "@/content/types";
import { localize, t, type Locale } from "@/i18n";
import { EMPTY, lessonStatus, load } from "@/lib/progress";
import { ComingSoonNode, LessonNode } from "./LessonNode";
import { LessonPopover } from "./LessonPopover";

const offsets = [0, -44, 0, 44];
const unitColors = ["bg-primary", "bg-unit-2", "bg-unit-3"];

export function TrackPath({ track, locale }: { track: Track; locale: Locale }) {
  const [progress, setProgress] = useState(EMPTY);
  const [open, setOpen] = useState<LessonRef | null>(null);
  useEffect(() => setProgress(load()), []);

  const refs = lessonsOf(track);
  const statusOf = (ref: LessonRef) => lessonStatus(ref.lesson.id, ref.previousLessonId, progress);
  const done = refs.filter((ref) => statusOf(ref) === "completed").length;
  const upNext = refs.find((ref) => statusOf(ref) === "current");
  let unitIndex = 0;

  return (
    <div className="mx-auto flex max-w-5xl justify-center gap-12 px-4 py-6 lg:px-12">
      <div className="w-full max-w-md">
        {track.levels.map((level) =>
          level.units.map((unit) => {
            unitIndex += 1;
            const soon = unit.lessons.length === 0;
            const color = unitColors[(unitIndex - 1) % unitColors.length];
            return (
              <section key={unit.id} className="mb-2">
                <div
                  className={`mb-4 flex flex-col gap-0.5 rounded-2xl px-4 py-3.5 ${soon ? "border-2 border-dashed border-border bg-surface-2 text-muted" : `${color} text-white shadow-[0_4px_0_rgba(0,0,0,0.35)]`}`}
                >
                  <div className="text-[11px] font-bold uppercase tracking-wider opacity-85">
                    {localize(locale, level.title)} · {t(locale, "track.unit", { n: unitIndex })}
                  </div>
                  <div className="font-display text-lg font-bold">
                    {localize(locale, unit.title)}
                    {soon && <span className="ml-2 font-sans text-xs font-semibold">{t(locale, "track.comingSoon")}</span>}
                  </div>
                </div>
                <div className="flex flex-col items-center gap-6 pb-4 pt-6">
                  {soon
                    ? [0, 1].map((i) => <ComingSoonNode key={i} offset={offsets[i]} />)
                    : unit.lessons.map((lesson, i) => {
                        const ref = refs.find((r) => r.lesson.id === lesson.id)!;
                        const status = statusOf(ref);
                        return (
                          <LessonNode
                            key={lesson.id}
                            status={status}
                            label={localize(locale, lesson.title)}
                            offset={offsets[i % offsets.length]}
                            startLabel={status === "current" ? t(locale, "track.start") : undefined}
                            onClick={() => setOpen(ref)}
                          />
                        );
                      })}
                </div>
              </section>
            );
          }),
        )}
      </div>

      <aside className="hidden w-72 flex-col gap-3.5 pt-3.5 lg:flex">
        <Card label={t(locale, "track.track")}>
          {localize(locale, track.title)} · {upNext ? localize(locale, upNext.level.title) : ""}
        </Card>
        <Card label={t(locale, "track.progress")}>
          <div className="flex justify-between">
            <span>{t(locale, "track.progressCount", { done, total: refs.length })}</span>
            <span className="text-ok-text">{Math.round((done / refs.length) * 100)}%</span>
          </div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full border border-border bg-surface-2">
            <div className="h-full bg-ok" style={{ width: `${(done / refs.length) * 100}%` }} />
          </div>
        </Card>
        <Card label={t(locale, "track.upNext")}>
          {upNext ? (
            <>
              <div>{localize(locale, upNext.lesson.title)}</div>
              <div className="text-sm font-semibold text-muted">{localize(locale, upNext.lesson.description)}</div>
            </>
          ) : (
            t(locale, "track.allDone")
          )}
        </Card>
      </aside>

      {open && (
        <LessonPopover
          lesson={open}
          status={statusOf(open)}
          locale={locale}
          href={`/${locale}/${track.id}/${open.lesson.id}`}
          onClose={() => setOpen(null)}
        />
      )}
    </div>
  );
}

function Card({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border-2 border-border bg-surface p-4 font-bold">
      <div className="text-[11px] font-bold uppercase tracking-wider text-muted">{label}</div>
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Track page**

Replace the `<main>` in `src/app/[locale]/[track]/page.tsx`:

```tsx
import { TrackPath } from "@/components/TrackPath";
// ...
      <main>
        <TrackPath track={track} locale={locale} />
      </main>
```

Remove the now-unused `localize` import.

- [ ] **Step 5: Verify**

Run: `npm run format && npm run lint && npx tsc --noEmit && npm run build`
Expected: passes. `npm run dev`, `/en/react`: four colored units with circles, first circle current with "START", the rest locked, later units dashed "coming soon". Tap a locked circle → popover with title/description and disabled button. Tap the current one → "Start" links to `/en/react/jsx-basics-1` (404 for now, Task 11). Resize ≥ 1024px → side cards visible with `0 / 12 lessons`. Switch to `/pt-BR/react`: labels in Portuguese.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(track): add lesson path, nodes, popover and progress cards"
```

---

### Task 10: Code highlighting

**Files:**
- Create: `src/lib/highlight.ts`, `src/components/CodeBlock.tsx`

**Interfaces:**
- Produces: `highlight(code: string): Promise<string>` (HTML, `___` wrapped in `<span class="blank">`), `CodeBlock({ html })`.

- [ ] **Step 1: Install shiki**

```bash
npm install shiki
```

- [ ] **Step 2: highlight.ts**

Create `src/lib/highlight.ts`:

```ts
import { codeToHtml } from "shiki";

// ponytail: single dark theme; the code block stays dark in light mode by design.
export async function highlight(code: string) {
  const html = await codeToHtml(code, { lang: "tsx", theme: "catppuccin-mocha" });
  return html.replace("___", '<span class="blank">___</span>');
}
```

- [ ] **Step 3: CodeBlock**

Create `src/components/CodeBlock.tsx`:

```tsx
export function CodeBlock({ html }: { html: string }) {
  return <div className="font-mono" dangerouslySetInnerHTML={{ __html: html }} />;
}
```

- [ ] **Step 4: Quick check**

Run:

```bash
node -e 'import("shiki").then(async ({codeToHtml}) => console.log((await codeToHtml("const a = <h1>___</h1>", {lang:"tsx", theme:"catppuccin-mocha"})).includes("___")))'
```
Expected: `true`.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(lesson): add shiki code highlighting"
```

---

### Task 11: Lesson screen

**Files:**
- Create: `src/components/ProgressBar.tsx`, `src/components/SingleChoice.tsx`, `src/components/MultiChoice.tsx`, `src/components/FillBlank.tsx`, `src/components/LessonComplete.tsx`, `src/components/LessonRunner.tsx`, `src/app/[locale]/[track]/[lessonId]/page.tsx`

**Interfaces:**
- Consumes: `findLesson`, `lessonsOf` (Task 5); `isAnswered`, `isCorrect`, `Answer` (Task 4); `completeLesson`, `lessonStatus`, `load` (Task 3); `highlight`, `CodeBlock` (Task 10); `Button`, icons (Task 7).
- Produces: `LessonRunner({ lesson, unitTitle, previousLessonId, locale, trackHref, codeHtml })`.

- [ ] **Step 1: ProgressBar**

Create `src/components/ProgressBar.tsx`:

```tsx
export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-3.5 flex-1 overflow-hidden rounded-full border border-border bg-surface-2">
      <div className="h-full rounded-full bg-ok transition-[width] duration-300" style={{ width: `${value * 100}%` }} />
    </div>
  );
}
```

- [ ] **Step 2: Option styling shared by both choice components**

Create `src/components/Option.tsx`:

```tsx
import { Check } from "./icons";

export type OptionState = "idle" | "selected" | "right" | "wrong";

const box: Record<OptionState, string> = {
  idle: "border-border bg-surface text-text",
  selected: "border-primary bg-primary-soft text-text",
  right: "border-ok bg-ok-soft text-ok-text",
  wrong: "border-bad bg-bad-soft text-bad-text",
};
const marker: Record<OptionState, string> = {
  idle: "border-border text-muted",
  selected: "border-primary bg-primary text-white",
  right: "border-ok bg-ok text-ok-on",
  wrong: "border-bad bg-bad text-white",
};

export function Option({
  state,
  kind,
  index,
  label,
  disabled,
  onClick,
}: {
  state: OptionState;
  kind: "radio" | "check";
  index: number;
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  const showCheck = kind === "check" && state !== "idle";
  return (
    <button
      type="button"
      role={kind === "radio" ? "radio" : "checkbox"}
      aria-checked={state !== "idle"}
      disabled={disabled}
      onClick={onClick}
      className={`flex min-h-[52px] w-full items-center gap-3 rounded-2xl border-2 border-b-4 px-4 py-3 text-left text-[15px] font-semibold transition-colors duration-100 ${box[state]}`}
    >
      <span className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center border-2 text-xs ${kind === "radio" ? "rounded-lg" : "rounded-md"} ${marker[state]}`}>
        {kind === "radio" ? index + 1 : showCheck && <Check size={14} />}
      </span>
      <span>{label}</span>
    </button>
  );
}
```

- [ ] **Step 3: SingleChoice and MultiChoice**

Create `src/components/SingleChoice.tsx`:

```tsx
import type { SingleChoice as Exercise } from "@/content/types";
import { localize, type Locale } from "@/i18n";
import { Option, type OptionState } from "./Option";

export function SingleChoice({
  exercise,
  locale,
  answer,
  checked,
  onChange,
}: {
  exercise: Exercise;
  locale: Locale;
  answer: number | null;
  checked: boolean;
  onChange: (answer: number) => void;
}) {
  function stateOf(i: number): OptionState {
    if (!checked) return answer === i ? "selected" : "idle";
    if (i === exercise.correct) return "right";
    if (i === answer) return "wrong";
    return "idle";
  }
  return (
    <div role="radiogroup" className="flex flex-col gap-2.5">
      {exercise.options.map((option, i) => (
        <Option
          key={i}
          kind="radio"
          index={i}
          state={stateOf(i)}
          label={localize(locale, option)}
          disabled={checked}
          onClick={() => onChange(i)}
        />
      ))}
    </div>
  );
}
```

Create `src/components/MultiChoice.tsx`:

```tsx
import type { MultiChoice as Exercise } from "@/content/types";
import { localize, t, type Locale } from "@/i18n";
import { Option, type OptionState } from "./Option";

export function MultiChoice({
  exercise,
  locale,
  answer,
  checked,
  onChange,
}: {
  exercise: Exercise;
  locale: Locale;
  answer: number[];
  checked: boolean;
  onChange: (answer: number[]) => void;
}) {
  function stateOf(i: number): OptionState {
    const picked = answer.includes(i);
    if (!checked) return picked ? "selected" : "idle";
    if (exercise.correct.includes(i)) return "right";
    if (picked) return "wrong";
    return "idle";
  }
  function toggle(i: number) {
    onChange(answer.includes(i) ? answer.filter((v) => v !== i) : [...answer, i]);
  }
  return (
    <div className="flex flex-col gap-2.5">
      <div className="-mt-2 text-sm text-muted">{t(locale, "lesson.selectAll")}</div>
      {exercise.options.map((option, i) => (
        <Option
          key={i}
          kind="check"
          index={i}
          state={stateOf(i)}
          label={localize(locale, option)}
          disabled={checked}
          onClick={() => toggle(i)}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 4: FillBlank**

Create `src/components/FillBlank.tsx`:

```tsx
import { t, type Locale } from "@/i18n";

export function FillBlank({
  locale,
  answer,
  checked,
  correct,
  onChange,
}: {
  locale: Locale;
  answer: string;
  checked: boolean;
  correct: boolean;
  onChange: (answer: string) => void;
}) {
  let border = "border-border";
  if (checked) border = correct ? "border-ok" : "border-bad";
  return (
    <input
      type="text"
      value={answer}
      disabled={checked}
      onChange={(e) => onChange(e.target.value)}
      placeholder={t(locale, "lesson.typeAnswer")}
      autoCapitalize="off"
      autoCorrect="off"
      spellCheck={false}
      className={`min-h-[52px] w-full rounded-2xl border-2 border-b-4 bg-surface px-4 py-3.5 font-mono text-[15px] text-text outline-none ${border}`}
    />
  );
}
```

- [ ] **Step 5: LessonComplete**

Create `src/components/LessonComplete.tsx`:

```tsx
import Link from "next/link";
import { t, type Locale } from "@/i18n";
import { Button } from "./Button";
import { Bolt, Flame, Trophy } from "./icons";

export function LessonComplete({
  locale,
  subtitle,
  xp,
  streak,
  trackHref,
}: {
  locale: Locale;
  subtitle: string;
  xp: number;
  streak: number;
  trackHref: string;
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-2.5 px-6 text-center">
        <Trophy size={64} className="text-xp" />
        <h1 className="font-display text-2xl font-extrabold">{t(locale, "lesson.complete")}</h1>
        <p className="font-semibold text-muted">{subtitle}</p>
        <div className="mt-3.5 flex w-full max-w-sm gap-3">
          <Stat label={t(locale, "lesson.xpEarned")} color="border-xp text-xp" icon={<Bolt size={18} />} value={String(xp)} />
          <Stat label={t(locale, "lesson.streak")} color="border-streak text-streak" icon={<Flame size={18} />} value={t(locale, "lesson.days", { n: streak })} />
        </div>
      </div>
      <div className="border-t-2 border-border bg-surface p-4 pb-6">
        <Link href={trackHref} className="mx-auto block max-w-md">
          <Button variant="primary" tabIndex={-1}>{t(locale, "lesson.continue")}</Button>
        </Link>
      </div>
    </div>
  );
}

function Stat({ label, color, icon, value }: { label: string; color: string; icon: React.ReactNode; value: string }) {
  return (
    <div className={`flex flex-1 flex-col items-center gap-1.5 rounded-2xl border-2 bg-surface p-3.5 ${color}`}>
      <div className="text-[11px] font-bold uppercase tracking-wider text-muted">{label}</div>
      <div className="flex items-center gap-1.5 font-display text-xl font-extrabold">
        {icon}
        <span>{value}</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: LessonRunner**

Create `src/components/LessonRunner.tsx`:

```tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Exercise, Lesson } from "@/content/types";
import { localize, t, type Locale } from "@/i18n";
import { isAnswered, isCorrect, type Answer } from "@/lib/check";
import { completeLesson, lessonStatus, load } from "@/lib/progress";
import { Button } from "./Button";
import { CodeBlock } from "./CodeBlock";
import { FillBlank } from "./FillBlank";
import { Check, Close } from "./icons";
import { LessonComplete } from "./LessonComplete";
import { MultiChoice } from "./MultiChoice";
import { ProgressBar } from "./ProgressBar";
import { SingleChoice } from "./SingleChoice";

type Phase = "answering" | "checked" | "complete";

function emptyAnswer(exercise: Exercise): Answer {
  if (exercise.type === "multi-choice") return [];
  if (exercise.type === "fill-blank") return "";
  return -1;
}

function normalize(exercise: Exercise, answer: Answer): Answer | null {
  if (exercise.type === "single-choice" && answer === -1) return null;
  return answer;
}

export function LessonRunner({
  lesson,
  unitTitle,
  previousLessonId,
  locale,
  trackHref,
  codeHtml,
}: {
  lesson: Lesson;
  unitTitle: string;
  previousLessonId: string | null;
  locale: Locale;
  trackHref: string;
  codeHtml: (string | null)[];
}) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<Answer>(() => emptyAnswer(lesson.exercises[0]));
  const [phase, setPhase] = useState<Phase>("answering");
  const [result, setResult] = useState({ xp: 0, streak: 0 });

  useEffect(() => {
    if (lessonStatus(lesson.id, previousLessonId, load()) === "locked") router.replace(trackHref);
  }, [lesson.id, previousLessonId, router, trackHref]);

  const exercise = lesson.exercises[index];
  const normalized = normalize(exercise, answer);
  const correct = phase === "checked" && isCorrect(exercise, normalized);

  function check() {
    setPhase("checked");
  }

  function next() {
    const last = index === lesson.exercises.length - 1;
    if (!last) {
      setIndex(index + 1);
      setAnswer(emptyAnswer(lesson.exercises[index + 1]));
      setPhase("answering");
      return;
    }
    const already = load().completedLessons.includes(lesson.id);
    const progress = completeLesson(lesson.id, lesson.xp);
    setResult({ xp: already ? 0 : lesson.xp, streak: progress.streak });
    setPhase("complete");
  }

  if (phase === "complete") {
    return (
      <LessonComplete
        locale={locale}
        subtitle={`${unitTitle} · ${localize(locale, lesson.title)}`}
        xp={result.xp}
        streak={result.streak}
        trackHref={trackHref}
      />
    );
  }

  const checked = phase === "checked";
  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col">
      <div className="flex items-center gap-3.5 px-4 pb-2.5 pt-4">
        <Link href={trackHref} aria-label={t(locale, "lesson.close")} className="flex h-11 w-11 items-center justify-center text-muted">
          <Close size={20} />
        </Link>
        <ProgressBar value={index / lesson.exercises.length} />
      </div>

      <div className="flex flex-1 flex-col gap-3.5 px-5 py-3.5">
        <h1 className="font-display text-xl font-bold leading-snug">{localize(locale, exercise.prompt)}</h1>
        {codeHtml[index] && <CodeBlock html={codeHtml[index]} />}
        {exercise.type === "single-choice" && (
          <SingleChoice exercise={exercise} locale={locale} answer={answer === -1 ? null : (answer as number)} checked={checked} onChange={setAnswer} />
        )}
        {exercise.type === "multi-choice" && (
          <MultiChoice exercise={exercise} locale={locale} answer={answer as number[]} checked={checked} onChange={setAnswer} />
        )}
        {exercise.type === "fill-blank" && (
          <FillBlank locale={locale} answer={answer as string} checked={checked} correct={correct} onChange={setAnswer} />
        )}
      </div>

      {!checked && (
        <div className="border-t-2 border-border bg-surface p-4 pb-6">
          <Button variant={isAnswered(exercise, normalized) ? "ok" : "disabled"} onClick={check}>
            {t(locale, "lesson.check")}
          </Button>
        </div>
      )}
      {checked && (
        <div className={`flex flex-col gap-1 p-5 pb-6 ${correct ? "bg-ok-soft text-ok-text" : "bg-bad-soft text-bad-text"}`}>
          <div className="flex items-center gap-2 text-lg font-extrabold">
            <span className={`flex h-[26px] w-[26px] items-center justify-center rounded-full ${correct ? "bg-ok-text text-ok-soft" : "bg-bad-text text-bad-soft"}`}>
              {correct ? <Check size={16} /> : <Close size={16} />}
            </span>
            {t(locale, correct ? "lesson.correct" : "lesson.wrong")}
          </div>
          {!correct && <div className="mb-3 text-sm">{explanation(exercise, locale)}</div>}
          <Button variant={correct ? "ok" : "bad"} onClick={next}>{t(locale, "lesson.continue")}</Button>
        </div>
      )}
    </div>
  );
}

function explanation(exercise: Exercise, locale: Locale) {
  if (exercise.type === "single-choice") {
    return t(locale, "lesson.correctAnswer", { answer: localize(locale, exercise.options[exercise.correct]) });
  }
  if (exercise.type === "fill-blank") return t(locale, "lesson.correctAnswer", { answer: exercise.answer });
  return t(locale, "lesson.correctHighlighted");
}
```

- [ ] **Step 7: Lesson page**

Create `src/app/[locale]/[track]/[lessonId]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { LessonRunner } from "@/components/LessonRunner";
import { findLesson, findTrack, lessonsOf, tracks } from "@/content/tracks";
import { localize, type Locale } from "@/i18n";
import { highlight } from "@/lib/highlight";

export const dynamicParams = false;

export function generateStaticParams() {
  return tracks.flatMap((track) =>
    lessonsOf(track).map((ref) => ({ track: track.id, lessonId: ref.lesson.id })),
  );
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ locale: Locale; track: string; lessonId: string }>;
}) {
  const { locale, track: trackId, lessonId } = await params;
  const track = findTrack(trackId);
  const ref = track && findLesson(track, lessonId);
  if (!track || !ref) notFound();

  const codeHtml = await Promise.all(
    ref.lesson.exercises.map((exercise) => (exercise.code ? highlight(exercise.code) : null)),
  );

  return (
    <main>
      <LessonRunner
        lesson={ref.lesson}
        unitTitle={localize(locale, ref.unit.title)}
        previousLessonId={ref.previousLessonId}
        locale={locale}
        trackHref={`/${locale}/${track.id}`}
        codeHtml={codeHtml}
      />
    </main>
  );
}
```

- [ ] **Step 8: Verify**

Run: `npm run format && npm run lint && npx tsc --noEmit && npm run build`
Expected: 12 lesson routes × 2 locales prerendered. `npm run dev`:
- `/en/react/jsx-basics-1`: prompt, options, disabled "Check" until an option is picked; wrong pick shows red footer with the correct answer; fill-blank shows a yellow `___` chip in the code and an input.
- Finish the lesson: complete screen shows `10` XP and `1 days`; "Continue" returns to the track where the first circle is green and the second is current; the header shows 1 streak / 10 XP.
- Redo the same lesson: XP earned shows `0`, header XP unchanged.
- Open `/en/react/jsx-basics-3` directly with fresh localStorage: redirected to `/en/react`.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat(lesson): add lesson runner with three exercise types, feedback and completion"
```

---

### Task 12: Motion

**Files:**
- Modify: `src/app/globals.css` (append), `src/app/[locale]/layout.tsx`, `src/components/LessonNode.tsx`, `src/components/LessonPopover.tsx`, `src/components/LessonComplete.tsx`

**Interfaces:**
- Consumes: `ViewTransition` from `react`.

- [ ] **Step 1: Keyframes and reduced motion**

Append to `src/app/globals.css`:

```css
@keyframes node-in {
  from { opacity: 0; transform: translateY(12px) scale(0.9); }
  to { opacity: 1; transform: none; }
}
@keyframes ring-pulse {
  0%, 100% { outline-color: var(--primary-soft); }
  50% { outline-color: color-mix(in srgb, var(--primary) 35%, transparent); }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
@keyframes slide-up {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: none; }
}
@keyframes pop {
  0% { transform: scale(0.4); opacity: 0; }
  60% { transform: scale(1.15); opacity: 1; }
  100% { transform: scale(1); }
}
@keyframes screen-in {
  from { opacity: 0; transform: translateX(24px); }
}
@keyframes screen-out {
  to { opacity: 0; transform: translateX(-24px); }
}

.node-enter { animation: node-in 320ms cubic-bezier(0.2, 0.8, 0.2, 1) both; }
.node-enter > * { animation: inherit; }
.ring-pulse { animation: ring-pulse 2.4s ease-in-out infinite; }
.float { animation: float 2s ease-in-out infinite; }
.slide-up { animation: slide-up 220ms cubic-bezier(0.2, 0.8, 0.2, 1) both; }
.pop { animation: pop 500ms cubic-bezier(0.2, 0.8, 0.2, 1) both; }

::view-transition-old(.screen) { animation: screen-out 180ms ease-in both; }
::view-transition-new(.screen) { animation: screen-in 220ms ease-out both; }

@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after { animation: none !important; transition: none !important; }
  ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { animation: none !important; }
}
```

- [ ] **Step 2: View transitions in the layout**

In `src/app/[locale]/layout.tsx`, import and wrap children:

```tsx
import { ViewTransition } from "react";
// ...
      <body className="min-h-dvh bg-canvas font-sans text-text">
        <ViewTransition default="screen">{children}</ViewTransition>
      </body>
```

If TypeScript reports `ViewTransition` is not exported from `react`, use `import { unstable_ViewTransition as ViewTransition } from "react";`.

- [ ] **Step 3: Track cascade, pulse, float**

In `src/components/LessonNode.tsx`:
- Add an `index: number` prop to `LessonNode` and `ComingSoonNode`; pass `index={i}` from `TrackPath` in both call sites.
- Wrap the outer element style: `style={{ transform: \`translateX(${offset}px)\`, animationDelay: \`${index * 60}ms\` }}` and add `node-enter` to the className of both components.
- On the current node add `ring-pulse` to `styles.current`.
- On the START bubble add the `float` class.

Because `node-enter` animates `transform`, the zig-zag `translateX` would be overridden during the animation. Wrap the node in a positioned `<div className="node-enter" style={{ animationDelay }}>` and keep `translateX` on the inner button instead. Apply the same wrapper to `ComingSoonNode`.

- [ ] **Step 4: Popover slide**

In `src/components/LessonPopover.tsx` add `slide-up` to the popover card's className.

- [ ] **Step 5: Complete screen**

In `src/components/LessonComplete.tsx`:
- Add `pop` to the `Trophy` wrapper: `<div className="pop"><Trophy … /></div>`.
- Add `slide-up` to each `Stat` root and pass `style={{ animationDelay: "150ms" }}` to the first and `"260ms"` to the second (add an optional `delay` prop to `Stat`).
- Count-up for the XP stat: create a hook in the same file:

```tsx
function useCountUp(target: number, duration = 600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return setValue(target);
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);
  return value;
}
```

  Add `"use client";` at the top of the file, import `useEffect, useState`, and use `const shownXp = useCountUp(xp); const shownStreak = useCountUp(streak);` for the two values.

- [ ] **Step 6: Verify**

Run: `npm run format && npm run lint && npx tsc --noEmit && npm run build`
Expected: passes. In the browser: circles cascade in on the track, current ring pulses, START floats, popover slides up, navigation between track and lesson fades/slides, the complete screen pops and counts up. On the exercise screen nothing moves until you act. Enable "reduce motion" in the OS: all of it stops.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(ui): add screen transitions, track and completion animations"
```

---

### Task 13: CI and README

**Files:**
- Create: `.github/workflows/ci.yml`, `README.md`

- [ ] **Step 1: Workflow**

Create `.github/workflows/ci.yml`:

```yaml
name: ci
on:
  pull_request:
  push:
    branches: [main]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

- [ ] **Step 2: README**

Create `README.md`:

```markdown
# devlingo

Duolingo-style lessons for learning technologies. The first track is React.

## Develop

```bash
fnm use
npm install
npm run dev
```

`npm run build` type-checks, runs the tests (including content validation) and builds the site.

## Add content

Content is plain TypeScript in `src/content`. A track has levels, levels have units, units have lessons of 5 to 8 exercises. Three exercise types: `single-choice`, `multi-choice`, `fill-blank` (one `___` in the code). Every user-facing string is `{ en, "pt-BR"? }`; English is the fallback. Lesson ids are permanent because they live in users' saved progress.

## Progress

Stored in localStorage as one object (`xp`, `streak`, `lastActiveDay`, `completedLessons`) behind `load()`/`save()` in `src/lib/progress.ts`.
```

- [ ] **Step 3: Verify and commit**

Run: `npm run lint`
Expected: prettier accepts the new files.

```bash
git add -A
git commit -m "ci: add lint, test and build workflow and readme"
```

---

## Self-review

**Spec coverage.** §1 types → Task 2; content rules and helpers → Tasks 5–6; §2 routes → Task 8, track screen and popover → Task 9, lesson screen and completion → Task 11, redirect on locked lesson → Task 11 `useEffect`; §3 tokens, fonts, icons, theme → Task 7, motion → Task 12; §4 progress → Task 3; §5 i18n → Task 2 and Task 8 (proxy, switcher); §6 tests → Tasks 2–5, scripts → Task 1, CI → Task 13; §7 layout → file structure; §8 content scope → Tasks 5–6; §9 out of scope → nothing planned for it.

**Placeholders.** Task 6 describes units 2–4 as exercise briefs rather than literal TypeScript; each brief names the type, prompt, and correct answer, and the validation test enforces the shape. This is the one deliberate compression in the plan.

**Type consistency.** `LessonRef` fields (`lesson`, `unit`, `level`, `unitIndex`, `indexInUnit`, `previousLessonId`) are used identically in Tasks 5, 9, 11. `lessonStatus(lessonId, previousLessonId, progress)` matches Tasks 3, 9, 11. `Answer`/`isAnswered`/`isCorrect` match Tasks 4 and 11. `t`/`localize`/`isLocale`/`locales` match Tasks 2, 7–11.
