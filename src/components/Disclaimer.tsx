import { useAuth } from "@/contexts/AuthContext";
import { t } from "@/services/translation";
import { AlertTriangle } from "lucide-react";

export function Disclaimer() {
  const { user } = useAuth();
  const lang = user?.language ?? "en";

  return (
    <div className="disclaimer-bar flex items-center justify-center gap-2">
      <AlertTriangle className="h-4 w-4 shrink-0 text-accent" />
      <span>{t("disclaimer", lang)}</span>
    </div>
  );
}
