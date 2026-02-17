export type Language = "en" | "ta" | "hi";

export interface User {
  id: string;
  name: string;
  age: number;
  language: Language;
}

export interface MedicineInstruction {
  medicineName: string;
  strength: string;
  frequency: string;
  duration: string;
  foodInstruction: string;
}

export interface Prescription {
  id: string;
  userId: string;
  date: string;
  imageUrl: string;
  medicines: MedicineInstruction[];
  readableInstructions: string[];
}

export interface Reminder {
  id: string;
  prescriptionId: string;
  medicineName: string;
  time: string;
  enabled: boolean;
}
