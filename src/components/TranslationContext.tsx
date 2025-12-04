import { createContext, useContext, useState, useEffect } from "react";
import translations from "../data/translations.json";

type Lang = keyof typeof translations;

type TranslationContextType = {
  lang: Lang;
  t: (key: string) => string;
  setLang: (lang: Lang) => void;
};

const TranslationContext = createContext<TranslationContextType | null>(null);

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  // Load saved language once
  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved && translations[saved]) setLang(saved);
  }, []);

  // Save language when changed
  const changeLanguage = (l: Lang) => {
    setLang(l);
    localStorage.setItem("lang", l);
  };

  // BASIC t()
  const t = (key: string): string => {
    const parts = key.split(".");
    let current: any = translations[lang];

    for (const p of parts) {
      if (current[p] === undefined) return key; // fallback
      current = current[p];
    }

    return current;
  };

  return (
    <TranslationContext.Provider value={{ lang, t, setLang: changeLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(TranslationContext);
  if (!ctx) throw new Error("useTranslation must be used inside TranslationProvider");
  return ctx;
}
