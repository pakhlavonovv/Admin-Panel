import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import enJSON from './src/locale/en.json'
import uzJSON from './src/locale/uz.json'
i18n.use(initReactI18next).init({
  resources: {
    en: { ...enJSON },
    uz: { ...uzJSON },
  },
  lng: "en",
});