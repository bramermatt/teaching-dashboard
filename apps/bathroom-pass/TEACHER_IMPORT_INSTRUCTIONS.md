# Bathroom Break Tracker — Teacher Setup & Import Guide

Use this guide to customize `bathroomPass.html` for any teacher.

Quick option: use `teacher-portal/index.html` to paste your data and generate a teacher-specific link automatically.

---

## 1) Teacher Setup Questions (Fill this out first)

Copy/paste these questions into a doc or form and answer each one:

### A. Teacher + Class Basics
1. Teacher display name for the page title:
2. School name (optional):
3. Grade level(s):
4. Do you allow **one student out at a time**? (Yes/No)
5. Late threshold in minutes (default is 5):

### B. Bell Schedule
6. What are your class periods called? (Example: Period 1, Period 2, Advisory, etc.)
7. Which period is your **planning period**?
8. Start/end time for each period (HH:MM 24-hour format).
9. Do you have an alternate schedule (pep rally/testing/assembly)? (Yes/No)
10. If yes, list alternate schedule times for each period.

### C. Rosters
11. Provide student roster for each teaching period (not planning).
12. Should duplicate names be disambiguated with middle initial? (Yes/No)
13. Any students to exclude from RR list? (optional)

### D. Workflow Preferences
14. Do students request first, or does teacher send directly?
15. Should Requests be enabled? (Yes/No)
16. Should On Deck be enabled? (Yes/No)
17. Should first/last 15-minute lockout be enabled? (Yes/No)

---

## 2) How to Import Students & Planning Period

Open `bathroomPass.html` and update the sections below.

### Step 1 — Update period order
Find:

```js
const PERIOD_ORDER = ["Period 1", "Period 2", "Period 3", "Period 5", "Period 6", "Period 7"];
```

Replace with your real teaching periods (exclude planning).

### Step 2 — Set planning label and schedule
Find:

```js
const PLANNING_LABEL = "Planning";
const regularSchedule = [ ... ];
```

Set `PLANNING_LABEL` to your planning period name, then update all start/end times.

### Step 3 — Replace rosters
Find:

```js
const rosters = {
  "Period 1": [ ... ],
  ...
};
```

Replace each array with your students for that period.

> Important: every period in `PERIOD_ORDER` should exist in `rosters`.

### Step 4 — Confirm planning is not tracked
Planning should appear in `regularSchedule` but should **not** be included in `PERIOD_ORDER`.
That keeps planning visible for time logic but excluded from student tracking.

### Step 5 — Save and test
Quick smoke test checklist:
- Period auto-detects correctly based on current time.
- Students show for selected period.
- Request → On Deck → Send flow works.
- Return flow logs duration.
- First/last 15-minute block appears when expected.

---

## 3) Data Import Template (Copy/Paste format)

Use this format to prep rosters before editing code:

```txt
Period 1
Last, First
Last, First

Period 2
Last, First
Last, First
```

Then paste names into the matching `rosters` arrays.

---

## 4) Optional Enhancements for Multi-Teacher Use (Future)

If you want this to scale easily for many teachers, next step is to move data into a config JSON file, e.g.:

- `teacherName`
- `periodOrder`
- `planningLabel`
- `regularSchedule`
- `alternateSchedule`
- `rosters`

Then load that JSON at startup so each teacher only edits one config file.

---

## 5) Common Setup Mistakes

- Period appears in roster but not in `PERIOD_ORDER`.
- Period appears in `PERIOD_ORDER` but missing in `rosters`.
- Time format not using `HH:MM`.
- Planning period accidentally added to `PERIOD_ORDER`.
