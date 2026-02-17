import { MedicineInstruction } from "@/types";

const mockPrescriptions: MedicineInstruction[][] = [
  [
    { medicineName: "Paracetamol", strength: "500mg", frequency: "twice daily", duration: "5 days", foodInstruction: "after food" },
    { medicineName: "Amoxicillin", strength: "250mg", frequency: "three times daily", duration: "7 days", foodInstruction: "before food" },
    { medicineName: "Cetirizine", strength: "10mg", frequency: "once daily at night", duration: "3 days", foodInstruction: "after food" },
  ],
  [
    { medicineName: "Metformin", strength: "500mg", frequency: "twice daily", duration: "30 days", foodInstruction: "with food" },
    { medicineName: "Amlodipine", strength: "5mg", frequency: "once daily in the morning", duration: "30 days", foodInstruction: "before food" },
  ],
];

export function generateReadableInstruction(med: MedicineInstruction): string {
  return `Take ${med.medicineName} ${med.strength} ${med.frequency} ${med.foodInstruction} for ${med.duration}.`;
}

export async function extractPrescription(): Promise<MedicineInstruction[]> {
  // Simulate processing delay
  await new Promise((r) => setTimeout(r, 2000));
  const idx = Math.floor(Math.random() * mockPrescriptions.length);
  return mockPrescriptions[idx];
}
