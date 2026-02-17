import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { LanguageSelector } from "@/components/LanguageSelector";
import { t } from "@/services/translation";
import { getPrescriptions, getReminders } from "@/services/storage";
import { Upload, Bell, Clock, Camera } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const lang = user?.language ?? "en";

  const prescriptionCount = user ? getPrescriptions(user.id).length : 0;
  const reminderCount = getReminders().filter((r) => r.enabled).length;

  const actions = [
    { icon: Camera, label: t("upload", lang), path: "/upload", color: "bg-primary text-primary-foreground" },
    { icon: Bell, label: t("reminders", lang), path: "/reminders", color: "bg-accent text-accent-foreground" },
    { icon: Clock, label: t("history", lang), path: "/history", color: "bg-success text-success-foreground" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="elderly-heading">
            {t("welcome", lang)}, {user?.name} 👋
          </h2>
          <p className="mt-1 text-muted-foreground elderly-text">
            {prescriptionCount} prescriptions · {reminderCount} active reminders
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-muted-foreground">{t("language", lang)}</label>
          <LanguageSelector />
        </div>

        <div className="grid gap-4">
          {actions.map((a) => (
            <button
              key={a.path}
              onClick={() => navigate(a.path)}
              className={`elderly-button flex w-full items-center gap-4 ${a.color} rounded-xl px-6 py-5`}
            >
              <a.icon className="h-8 w-8 shrink-0" />
              <span className="text-xl font-bold">{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
}
