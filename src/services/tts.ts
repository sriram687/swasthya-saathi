import { Language } from "@/types";

const langMap: Record<Language, string> = {
  en: "en-US",
  ta: "ta-IN",
  hi: "hi-IN",
};

export function speakText(text: string, lang: Language): void {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = langMap[lang];
  utterance.rate = 0.85;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}
