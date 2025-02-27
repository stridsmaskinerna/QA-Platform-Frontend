import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJSON from "./locale/en/index";
import svJSON from "./locale/sv/index";

export const resources = {
    en: { ...enJSON },
    sv: { ...svJSON },
} as const;

export const defaultNS = "translation";

void i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    defaultNS,
});

export default i18n;
