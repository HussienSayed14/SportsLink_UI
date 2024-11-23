import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translation resources
const resources = {
  en: {
    translation: {
      title: "Hello, Tailwind Dark Mode!",
      description: "Click the button to toggle between Light and Dark modes.",
      toggle: "Toggle Dark Mode",
    },
  },
  ar: {
    translation: {
      title: "مرحبًا، وضع الظلام تيلويند!",
      description: "اضغط على الزر للتبديل بين الوضع الفاتح والداكن.",
      toggle: "تبديل الوضع الداكن",
    },
  },
};

// Initialize i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en", // Default language
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
