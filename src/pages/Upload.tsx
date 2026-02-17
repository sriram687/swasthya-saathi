import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/Layout";
import { t } from "@/services/translation";
import { extractPrescription, generateReadableInstruction } from "@/services/mockAI";
import { savePrescription } from "@/services/storage";
import { Prescription } from "@/types";
import { Camera, Image, FileText, Loader2, Upload as UploadIcon } from "lucide-react";

export default function UploadPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const lang = user?.language ?? "en";
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!user || !preview) return;
    setProcessing(true);
    try {
      const medicines = await extractPrescription();
      const instructions = medicines.map(generateReadableInstruction);
      const prescription: Prescription = {
        id: crypto.randomUUID(),
        userId: user.id,
        date: new Date().toISOString(),
        imageUrl: preview,
        medicines,
        readableInstructions: instructions,
      };
      savePrescription(prescription);
      navigate(`/instructions/${prescription.id}`);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h2 className="elderly-heading">{t("upload", lang)}</h2>

        {!preview ? (
          <div className="space-y-4">
            {/* Camera */}
            <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFile} />
            <button
              onClick={() => cameraInputRef.current?.click()}
              className="elderly-button flex w-full items-center gap-4 rounded-xl bg-primary px-6 py-5 text-primary-foreground"
            >
              <Camera className="h-8 w-8" />
              <span className="text-xl font-bold">📷 Take Photo</span>
            </button>

            {/* Gallery */}
            <input ref={fileInputRef} type="file" accept="image/*,application/pdf" className="hidden" onChange={handleFile} />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="elderly-button flex w-full items-center gap-4 rounded-xl bg-secondary px-6 py-5 text-secondary-foreground"
            >
              <Image className="h-8 w-8" />
              <span className="text-xl font-bold">🖼️ Choose Image</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="elderly-button flex w-full items-center gap-4 rounded-xl bg-secondary px-6 py-5 text-secondary-foreground"
            >
              <FileText className="h-8 w-8" />
              <span className="text-xl font-bold">📄 Upload PDF</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="overflow-hidden rounded-xl border-2 border-border">
              <img src={preview} alt="Prescription preview" className="w-full" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPreview(null)}
                className="elderly-button rounded-xl bg-secondary text-secondary-foreground"
              >
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={processing}
                className="elderly-button flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground disabled:opacity-60"
              >
                {processing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {t("processing", lang)}
                  </>
                ) : (
                  <>
                    <UploadIcon className="h-5 w-5" />
                    Submit
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
