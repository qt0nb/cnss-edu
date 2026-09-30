"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

/**
 * ViewErrorBoundary — catches render/chunk errors inside a routed view.
 *
 * Why this exists: every view is a separate Turbopack chunk (next/dynamic).
 * If the dev server restarts (deploy, crash, supervisor restart), the chunk
 * URLs the running page knows become stale → navigating to a not-yet-visited
 * view throws `ChunkLoadError` and, without a boundary, blanks the app.
 *
 * Recovery strategy:
 *  1. Chunk/network style errors → silent auto-retry (remount) up to 2 times.
 *     A remount re-runs the dynamic import against the *current* chunk map,
 *     which succeeds once the server is back — the user never notices.
 *  2. Retries exhausted (server really down / real bug) → branded fallback
 *     card with a reload button. Hash routing means the user returns to the
 *     exact same view after reload.
 */
function isTransientLoadError(msg: string): boolean {
  const m = msg.toLowerCase();
  return (
    m.includes("chunkloaderror") ||
    m.includes("failed to fetch dynamically imported module") ||
    m.includes("error loading dynamically imported module") ||
    m.includes("loading chunk") ||
    m.includes("loading css chunk") ||
    m.includes("dynamically imported module") ||
    m.includes("networkerror") ||
    m.includes("failed to fetch")
  );
}

interface Props {
  children: ReactNode;
  /** remount signal — bumping this resets the boundary + view subtree */
  resetKey?: string;
}

interface State {
  error: Error | null;
  retries: number;
}

export class ViewErrorBoundary extends Component<Props, State> {
  state: State = { error: null, retries: 0 };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Surface in dev console without spamming prod analytics.
    console.error("[ViewErrorBoundary]", error.message, info.componentStack?.split("\n").slice(0, 4).join("\n"));
  }

  componentDidUpdate(prev: Props) {
    if (prev.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null });
    }
  }

  private retry = () => {
    this.setState((s) => ({ error: null, retries: s.retries + 1 }));
  };

  private hardReload = () => {
    window.location.reload();
  };

  render() {
    const { error, retries } = this.state;
    if (!error) return this.props.children;

    const transient = isTransientLoadError(error.message ?? "");
    // transient + retries left → auto-recover without bothering the user
    if (transient && retries < 2) {
      // schedule a remount on the next tick (avoids render-phase setState)
      Promise.resolve().then(this.retry);
      return (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground" role="status">
          <RefreshCw className="size-5 animate-spin text-primary" aria-hidden="true" />
          <p className="font-mono text-xs" dir="ltr">reconnecting view…</p>
        </div>
      );
    }

    // give up gracefully — branded fallback, same-language UI
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center" role="alert">
        <div className="relative mb-4">
          <div className="absolute inset-0 blur-xl bg-amber-500/20 rounded-full" aria-hidden="true" />
          <div className="relative size-14 rounded-2xl border border-amber-500/30 bg-amber-500/10 grid place-items-center">
            <AlertTriangle className="size-7 text-amber-500" aria-hidden="true" />
          </div>
        </div>
        <h2 className="text-lg font-extrabold mb-1" dir="rtl">تعذّر تحميل هذا القسم</h2>
        <h2 className="sr-only">This section failed to load</h2>
        <p className="text-sm text-muted-foreground max-w-md mb-5 leading-relaxed" dir="rtl">
          انقطع الاتصال بمصدر الصفحة مؤقتًا (إعادة تشغيل للخادم أو ضعف شبكة). أعد المحاولة — إن استمر الخطأ، حدّث الصفحة كاملة وسيُعادك إلى نفس القسم.
        </p>
        <div className="flex items-center gap-2.5">
          <button
            onClick={this.retry}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 active:scale-95 transition-all"
          >
            <RefreshCw className="size-4" aria-hidden="true" />
            إعادة المحاولة
          </button>
          <button
            onClick={this.hardReload}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-border bg-muted/50 text-sm font-semibold hover:bg-muted active:scale-95 transition-all"
          >
            تحديث الصفحة
          </button>
        </div>
        {retries >= 2 && (
          <p className="mt-4 font-mono text-[10.5px] text-muted-foreground/70 break-all max-w-md" dir="ltr">
            {error.message?.slice(0, 160)}
          </p>
        )}
      </div>
    );
  }
}

export default ViewErrorBoundary;
