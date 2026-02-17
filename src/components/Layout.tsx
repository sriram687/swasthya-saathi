import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { t } from "@/services/translation";
import { Disclaimer } from "./Disclaimer";
import { Home, Upload, Bell, Clock, LogOut } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const lang = user?.language ?? "en";

  const navItems = [
    { path: "/dashboard", icon: Home, label: t("dashboard", lang) },
    { path: "/upload", icon: Upload, label: t("upload", lang) },
    { path: "/reminders", icon: Bell, label: t("reminders", lang) },
    { path: "/history", icon: Clock, label: t("history", lang) },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
        <h1 className="text-xl font-bold text-primary">SwasthyaSaathi</h1>
        <button
          onClick={() => { logout(); navigate("/"); }}
          className="flex items-center gap-1 rounded-lg bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive"
        >
          <LogOut className="h-4 w-4" />
          {t("logout", lang)}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto px-4 py-4 pb-24">
        {children}
      </main>

      {/* Disclaimer */}
      <div className="fixed bottom-16 left-0 right-0 z-10">
        <Disclaimer />
      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 flex border-t border-border bg-card">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon className={`h-6 w-6 ${active ? "text-primary" : ""}`} />
              <span className="truncate max-w-[70px]">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
