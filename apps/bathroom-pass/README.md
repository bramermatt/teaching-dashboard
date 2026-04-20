# bathroom-break

## Teacher setup docs

- See `TEACHER_IMPORT_INSTRUCTIONS.md` for a questionnaire and step-by-step instructions to import students, set planning period, and update schedules.
- Use `teacher-portal/index.html` to paste rosters/schedule, save a teacher config, and generate a teacher-specific link (`bathroomPass.html?teacher=your-id`).
- `index.html` now redirects to `bathroomPass.html` with the same query string, so your personal teacher link works from either entry point.

## Optional DB tracking

- Start `python backend/server.py` to enable SQLite event logging for:
  - teacher portal creations (`POST /api/teacher-portals`)
  - bathroom events (`POST /api/events`)
