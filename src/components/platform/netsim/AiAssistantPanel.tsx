"use client";

// ─── NetSim: AI Lab Assistant chat panel (POST /api/ai/lab-assistant) ─────────
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, FileText, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLang } from "@/lib/i18n";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ChatMsg {
  role: "user" | "assistant";
  content: string;
}

/** render ```code```, **bold** and `inline` from a reply */
function renderReply(text: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const fences = text.split(/```/);
  fences.forEach((seg, i) => {
    if (i % 2 === 1) {
      const code = seg.replace(/^[a-zA-Z0-9_-]*\n/, "").replace(/\n$/, "");
      if (code.trim()) {
        out.push(
          <pre
            key={`c${i}`}
            dir="ltr"
            className="my-1.5 overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950 p-2.5 text-[10.5px] font-mono leading-relaxed text-emerald-300"
          >
            {code}
          </pre>
        );
      }
      return;
    }
    if (!seg.trim()) return;
    const inlines = seg.split(/(\*\*[^*\n]+\*\*|`[^`\n]+`)/g).filter((s) => s !== "");
    out.push(
      <p key={`p${i}`} className="whitespace-pre-wrap leading-relaxed">
        {inlines.map((tk, j) => {
          if (tk.startsWith("**") && tk.endsWith("**") && tk.length > 4) {
            return <strong key={j} className="font-black">{tk.slice(2, -2)}</strong>;
          }
          if (tk.startsWith("`") && tk.endsWith("`") && tk.length > 2) {
            return (
              <code key={j} dir="ltr" className="mx-0.5 rounded bg-zinc-950/90 px-1 py-px font-mono text-[10.5px] text-emerald-300">
                {tk.slice(1, -1)}
              </code>
            );
          }
          return <React.Fragment key={j}>{tk}</React.Fragment>;
        })}
      </p>
    );
  });
  return out;
}

