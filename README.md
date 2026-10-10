# ClearDay ☀️

**A gentler productivity planner that matches your tasks to your energy — not just your calendar.**

ClearDay helps people who feel overwhelmed by long to-do lists choose a realistic next step. Add tasks with a category, priority, estimated duration, and energy requirement. Then check in with yourself and ClearDay recommends a task that fits the kind of energy you have right now.

> Portfolio project built with Next.js, TypeScript, React, Tailwind CSS, and a layered architecture.

## Why this project?

Traditional task lists treat every task and every day as if they were the same. ClearDay adds an energy-aware planning layer so a user can make progress on a low-energy day without feeling that the entire plan has failed.

## Features

- **Energy-aware recommendations** — select low, steady, or deep-focus energy and get a ranked next task.
- **Task management** — create, complete, reopen, search, filter, and delete tasks.
- **Useful task metadata** — category, priority, estimated minutes, and energy requirement.
- **Daily overview** — completion rate, completed focus time, remaining tasks, and momentum indicator.
- **Local-first persistence** — tasks and energy preference are stored in the browser using `localStorage`; no account or backend is required.
- **Responsive interface** — desktop sidebar, compact tablet navigation, and mobile-first layouts.
- **Accessible interactions** — semantic sections, labelled controls, dialog semantics, keyboard focus states, and reduced-motion support.
- **Defensive handling** — validates task input, handles malformed local storage safely, and avoids exposing secrets.

## Tech stack

- Next.js 14 App Router
- React 18 + TypeScript (strict mode)
- Tailwind CSS 3 for project styling configuration, with a small custom CSS design system
- Lucide React icons
- Browser `localStorage` for persistence

## Getting started

### Requirements

- Node.js 18.17+ (Node.js 20 LTS recommended)
- npm

### Run locally

```bash
git clone https://github.com/YOUR_USERNAME/clearday.git
cd clearday
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run typecheck
npm run build
npm start
```

## Project structure

```text
clearday/
├── public/                     # Static assets
├── src/
│   ├── app/
│   │   ├── globals.css         # Responsive design system and component styles
│   │   ├── layout.tsx          # Root layout, metadata, viewport
│   │   └── page.tsx            # App route entry point
│   ├── components/
│   │   ├── clear-day-app.tsx   # Main interactive dashboard
│   │   └── task-dialog.tsx     # Task creation dialog and form
│   ├── domain/
│   │   └── task.ts             # Domain types and recommendation scoring
│   ├── application/
│   │   └── task-service.ts     # Task creation validation and dashboard use cases
│   └── infrastructure/
│       └── task-storage.ts     # Browser persistence adapter
├── .env.example
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## Architecture notes

The project separates concerns into four layers:

- **Domain** (`src/domain`) owns task types and energy-fit recommendation rules.
- **Application** (`src/application`) contains use cases and input validation.
- **Infrastructure** (`src/infrastructure`) owns browser persistence.
- **Presentation** (`src/components`, `src/app`) renders the experience and handles user interaction.

The UI imports application/domain interfaces rather than mixing task-scoring logic into the visual components. The storage adapter isolates browser persistence so it can later be replaced with an API-backed repository.

## Recommendation logic

The current recommendation score combines task priority, fit with the selected energy level, and a small duration penalty. It is intentionally simple and explainable, rather than claiming to infer a user's psychology. The scoring function is isolated in `src/domain/task.ts` so it can be unit-tested or evolved independently.

## Data and privacy

- All task data is stored locally in the browser under `clearday.tasks.v1`.
- The selected energy level is stored under `clearday.energy.v1`.
- No backend, analytics, or third-party account is used.
- Clearing browser site data removes saved tasks. The demo task list appears again if no saved task list exists.

## Production-readiness roadmap

This is a polished portfolio MVP, not a fully audited commercial service. Sensible next steps:

1. Add unit tests for the task scoring and validation rules (Vitest).
2. Add Playwright end-to-end coverage for create, complete, search, and persistence flows.
3. Add an error-reporting strategy and product analytics only with clear consent.
4. Add an optional authenticated API and database if cross-device sync becomes a requirement.
5. Add a CSP/security-header review and run Lighthouse/accessibility checks before a public launch.
6. Add CI to run type-check, tests, and production builds on every pull request.

## Before you publish

- Replace `YOUR_USERNAME` in the clone command after creating the GitHub repository.
- Run `npm install`, `npm run typecheck`, and `npm run build` locally.
- Capture a desktop and mobile screenshot and add them to the README if desired.
- Do not claim tests or Lighthouse scores that you have not actually run.

## License

MIT — see [LICENSE](./LICENSE).
