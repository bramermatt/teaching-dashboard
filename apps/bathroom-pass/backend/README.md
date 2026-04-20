# Bathroom Break DB API

## Start

```bash
python backend/server.py
```

This creates `backend/bathroom_break.db` and serves:

- `POST /api/teacher-portals`
- `POST /api/events`

## Example payloads

Teacher portal save:

```json
{
  "teacher_id": "ms-johnson",
  "teacher_title": "Ms. Johnson",
  "planning_label": "Period 2",
  "period_order": ["Period 1", "Period 3", "Period 4"]
}
```

Bathroom event:

```json
{
  "teacher_id": "ms-johnson",
  "period_label": "Period 1",
  "student_name": "Doe, Jane",
  "event_type": "sent_out",
  "event_time": "2026-04-08T15:10:00Z",
  "duration_seconds": null,
  "metadata": {"source": "button"}
}
```
