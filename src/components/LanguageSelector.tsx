import { useAuth } from "@/contexts/AuthContext";
import { Language } from "@/types";

const languages: { code: Language; label: string }[] = [
  { code: "en", label: "English" },
  { code: "ta", label: "தமிழ்" },
  { code: "hi", label: "हिन्दी" },
];

export function LanguageSelector() {
  const { user, updateLanguage } = useAuth();

  return (
    <div className="flex gap-2">
      {languages.map((l) => (
        <button
          key={l.code}
          onClick={() => updateLanguage(l.code)}
          className={`px-3 py-2 rounded-lg text-base font-medium transition-colors ${
            user?.language === l.code
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
