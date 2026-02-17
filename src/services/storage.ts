import { User, Prescription, Reminder } from "@/types";

const USERS_KEY = "ss_users";
const CURRENT_USER_KEY = "ss_current_user";
const PRESCRIPTIONS_KEY = "ss_prescriptions";
const REMINDERS_KEY = "ss_reminders";

export function getUsers(): User[] {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

export function saveUser(user: User): void {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function findUser(name: string): User | undefined {
  return getUsers().find((u) => u.name.toLowerCase() === name.toLowerCase());
}

export function setCurrentUser(user: User): void {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export function getCurrentUser(): User | null {
  const s = localStorage.getItem(CURRENT_USER_KEY);
  return s ? JSON.parse(s) : null;
}

export function logout(): void {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getPrescriptions(userId: string): Prescription[] {
  const all: Prescription[] = JSON.parse(localStorage.getItem(PRESCRIPTIONS_KEY) || "[]");
  return all.filter((p) => p.userId === userId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function savePrescription(p: Prescription): void {
  const all: Prescription[] = JSON.parse(localStorage.getItem(PRESCRIPTIONS_KEY) || "[]");
  all.push(p);
  localStorage.setItem(PRESCRIPTIONS_KEY, JSON.stringify(all));
}

export function getReminders(prescriptionId?: string): Reminder[] {
  const all: Reminder[] = JSON.parse(localStorage.getItem(REMINDERS_KEY) || "[]");
  if (prescriptionId) return all.filter((r) => r.prescriptionId === prescriptionId);
  return all;
}

export function saveReminders(reminders: Reminder[]): void {
  const existing: Reminder[] = JSON.parse(localStorage.getItem(REMINDERS_KEY) || "[]");
  const ids = reminders.map((r) => r.id);
  const filtered = existing.filter((r) => !ids.includes(r.id));
  localStorage.setItem(REMINDERS_KEY, JSON.stringify([...filtered, ...reminders]));
}

export function toggleReminder(id: string): void {
  const all: Reminder[] = JSON.parse(localStorage.getItem(REMINDERS_KEY) || "[]");
  const updated = all.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r));
  localStorage.setItem(REMINDERS_KEY, JSON.stringify(updated));
}
