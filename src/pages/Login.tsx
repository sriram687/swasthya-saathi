import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Language } from "@/types";
import { Heart } from "lucide-react";

export default function Login() {
  const { login, signup } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [language, setLanguage] = useState<Language>("en");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!name.trim()) { setError("Please enter your name"); return; }
    const ok = login(name.trim());
    if (!ok) setError("Name not found. Please sign up first.");
  };

  const handleSignup = () => {
    if (!name.trim() || !age) { setError("Please fill all fields"); return; }
    signup(name.trim(), parseInt(age), language);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="mb-8 flex flex-col items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary mb-4">
          <Heart className="h-10 w-10 text-primary-foreground" />
        </div>
        <h1 className="elderly-heading text-primary">SwasthyaSaathi</h1>
        <p className="mt-2 text-center text-muted-foreground elderly-text">
          AI Prescription Guidance
        </p>
      </div>

      <div className="w-full max-w-sm space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => { setName(e.target.value); setError(""); }}
          className="w-full rounded-xl border-2 border-input bg-card px-4 py-4 text-lg focus:border-primary focus:outline-none"
        />

        {isSignup && (
          <>
            <input
              type="number"
              placeholder="Your Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full rounded-xl border-2 border-input bg-card px-4 py-4 text-lg focus:border-primary focus:outline-none"
            />
            <div>
              <label className="mb-2 block text-sm font-medium text-muted-foreground">Preferred Language</label>
              <div className="flex gap-2">
                {(["en", "ta", "hi"] as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLanguage(l)}
                    className={`flex-1 rounded-xl py-3 text-base font-medium transition-colors ${
                      language === l ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {l === "en" ? "English" : l === "ta" ? "தமிழ்" : "हिन्दी"}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {error && <p className="text-center text-destructive font-medium">{error}</p>}

        <button
          onClick={isSignup ? handleSignup : handleLogin}
          className="elderly-button w-full bg-primary text-primary-foreground"
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <button
          onClick={() => { setIsSignup(!isSignup); setError(""); }}
          className="w-full py-3 text-center text-base font-medium text-primary underline"
        >
          {isSignup ? "Already have an account? Login" : "New user? Sign Up"}
        </button>
      </div>

      <p className="mt-8 max-w-sm text-center text-sm text-muted-foreground">
        This application explains the prescription and does not provide medical advice. Always follow doctor instructions.
      </p>
    </div>
  );
}
