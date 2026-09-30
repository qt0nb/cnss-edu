#!/usr/bin/env bash
# dev-supervisor.sh — keeps the Next.js dev server alive.
#
# Why: the sandbox has ~4GB RAM. Turbopack compiling every page on demand
# (13 views + 1000+ tools) can push next-server past the OOM threshold;
# the kernel kills it and the user then sees ChunkLoadError on pages that
# were not loaded yet (stale chunk hashes). This supervisor:
#   1. caps V8 heap at 1536MB so next-server never trips the system OOM,
#   2. restarts the server automatically (with backoff) whenever it dies,
#   3. restarts it if it becomes unresponsive (curl health check).
set -u

PROJECT_DIR="/home/z/my-project"
LOG="$PROJECT_DIR/dev.log"
PIDFILE="$PROJECT_DIR/.dev-server.pid"
HEALTH_URL="http://localhost:3000/"
MAX_HEAP=1536   # MB — leaves ~2.5GB for the OS + browser + tooling

start_server() {
  cd "$PROJECT_DIR" || exit 1
  NODE_OPTIONS="--max-old-space-size=$MAX_HEAP" \
  nohup bun run dev >>"$LOG" 2>&1 &
  echo $! >"$PIDFILE"
  echo "[supervisor] started dev server pid $(cat "$PIDFILE")"
}

is_running() {
  [ -f "$PIDFILE" ] && kill -0 "$(cat "$PIDFILE")" 2>/dev/null
}

is_healthy() {
  curl -s -o /dev/null --max-time 10 "$HEALTH_URL"
}

# backoff state
fail_count=0

while true; do
  if ! is_running; then
    echo "[supervisor] dev server is DOWN — restarting..."
    start_server
    sleep 10
    fail_count=0
    continue
  fi

  # server process alive — check responsiveness every 30s
  if ! is_healthy; then
    fail_count=$((fail_count + 1))
    echo "[supervisor] health check failed ($fail_count/3)"
    if [ "$fail_count" -ge 3 ]; then
      echo "[supervisor] unresponsive 3× — killing and restarting"
      kill -9 "$(cat "$PIDFILE")" 2>/dev/null
      pkill -f "next-server" 2>/dev/null
      sleep 2
      start_server
      sleep 10
      fail_count=0
    fi
    sleep 15
  else
    fail_count=0
    sleep 30
  fi
done
