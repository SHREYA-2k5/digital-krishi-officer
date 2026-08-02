import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en";
import hi from "./locales/hi";
import ta from "./locales/ta";
import ml from "./locales/ml";
import te from "./locales/te";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      ta: { translation: ta },
      ml: { translation: ml },
      te: { translation: te },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;