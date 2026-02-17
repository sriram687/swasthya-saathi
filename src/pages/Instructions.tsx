import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/Layout";
import { t, translateInstruction } from "@/services/translation";
import { speakText, stopSpeaking } from "@/services/tts";
import { getPrescriptions, saveReminders } from "@/services/storage";
import { Reminder } from "@/types";
import { Volume2, VolumeX, Bell, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

export default function Instructions() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const lang = user?.language ?? "en";
  const [speaking, setSpeaking] = useState(false);

  const prescription = user ? getPrescriptions(user.id).find((p) => p.id === id) : null;

  useEffect(() => {
    return () => stopSpeaking();
  }, []);

  if (!prescription) {
    return <Layout><p className="elderly-text text-center">Prescription not found.</p></Layout>;
  }

  const translatedInstructions = prescription.readableInstructions.map((ins) => translateInstruction(ins, lang));

  const handleSpeak = () => {
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
    } else {
      const fullText = translatedInstructions.join(". ");
      speakText(fullText, lang);
      setSpeaking(true);
      // Reset when done (approximate)
      setTimeout(() => setSpeaking(false), fullText.length * 80);
    }
  };

  const handleSetReminders = () => {
    const reminders: Reminder[] = prescription.medicines.map((med, i) => ({
      id: crypto.randomUUID(),
      prescriptionId: prescription.id,
      medicineName: med.medicineName,
      time: `${8 + i * 4}:00`,
      enabled: true,
    }));
    saveReminders(reminders);
    navigate("/reminders");
  };

  return (
    <Layout>
      <div className="space-y-5">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-primary font-medium">
          <ArrowLeft className="h-5 w-5" /> Back
        </button>

        <h2 className="elderly-heading">💊 Your Medicines</h2>

        <div className="space-y-3">
          {translatedInstructions.map((ins, i) => (
            <div key={i} className="rounded-xl border-2 border-border bg-card p-4">
              <p className="text-lg font-bold text-primary">{prescription.medicines[i].medicineName}</p>
              <p className="mt-1 elderly-text">{ins}</p>
            </div>
          ))}
        </div>

        <button
          onClick={handleSpeak}
          className={`elderly-button flex w-full items-center justify-center gap-3 rounded-xl ${
            speaking ? "bg-destructive text-destructive-foreground" : "bg-accent text-accent-foreground"
          }`}
        >
          {speaking ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
          <span className="text-lg font-bold">{speaking ? "Stop" : t("listen", lang)}</span>
        </button>

        <button
          onClick={handleSetReminders}
          className="elderly-button flex w-full items-center justify-center gap-3 rounded-xl bg-success text-success-foreground"
        >
          <Bell className="h-6 w-6" />
          <span className="text-lg font-bold">Set Reminders</span>
        </button>
      </div>
    </Layout>
  );
}