export default function AiAssistantPanel({
  deviceCount,
  getContext,
  onClose,
  className,
}: {
  deviceCount: number;
  /** builds the current-topology context string (kept <8000 chars) */
  getContext: () => string;
  onClose: () => void;
  className?: string;
}) {
  const { lang, bi } = useLang();
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, loading]);

  const L = {
    title: { ar: "مساعد المعمل الذكي", en: "AI Lab Assistant" },
    subtitle: { ar: "خبير شبكات يشخّص مخططك الحالي", en: "A network expert diagnosing your current topology" },
    context: { ar: "السياق مرفق", en: "context attached" },
    noTopo: { ar: "لا مخطط بعد", en: "no topology yet" },
    devices: { ar: "جهازاً", en: "devices" },
    placeholder: { ar: "اسأل عن مشكلة في الشبكة…", en: "Ask about a network problem…" },
    thinking: { ar: "يفكّر…", en: "thinking…" },
    error: { ar: "تعذر الوصول للمساعد", en: "Couldn't reach the assistant" },
    retry: { ar: "إعادة المحاولة", en: "Retry" },
    clear: { ar: "محادثة جديدة", en: "New chat" },
    hello: {
      ar: "أهلاً! أنا مساعد المختبر — أرسل لي سؤالاً وسأحلّل المخطط الحالي (الأجهزة، العناوين، المسارات، قواعد ACL، الهجمات) وأحدد الخلل مع أوامر الإصلاح.",
      en: "Hi! I'm the lab assistant — ask me anything and I'll analyze your current topology (devices, IPs, routes, ACLs, attacks), pinpoint the fault and give you the fix commands.",
    },
    suggestions: {
      ar: ["لماذا لا يعمل البينغ؟", "راجع إعدادات OSPF", "افحص قواعد ACL", "لماذا فشل DHCP؟"],
      en: ["Why does my ping fail?", "Check my ACLs", "Why is DNS not resolving?", "Is my NAT working?"],
    },
  };

  const send = async (question: string) => {
    const q = question.trim();
    if (!q || loading) return;
    setError(null);
    setInput("");
    const history = [...messages, { role: "user" as const, content: q }].slice(-10);
    setMessages(history);
    setLoading(true);
    try {
      const res = await fetch("/api/ai/lab-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, context: getContext(), lang }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      if (!res.ok || !data.reply) throw new Error(data.error ?? "assistant unavailable");
      setMessages((m) => [...m, { role: "assistant", content: data.reply as string }]);
    } catch (err) {
      setMessages(history.slice(0, -1)); // roll back the optimistic user bubble
      setError(q); // keep the failed question for retry
      toast({
        title: bi(L.error),
        description: err instanceof Error ? err.message : undefined,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const suggestions = lang === "ar" ? [...L.suggestions.ar, ...L.suggestions.en.slice(0, 2)] : [...L.suggestions.en, ...L.suggestions.ar.slice(0, 2)];

  return (
    <div className={cn("flex flex-col rounded-xl border bg-card overflow-hidden", className)}>
      {/* header */}
      <div className="flex items-center gap-2 border-b px-3 py-2">
        <div className="grid size-7 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary">
          <Bot className="size-4" />
        </div>
        <div className="min-w-0 flex-1 leading-tight">
          <div className="text-xs font-black truncate">{bi(L.title)}</div>
          <div className="text-[9.5px] text-muted-foreground truncate">{bi(L.subtitle)}</div>
        </div>
        {messages.length > 0 && (
          <Button variant="ghost" size="icon" className="size-6" title={bi(L.clear)} onClick={() => { setMessages([]); setError(null); }}>
            <RotateCcw className="size-3" />
          </Button>
        )}
        <Button variant="ghost" size="icon" className="size-6" onClick={onClose}><X className="size-3.5" /></Button>
      </div>

      {/* context badge */}
      <div className="flex items-center gap-1.5 border-b bg-muted/40 px-3 py-1.5">
        <Badge variant="outline" className="gap-1 text-[9px] font-bold text-emerald-700 border-emerald-600/40 bg-emerald-500/10">
          <FileText className="size-2.5" />
          {deviceCount > 0 ? `${bi(L.context)} · ${deviceCount} ${bi(L.devices)}` : bi(L.noTopo)}
        </Badge>
        <span className="text-[9px] text-muted-foreground truncate">{bi(L.subtitle)}</span>
      </div>

      {/* messages */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="space-y-2 p-3">
          {/* greeting */}
          <div className="flex gap-1.5">
            <div className="shrink-0 grid size-6 place-items-center rounded-lg bg-primary/15 text-primary mt-0.5">
              <Sparkles className="size-3" />
            </div>
            <div className="rounded-xl rounded-ss-sm border bg-muted/40 px-2.5 py-2 text-[10.5px] leading-relaxed">
              {bi(L.hello)}
            </div>
          </div>

          {/* suggested chips (before first send) */}
          {messages.length === 0 && !loading && (
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 text-[10px] font-bold text-primary hover:bg-primary/10 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* bubbles */}
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start gap-1.5"}`}
            >
              {m.role === "assistant" && (
                <div className="shrink-0 grid size-6 place-items-center rounded-lg bg-primary/15 text-primary mt-0.5">
                  <Bot className="size-3" />
                </div>
              )}
              <div
                className={`max-w-[92%] rounded-xl px-2.5 py-2 text-[11px]
                  ${m.role === "user"
                    ? "rounded-se-sm bg-primary text-primary-foreground glow-primary"
                    : "rounded-ss-sm border bg-muted/40"}`}
              >
                {m.role === "assistant" ? renderReply(m.content) : m.content}
              </div>
            </motion.div>
          ))}

          {/* loading dots */}
          {loading && (
            <div className="flex items-center gap-1.5">
              <div className="grid size-6 place-items-center rounded-lg bg-primary/15 text-primary"><Bot className="size-3" /></div>
              <div className="rounded-xl rounded-ss-sm border bg-muted/40 px-3 py-2.5 flex items-center gap-1">
                {[0, 1, 2].map((d) => (
                  <motion.span
                    key={d}
                    className="size-1.5 rounded-full bg-primary/70"
                    animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                  />
                ))}
                <span className="text-[9.5px] text-muted-foreground ps-1">{bi(L.thinking)}</span>
              </div>
            </div>
          )}

          {/* error + retry */}
          <AnimatePresence>
            {error && !loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-end gap-1.5">
                <span className="text-[9.5px] text-destructive font-bold truncate max-w-52" dir="auto">{error}</span>
                <Button variant="outline" size="sm" className="h-6 gap-1 text-[10px]" onClick={() => send(error)}>
                  <RotateCcw className="size-3" /> {bi(L.retry)}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={endRef} />
        </div>
      </ScrollArea>

      {/* input */}
      <div className="flex items-center gap-1.5 border-t p-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.nativeEvent.isComposing) send(input); }}
          placeholder={bi(L.placeholder)}
          className="h-8 text-[11px]"
          disabled={loading}
        />
        <Button size="sm" className="size-8 p-0 shrink-0" disabled={loading || !input.trim()} onClick={() => send(input)}>
          <Send className="size-3.5 rtl:-scale-x-100" />
        </Button>
      </div>
    </div>
  );
}
