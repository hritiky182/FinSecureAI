import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, User } from "lucide-react";
import { PageHeader } from "@/components/layout/parts";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { aiSuggestions, aiReplies } from "@/mock/data";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "ai"; text: string };

function generateReply(q: string): string {
  const l = q.toLowerCase();
  if (l.includes("branch")) return aiReplies.branch;
  if (l.includes("integration") || l.includes("vulner")) return aiReplies.integrations;
  if (l.includes("privileged") || l.includes("admin")) return aiReplies.privileged;
  if (l.includes("500,000") || l.includes("suspicious")) return aiReplies.suspicious;
  if (l.includes("vendor")) return aiReplies.vendor;
  return aiReplies.default;
}

export default function AIPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "I'm your risk intelligence copilot. Ask me anything about transactions, fraud signals, security incidents or compliance findings." },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "ai", text: generateReply(text) }]);
      setThinking(false);
    }, 700);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)]">
      <PageHeader title="AI Copilot" subtitle="Natural-language access to risk, fraud and compliance intelligence" />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 flex-1 min-h-0">
        <div className="flex flex-col rounded-xl border bg-card overflow-hidden">
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex gap-3", m.role === "user" ? "justify-end" : "")}
                >
                  {m.role === "ai" && (
                    <div className="size-8 rounded-lg bg-primary/15 text-primary grid place-items-center shrink-0">
                      <Sparkles className="size-4" />
                    </div>
                  )}
                  <div className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                    m.role === "ai" ? "bg-muted" : "bg-primary text-primary-foreground",
                  )}>
                    {m.text}
                  </div>
                  {m.role === "user" && (
                    <div className="size-8 rounded-lg bg-secondary grid place-items-center shrink-0">
                      <User className="size-4" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {thinking && (
              <div className="flex gap-3">
                <div className="size-8 rounded-lg bg-primary/15 text-primary grid place-items-center">
                  <Sparkles className="size-4 animate-pulse" />
                </div>
                <div className="rounded-2xl bg-muted px-4 py-2.5 text-sm text-muted-foreground">Thinking…</div>
              </div>
            )}
          </div>
          <div className="border-t p-3">
            <div className="flex gap-2 items-end">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about risk, fraud, transactions, or compliance…"
                className="resize-none min-h-[44px]"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
                }}
              />
              <Button onClick={() => send(input)} className="h-11"><Send className="size-4" /></Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border bg-card p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Suggested prompts</div>
            <div className="mt-3 space-y-2">
              {aiSuggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="w-full text-left text-sm rounded-md border border-dashed border-border px-3 py-2 hover:bg-accent transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Conversation history</div>
            <div className="mt-3 text-sm space-y-2">
              {["Branch fraud review — yesterday", "API exposure audit — 3d ago", "Q2 AML summary — 1w ago"].map((c) => (
                <div key={c} className="rounded-md p-2 hover:bg-accent cursor-pointer">{c}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
