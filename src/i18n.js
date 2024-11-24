import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translation resources
const resources = {
  en: {
    translation: {
      title: "Sa3a 5omasy",
      signIn: "Sign In",
      register: "Register",
      heroBody: "Register",
    },
  },
  ar: {
    translation: {
      title: "ساعة خماسى",
      signIn: "تسجيل الدجول",
      register: "مستجدم جديد",
      heroBody: "مستجدم جديد",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en", // Default language
    interpolation: {
      escapeValue: false, // React already escapes content
    },
    detection: {
      order: ["localStorage", "navigator"], // Check localStorage first, then browser language
      caches: ["localStorage"], // Persist language in localStorage
    },
  });

export default i18n;
