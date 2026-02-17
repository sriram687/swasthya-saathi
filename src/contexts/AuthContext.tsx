import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, Language } from "@/types";
import { getCurrentUser, setCurrentUser, logout as doLogout, saveUser, findUser } from "@/services/storage";

interface AuthContextType {
  user: User | null;
  login: (name: string) => boolean;
  signup: (name: string, age: number, language: Language) => void;
  logout: () => void;
  updateLanguage: (lang: Language) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const login = (name: string): boolean => {
    const found = findUser(name);
    if (found) {
      setCurrentUser(found);
      setUser(found);
      return true;
    }
    return false;
  };

  const signup = (name: string, age: number, language: Language) => {
    const newUser: User = { id: crypto.randomUUID(), name, age, language };
    saveUser(newUser);
    setCurrentUser(newUser);
    setUser(newUser);
  };

  const logout = () => {
    doLogout();
    setUser(null);
  };

  const updateLanguage = (lang: Language) => {
    if (user) {
      const updated = { ...user, language: lang };
      setCurrentUser(updated);
      setUser(updated);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateLanguage }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
