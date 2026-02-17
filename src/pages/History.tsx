import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { t } from "@/services/translation";
import { getPrescriptions } from "@/services/storage";
import { Clock, ChevronRight } from "lucide-react";

export default function History() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const lang = user?.language ?? "en";

  const prescriptions = user ? getPrescriptions(user.id) : [];

  return (
    <Layout>
      <div className="space-y-5">
        <h2 className="elderly-heading">📋 {t("history", lang)}</h2>

        {prescriptions.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-muted-foreground">
            <Clock className="h-16 w-16 mb-4 opacity-30" />
            <p className="elderly-text">{t("noHistory", lang)}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {prescriptions.map((p) => (
              <button
                key={p.id}
                onClick={() => navigate(`/instructions/${p.id}`)}
                className="flex w-full items-center justify-between rounded-xl border-2 border-border bg-card p-4 text-left transition-colors hover:border-primary"
              >
                <div>
                  <p className="text-lg font-bold">
                    {p.medicines.length} medicine{p.medicines.length !== 1 ? "s" : ""}
                  </p>
                  <p className="text-muted-foreground">
                    {new Date(p.date).toLocaleDateString(lang === "ta" ? "ta-IN" : lang === "hi" ? "hi-IN" : "en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <ChevronRight className="h-6 w-6 text-muted-foreground" />
              </button>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
