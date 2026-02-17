import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/Layout";
import { t } from "@/services/translation";
import { getReminders, toggleReminder } from "@/services/storage";
import { Reminder } from "@/types";
import { Bell, BellOff } from "lucide-react";

export default function Reminders() {
  const { user } = useAuth();
  const lang = user?.language ?? "en";
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    setReminders(getReminders());
  }, []);

  const handleToggle = (id: string) => {
    toggleReminder(id);
    setReminders(getReminders());
  };

  return (
    <Layout>
      <div className="space-y-5">
        <h2 className="elderly-heading">🔔 {t("reminders", lang)}</h2>

        {reminders.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-muted-foreground">
            <Bell className="h-16 w-16 mb-4 opacity-30" />
            <p className="elderly-text">{t("noReminders", lang)}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reminders.map((r) => (
              <div
                key={r.id}
                className={`flex items-center justify-between rounded-xl border-2 p-4 transition-colors ${
                  r.enabled ? "border-success bg-success/10" : "border-border bg-card opacity-60"
                }`}
              >
                <div>
                  <p className="text-lg font-bold">{r.medicineName}</p>
                  <p className="text-muted-foreground">⏰ {r.time}</p>
                </div>
                <button
                  onClick={() => handleToggle(r.id)}
                  className={`rounded-xl p-3 ${
                    r.enabled ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {r.enabled ? <Bell className="h-6 w-6" /> : <BellOff className="h-6 w-6" />}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
