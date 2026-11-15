# Counter App: Test Setup

This directory contains the original React/TypeScript counter app, plus the Jest and React Testing Library tests for **AD361 Lab 03**. The application logic in `src/App.tsx` has not been changed.

## Run the app

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

## Run the tests and coverage

```bash
npm test
npm test -- --coverage
```

There are six tests in `src/App.test.tsx` covering the starting display, all three button handlers, a sequence of clicks, and resetting an already-zero count. Jest uses jsdom, so it doesn't need a live browser window to run the component tests.

**Before submission:** take an actual screenshot of both command results and save them as `../evidence/test-run.png` and `../evidence/coverage-report.png`. Coverage output is also available in `coverage/index.html`, but generated coverage files are excluded from Git to keep the repository small.

The report and exploratory testing charter are in the [root README](../README.md).
