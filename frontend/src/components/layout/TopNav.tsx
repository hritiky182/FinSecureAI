import { Search, Bell, Sun, Moon, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/app-store";
import { ROLES } from "@/mock/data";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export function TopNav() {
  const { theme, toggleTheme, role, setRole, user, setAuthed } = useAppStore();
  const navigate = useNavigate();
  return (
    <header className="h-14 shrink-0 border-b bg-card/60 backdrop-blur flex items-center gap-3 px-4 md:px-6">
      <div className="flex-1 max-w-md relative">
        <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search transactions, alerts, users…" className="pl-9 h-9 bg-background" />
      </div>
      <div className="flex-1" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <span className="hidden sm:inline text-xs text-muted-foreground">Role</span>
            <span className="font-medium">{role}</span>
            <ChevronDown className="size-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Switch role view</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {ROLES.map((r) => (
            <DropdownMenuItem key={r} onClick={() => setRole(r)}>
              {r}
              {r === role && <Badge variant="secondary" className="ml-auto text-[10px]">current</Badge>}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Button variant="ghost" size="icon" onClick={toggleTheme} title="Toggle theme">
        {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </Button>
      <Button variant="ghost" size="icon" className="relative" onClick={() => navigate("/notifications")}>
        <Bell className="size-4" />
        <span className="absolute top-2 right-2 size-1.5 rounded-full bg-destructive" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-md hover:bg-accent">
            <div className="size-7 rounded-full bg-primary/20 text-primary grid place-items-center text-xs font-semibold">
              {user.name.split(" ").map((p) => p[0]).join("")}
            </div>
            <div className="hidden md:block text-left">
              <div className="text-xs font-medium leading-tight">{user.name}</div>
              <div className="text-[10px] text-muted-foreground leading-tight">{role}</div>
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/settings")}>Settings</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => { setAuthed(false); navigate("/login"); }}
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
