import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Role } from "@/mock/data";

interface AppState {
  theme: "light" | "dark";
  toggleTheme: () => void;
  authed: boolean;
  setAuthed: (v: boolean) => void;
  role: Role;
  setRole: (r: Role) => void;
  user: { name: string; email: string };
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: "dark",
      toggleTheme: () => set((s) => {
        const next = s.theme === "dark" ? "light" : "dark";
        if (typeof document !== "undefined") {
          document.documentElement.classList.toggle("dark", next === "dark");
        }
        return { theme: next };
      }),
      authed: false,
      setAuthed: (v) => set({ authed: v }),
      role: "CEO",
      setRole: (r) => set({ role: r }),
      user: { name: "Alex Morgan", email: "alex.morgan@test.com" },
    }),
    { name: "fri-app-store" },
  ),
);

export const applyInitialTheme = () => {
  if (typeof document === "undefined") return;
  try {
    const raw = localStorage.getItem("fri-app-store");
    const theme = raw ? JSON.parse(raw).state?.theme : "dark";
    document.documentElement.classList.toggle("dark", theme !== "light");
  } catch {
    document.documentElement.classList.add("dark");
  }
};
