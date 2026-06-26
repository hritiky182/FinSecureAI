import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppStore } from "@/store/app-store";

export default function LoginPage() {
  const navigate = useNavigate();
  const setAuthed = useAppStore((s) => s.setAuthed);
  const [loading, setLoading] = useState(false);
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:flex relative overflow-hidden bg-sidebar text-sidebar-foreground">
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: "radial-gradient(circle at 20% 20%, var(--primary) 0, transparent 40%), radial-gradient(circle at 80% 80%, var(--info) 0, transparent 45%)" }} />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div className="flex items-center gap-2">
            <div className="size-10 rounded-lg bg-primary/20 grid place-items-center">
              <ShieldCheck className="size-6 text-primary" />
            </div>
            <div>
              <div className="text-lg font-semibold">Sentinel FRI</div>
              <div className="text-[11px] uppercase tracking-widest text-sidebar-foreground/60">Risk Intelligence</div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md"
          >
            <h2 className="text-3xl font-semibold tracking-tight leading-tight">
              Independent oversight for modern financial institutions.
            </h2>
            <p className="mt-4 text-sm text-sidebar-foreground/70">
              Real-time fraud detection, cybersecurity intelligence and continuous
              compliance monitoring across your entire transaction landscape.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 text-xs">
              {[
                ["99.97%", "Uptime SLO"],
                ["8 modules", "Unified coverage"],
                ["24/7", "Continuous audit"],
              ].map(([v, l]) => (
                <div key={l} className="rounded-lg bg-sidebar-accent/40 p-3 border border-sidebar-border">
                  <div className="text-base font-semibold text-sidebar-accent-foreground">{v}</div>
                  <div className="text-sidebar-foreground/60">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <div className="text-[11px] text-sidebar-foreground/50">© 2026 Sentinel FRI — Prototype build</div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 md:p-12">
        <motion.form
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            setTimeout(() => {
              setAuthed(true);
              navigate("/dashboard");
            }, 600);
          }}
          className="w-full max-w-sm space-y-5"
        >
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
            <p className="text-sm text-muted-foreground mt-1">Use your institution credentials to continue.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Work email</Label>
            <div className="relative">
              <Mail className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input id="email" type="email" required defaultValue="alex.morgan@test.com" className="pl-9" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input id="password" type="password" required defaultValue="••••••••" className="pl-9" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <Checkbox defaultChecked /> Remember me
            </label>
            <button type="button" className="text-sm text-primary hover:underline">Forgot password?</button>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </Button>
          <p className="text-[11px] text-muted-foreground text-center">
            Prototype — any credentials proceed to verification.
          </p>
        </motion.form>
      </div>
    </div>
  );
}
