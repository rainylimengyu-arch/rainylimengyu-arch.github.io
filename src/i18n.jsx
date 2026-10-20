import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  languageStorageKey,
  readLanguage,
  translateText,
} from "./i18n-core.js";

const LanguageContext = createContext({
  language: "en",
  t: (text) => text,
  setLanguage: () => {},
});

export function LanguageProvider({ children }) {
  const [language, updateLanguage] = useState(() => {
    try {
      return readLanguage(window.localStorage);
    } catch {
      return "en";
    }
  });
  const setLanguage = useCallback((next) => {
    if (!["en", "zh"].includes(next)) return;
    updateLanguage(next);
    try {
      window.localStorage.setItem(languageStorageKey, next);
    } catch {
      /* The page can switch without storage. */
    }
  }, []);
  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.documentElement.dataset.language = language;
    const description = document.querySelector('meta[name="description"]');
    if (description)
      description.content =
        language === "zh"
          ? "VITA TAPE：探索营养成分、完成个性化问卷，打造属于你的每日营养带。学术创业模拟项目。"
          : "Small rituals. Brighter days. Explore VITA TAPE and build a daily nutrient tape that's uniquely yours.";
  }, [language]);
  useEffect(() => {
    function syncLanguage(event) {
      if (
        event.key === languageStorageKey &&
        ["en", "zh"].includes(event.newValue)
      )
        updateLanguage(event.newValue);
    }
    window.addEventListener("storage", syncLanguage);
    return () => window.removeEventListener("storage", syncLanguage);
  }, []);
  const t = useCallback(
    (text, values) => translateText(text, language, values),
    [language],
  );
  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t],
  );
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n() {
  return useContext(LanguageContext);
}

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useI18n();
  return (
    <div
      className="language-switcher"
      role="group"
      aria-label={t("Website language")}
    >
      <button
        type="button"
        lang="en"
        aria-label="Switch to English"
        aria-pressed={language === "en"}
        onClick={() => setLanguage("en")}
      >
        EN
      </button>
      <span aria-hidden="true">/</span>
      <button
        type="button"
        lang="zh-CN"
        aria-label="切换为中文"
        aria-pressed={language === "zh"}
        onClick={() => setLanguage("zh")}
      >
        中文
      </button>
    </div>
  );
}
