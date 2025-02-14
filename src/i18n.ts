import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJSON from "./locale/en.json";
import svJSON from "./locale/sv.json";

export const resources = {
    en: { ...enJSON },
    sv: { ...svJSON },
} as const;

export const defaultNS = "translation";

void i18n.use(initReactI18next).init({
    resources,
    lng: "en", // Set the initial language of the App
    defaultNS,
});

export default i18n;
