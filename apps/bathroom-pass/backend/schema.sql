CREATE TABLE IF NOT EXISTS teacher_portals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  teacher_id TEXT NOT NULL,
  teacher_title TEXT,
  planning_label TEXT,
  period_order_json TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS bathroom_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  teacher_id TEXT NOT NULL,
  period_label TEXT,
  student_name TEXT,
  event_type TEXT NOT NULL,
  event_time TEXT NOT NULL,
  duration_seconds INTEGER,
  metadata_json TEXT
);

CREATE INDEX IF NOT EXISTS idx_events_teacher_time
  ON bathroom_events(teacher_id, event_time);
