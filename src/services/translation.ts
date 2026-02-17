import { Language } from "@/types";

const translations: Record<string, Record<Language, string>> = {
  "Take": { en: "Take", ta: "எடுத்துக்கொள்ளுங்கள்", hi: "लें" },
  "twice daily": { en: "twice daily", ta: "தினமும் இரண்டு முறை", hi: "दिन में दो बार" },
  "three times daily": { en: "three times daily", ta: "தினமும் மூன்று முறை", hi: "दिन में तीन बार" },
  "once daily at night": { en: "once daily at night", ta: "தினமும் இரவில் ஒரு முறை", hi: "रात में एक बार" },
  "once daily in the morning": { en: "once daily in the morning", ta: "தினமும் காலையில் ஒரு முறை", hi: "सुबह में एक बार" },
  "after food": { en: "after food", ta: "உணவுக்குப் பிறகு", hi: "खाने के बाद" },
  "before food": { en: "before food", ta: "உணவுக்கு முன்", hi: "खाने से पहले" },
  "with food": { en: "with food", ta: "உணவுடன்", hi: "खाने के साथ" },
  "for": { en: "for", ta: "க்கு", hi: "के लिए" },
  "days": { en: "days", ta: "நாட்கள்", hi: "दिन" },
};

const uiStrings: Record<string, Record<Language, string>> = {
  "dashboard": { en: "Dashboard", ta: "முகப்பு", hi: "डैशबोर्ड" },
  "upload": { en: "Upload Prescription", ta: "மருந்துச் சீட்டை பதிவேற்றவும்", hi: "प्रिस्क्रिप्शन अपलोड करें" },
  "reminders": { en: "Reminders", ta: "நினைவூட்டல்கள்", hi: "रिमाइंडर" },
  "history": { en: "History", ta: "வரலாறு", hi: "इतिहास" },
  "logout": { en: "Logout", ta: "வெளியேறு", hi: "लॉगआउट" },
  "disclaimer": {
    en: "This application explains the prescription and does not provide medical advice. Always follow doctor instructions.",
    ta: "இந்த செயலி மருந்துச் சீட்டை விளக்குகிறது, மருத்துவ ஆலோசனை வழங்காது. எப்போதும் மருத்துவரின் அறிவுரைகளைப் பின்பற்றுங்கள்.",
    hi: "यह ऐप प्रिस्क्रिप्शन को समझाता है, चिकित्सा सलाह नहीं देता। हमेशा डॉक्टर के निर्देशों का पालन करें।",
  },
  "listen": { en: "🔊 Listen", ta: "🔊 கேளுங்கள்", hi: "🔊 सुनें" },
  "welcome": { en: "Welcome", ta: "வரவேற்கிறோம்", hi: "स्वागत है" },
  "noReminders": { en: "No reminders set", ta: "நினைவூட்டல்கள் இல்லை", hi: "कोई रिमाइंडर नहीं" },
  "noHistory": { en: "No prescriptions yet", ta: "இதுவரை மருந்துச் சீட்டுகள் இல்லை", hi: "अभी तक कोई प्रिस्क्रिप्शन नहीं" },
  "processing": { en: "Processing your prescription...", ta: "உங்கள் மருந்துச் சீட்டை செயலாக்குகிறோம்...", hi: "आपका प्रिस्क्रिप्शन प्रोसेस हो रहा है..." },
  "login": { en: "Login", ta: "உள்நுழைவு", hi: "लॉगिन" },
  "signup": { en: "Sign Up", ta: "பதிவு செய்க", hi: "साइन अप" },
  "name": { en: "Name", ta: "பெயர்", hi: "नाम" },
  "age": { en: "Age", ta: "வயது", hi: "उम्र" },
  "language": { en: "Language", ta: "மொழி", hi: "भाषा" },
};

export function translateInstruction(instruction: string, lang: Language): string {
  if (lang === "en") return instruction;
  let result = instruction;
  for (const [eng, trans] of Object.entries(translations)) {
    result = result.replace(new RegExp(eng, "gi"), trans[lang]);
  }
  return result;
}

export function t(key: string, lang: Language): string {
  return uiStrings[key]?.[lang] ?? key;
}
