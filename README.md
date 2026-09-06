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
