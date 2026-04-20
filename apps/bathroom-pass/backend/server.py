import json
import sqlite3
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path

DB_PATH = Path(__file__).with_name('bathroom_break.db')
SCHEMA_PATH = Path(__file__).with_name('schema.sql')


def db_conn():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    with db_conn() as conn:
        conn.executescript(SCHEMA_PATH.read_text())


class Handler(BaseHTTPRequestHandler):
    def _send(self, status=200, payload=None):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
        self.end_headers()
        self.wfile.write(json.dumps(payload or {}).encode())

    def do_OPTIONS(self):
        self._send(200, {'ok': True})

    def do_POST(self):
        length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(length).decode() if length else '{}'
        data = json.loads(body or '{}')

        if self.path == '/api/teacher-portals':
            with db_conn() as conn:
                conn.execute(
                    'INSERT INTO teacher_portals (teacher_id, teacher_title, planning_label, period_order_json) VALUES (?, ?, ?, ?)',
                    (
                        data.get('teacher_id', 'unknown'),
                        data.get('teacher_title', ''),
                        data.get('planning_label', ''),
                        json.dumps(data.get('period_order', [])),
                    ),
                )
            return self._send(200, {'ok': True})

        if self.path == '/api/events':
            with db_conn() as conn:
                conn.execute(
                    'INSERT INTO bathroom_events (teacher_id, period_label, student_name, event_type, event_time, duration_seconds, metadata_json) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    (
                        data.get('teacher_id', 'unknown'),
                        data.get('period_label', ''),
                        data.get('student_name', ''),
                        data.get('event_type', 'unknown'),
                        data.get('event_time', datetime.now(timezone.utc).isoformat()),
                        data.get('duration_seconds'),
                        json.dumps(data.get('metadata', {})),
                    ),
                )
            return self._send(200, {'ok': True})

        self._send(404, {'ok': False, 'error': 'Not found'})


if __name__ == '__main__':
    init_db()
    server = HTTPServer(('0.0.0.0', 8787), Handler)
    print('DB API listening on http://0.0.0.0:8787')
    server.serve_forever()
