# React interview coverage

Date: 2026-09-07

The goal for the React track: a developer who finishes it can answer the questions a React interview actually asks. This maps the 110 questions in [GreatFrontEnd's "100 React interview questions"](https://www.greatfrontend.com/blog/100-react-interview-questions-straight-from-ex-interviewers) onto the track, and records what we deliberately leave out.

## Implementation status

Five of 27 units have content: JSX basics, Components & props, State with useState, Handling events, and Lists & keys. That is 15 regular lessons, five side quests and four cumulative challenges. Conditional rendering is next.

The tables below describe the target coverage, not a claim that the remaining units are implemented. Some library questions are addressed conceptually in optional side quests; API trivia and obsolete tooling are explicitly excluded below.

## Units and the questions they must answer

Numbers are the article's. A unit is "done" when a learner who passed it can answer them.

### Beginner

| Unit | Questions |
| --- | --- |
| JSX basics | 2, 6, 45 |
| Components & props | 5, 9, 20, 21, 59, 60, 61, 62 |
| State with useState | 23, 49, 16 |
| Handling events | 52 |
| Lists & keys | 7, 8 |
| Conditional rendering | — (feeds 45, 47) |
| Forms | 15, 63 |

### Intermediate

| Unit | Questions |
| --- | --- |
| useEffect | 26, 27, 41 |
| Data fetching *(new)* | 64, 65, 105 (the `use` half is Expert) |
| Lifting state up | 16, 44, 50 |
| Context | 43, 46, 48 |
| Refs | 28, 36 |
| Custom hooks | 24, 25, 34 |
| TypeScript with React *(new)* | 19, 22 |
| Performance basics | 17, 30, 31, 35, 56 |

### Advanced

| Unit | Questions |
| --- | --- |
| Reducers | 32 |
| Suspense & lazy | 38, 42, 51 |
| Error boundaries | 37 |
| Portals | 40 |
| Render patterns | 47, 62, 18, 33 |
| Testing components | 87, 88, 89, 90, 91, 92, 93, 94, 96, 97 |
| Class components (legacy) *(new)* | 10, 11, 29, 53 |

### Expert

| Unit | Questions |
| --- | --- |
| Concurrent rendering | 54, 55, 109 |
| Actions & the `use` hook *(new)* | 101, 102, 103, 104, 105, 110 |
| Server components | 39, 57, 58, 106, 107 |
| Compiler & memoization | 108 |
| Reconciliation internals | 3, 4, 12, 13, 14 |

Questions 1 ("what is React") and 66–79 (Router) are handled below.

## The four new units

1. **Data fetching** (Intermediate, after useEffect) — loading and error states, race conditions, cancelling, why a bare `fetch` in `useEffect` bites.
2. **TypeScript with React** (Intermediate) — typing props, children, events and hooks; why `PropTypes` faded.
3. **Class components (legacy)** (Advanced) — lifecycle, `setState` with a callback, where they still turn up. Not to write, to read and answer.
4. **Actions & the `use` hook** (Expert) — `useActionState`, `useOptimistic`, `use`, form `action`. The article's whole React 19 block.

## Side quests: the out-of-scope topics

Routing (66–79), localization (80–86) and Redux-related testing (98) extend beyond React's core API. Their underlying problems belong in **side quests**: one optional bonus lesson hanging off each unit, worth double XP, framed by the problem rather than the library's name. Questions 95, 99 and 100 concern legacy testing approaches and are deliberately excluded, not assigned to an extra.

| Unit | Side quest | The problem |
| --- | --- | --- |
| JSX basics | Styling components | Where do styles live |
| Components & props | Component libraries | Not rebuilding buttons forever |
| State with useState | Global state | State two distant components share (Redux, Zustand) |
| Handling events | Forms at scale | Validation without re-rendering everything |
| Lists & keys | Long lists | Rendering ten thousand rows |
| Conditional rendering | Feature flags | Shipping code that is off |
| Forms | Schema validation | One source of truth for shape (zod) |
| useEffect | Effects you should not write | Deriving instead of syncing |
| Data fetching | Server cache | Caching, dedupe, invalidation (React Query, SWR) |
| Lifting state up | URL as state | Routing (React Router) |
| Context | Theming and localization | Sharing theme and locale; translation catalogs and locale-aware formatting (80) |
| Refs | Animation | Motion without fighting React |
| Custom hooks | Hook collections | What is worth borrowing |
| TypeScript with React | Generated types | Types from the API, not by hand |
| Performance basics | Measuring | Profiler before optimizing |
| Reducers | State machines | Impossible states (XState) |
| Suspense & lazy | Bundles | What ships on first load |
| Error boundaries | Error monitoring | Knowing it broke in production (Sentry) |
| Portals | Accessible overlays | Dialogs that keyboards survive |
| Render patterns | Headless components | Behavior without markup |
| Testing components | End-to-end tests | The click a unit test cannot make |
| Class components | Migrating | Moving legacy code forward |
| Concurrent rendering | Streaming | Sending HTML in pieces |
| Actions & `use` | Forms without a client | Progressive enhancement |
| Server components | Frameworks | Who runs your React (Next.js) |
| Compiler & memoization | Build tooling | What the compiler already does |
| Reconciliation internals | Reading React's source | Where to look when curious |

Question 1 ("what is React and its main features") is the JSX basics intro; 47 (anti-patterns) and 48 (state vs context vs a store) are spread across the units that own each anti-pattern.

## Deliberately not covered

- `react-intl` specifics (81–86) as API questions. The concept lives in the Context side quest; the API is a library manual.
- Redux-specific testing APIs (98). The Global state side quest covers stores conceptually; Testing components covers provider-based tests without requiring Redux.
- Shallow renderer (95), shallow-versus-full rendering trivia (99), and TestRenderer (100). These legacy APIs are not taught; Testing components focuses on observable behavior with DOM-based tests.
- Router API trivia (71–79). The URL-as-state side quest covers what interviewers actually probe.

## Interview mode (later)

Once the units exist, a "interview mode" can draw 15 questions from the whole track using the challenge machinery already built. Cheap to add, and it is exactly the end state this document is written for.
