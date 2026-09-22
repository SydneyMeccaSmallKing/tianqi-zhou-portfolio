import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { copy, type Lang } from "./profile";

type Copy = (typeof copy)[Lang];

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Copy;
};

const I18nContext = createContext<Ctx | null>(null);

function readLang(): Lang {
  if (typeof window === "undefined") return "zh";
  const saved = window.localStorage.getItem("tz-lang");
  return saved === "en" || saved === "zh" || saved === "ja" ? saved : "zh";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("zh");

  useEffect(() => {
    setLangState(readLang());
  }, []);

  useEffect(() => {
    document.documentElement.lang =
      lang === "zh" ? "zh-CN" : lang === "ja" ? "ja" : "en";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("tz-lang", l);
  };

  const value = useMemo(() => ({ lang, setLang, t: copy[lang] }), [lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n outside provider");
  return ctx;
}
