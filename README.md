# AD361 – Lab 03: Exploratory and White Box Testing

**Application:** Counter App (React + TypeScript)  
**Focus:** exploratory testing, statement coverage, and testing React state changes

For this lab, I looked at how a small counter responds when someone presses Increment, Decrement, and Reset. I started by planning user-facing checks and then used the code to decide which statements should be covered by automated tests.

## Step 1 – Exploratory testing

**Testing charter:** I want to check that the count starts at zero, changes by one when I click the buttons, and returns to zero when I reset it. I also want to try a few sequences that a user might do, such as going below zero or continuing after a reset.

**Manual testing record:** The actions below are ready to try in the browser. The *Actual result* and *Status* columns must be completed after running the application. I have not marked unexecuted manual tests as passed.

| ID | Action I will try | Expected result | Actual result | Status |
|---|---|---|---|---|
| EX01 | Open the app | Display `Count: 0` and all three buttons | Not recorded yet | Not run |
| EX02 | Click Increment once | Count changes from 0 to 1 | Not recorded yet | Not run |
| EX03 | Click Increment two more times | Count changes from 1 to 3 | Not recorded yet | Not run |
| EX04 | Click Decrement once | Count changes from 3 to 2 | Not recorded yet | Not run |
| EX05 | Click Reset, then Decrement | Count returns to 0, then becomes -1 | Not recorded yet | Not run |
| EX06 | Click Reset twice | Count becomes 0 and remains 0 | Not recorded yet | Not run |
| EX07 | Click Increment after Reset | Count changes from 0 to 1 | Not recorded yet | Not run |

To complete this section, run `npm run dev`, try the actions in order, and replace *Not recorded yet* with what actually appeared on the screen and *Not run* with **Pass** or **Fail**.

## Step 2 – Source code review

After the exploratory session, the file to examine is `counter-app/src/App.tsx`.

- **Starting state:** `const [count, setCount] = useState(0)` gives the count an initial value of `0`.
- **Increment statement:** `setCount(count + 1)` runs when I click **Increment**.
- **Decrement statement:** `setCount(count - 1)` runs when I click **Decrement**.
- **Reset statement:** `setCount(0)` runs when I click **Reset**.
- **Display:** `<h1>Count: {count}</h1>` updates when the React state changes.

I did not find any `if`, `else`, `switch`, `for`, or `while` statements in this component. That means the interesting white-box target is **statement and function coverage**, especially the three click handlers. There is no application-defined branch or loop here to cover. The testing tool may show 100% branch coverage even though there are zero explicit branches; that percentage does not mean there were actual decisions to test.

## Steps 3–6 – Automated test cases

I created `counter-app/src/App.test.tsx` using **Jest** and **React Testing Library**. The tests are inside one `describe` block and use `render`, `screen`, `fireEvent`, and `expect` to check the displayed count.

| Test ID | What I test | Starting state / actions | Expected result |
|---|---|---|---|
| TC01 | Starting state and buttons | Render `<App />` | `Count: 0`; Increment, Decrement, Reset visible |
| TC02 | Increment handler | Start at 0; click Increment | `Count: 1` |
| TC03 | Decrement handler | Start at 0; click Decrement | `Count: -1` |
| TC04 | Reset handler | Increment twice; click Reset | Count goes from 2 back to 0 |
| TC05 | Multiple actions | Increment ×3, Decrement, Reset, Decrement, Increment | Counts are 3, 2, 0, -1, 0 at the expected steps |
| TC06 | Reset at zero | Start at 0; click Reset | `Count: 0` |

I made sure to change the count before testing Reset in TC04; otherwise the test wouldn't really show whether Reset does anything.

## Step 7 – Test run evidence

From the `counter-app` folder:

```bash
npm install
npm test
```

**Screenshot:** Add an actual screenshot of the Jest test output as [`evidence/test-run.png`](evidence/test-run.png) after running the suite.

**Verification status:** The test suite was written but **could not be run in the preparation environment**, because its npm dependencies were not available locally and the npm registry could not be reached. No passing test results are being claimed here.

## Step 8 – Code coverage

Run:

```bash
npm test -- --coverage
```

Record the `App.tsx` row from the Jest coverage summary:

| Coverage type | Reported percentage |
|---|---|
| Statements | Pending execution |
| Branches | Pending execution (no explicit branches in this component) |
| Functions | Pending execution |
| Lines | Pending execution |

**Screenshot:** Add your actual coverage screenshot as [`evidence/coverage-report.png`](evidence/coverage-report.png).

The tests exercise the initial render and each statement that updates `count`. After installing the dependencies, I would expect the three click handlers to be exercised by TC02–TC04. I still need the actual Jest coverage report to confirm the percentages and see whether any lines remain uncovered.

A high coverage number is helpful, but it does **not** prove that the app works correctly in every situation. Coverage only tells us which parts of the code were executed. It cannot tell us whether requirements are missing or whether the interface makes sense to someone using it.

## Step 9 – Exploratory vs. white-box testing

Exploratory testing made me think about the app as a user. One thing worth trying was going into negative numbers with Decrement, since the interface doesn't say the count has a minimum.

Once I looked at the source code, I noticed that Reset directly calls `setCount(0)`. That gave me a specific test idea: change the count first and then make sure it actually returns to zero. I also wanted one test for each click handler so I wouldn't accidentally leave part of the component untested.

The main limitation of exploratory testing is that I might miss code that I never reach through the interface. With white-box testing I can see the statements I need to exercise, but I could still miss a problem from the user's point of view. I think using both approaches gives a clearer picture than either one alone.

## How to run and submit

1. Open a terminal in `counter-app`, run `npm install`, and then `npm run dev`.
2. Complete the manual exploratory observations in Step 1 **before reviewing `App.tsx` yourself**, as the assignment requests.
3. Run `npm test` and `npm test -- --coverage`; record the actual coverage percentages.
4. Save **real screenshots** of both command outputs inside `evidence/` and commit them with the rest of the lab.
5. Push this folder to a **public GitHub repository** and submit the repository URL in Canvas.

The teacher's original requirements are saved in [`docs/original-assignment.md`](docs/original-assignment.md).

## AI use
I used ChatGPT to help improve grammar and wording.