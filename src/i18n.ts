import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enDevJSON from "./locale/en/index";
import svDevJSON from "./locale/sv/index";

const isDev = import.meta.env.MODE === "development";

export const resources = {
    en: isDev ? { ...enDevJSON } : { ...enDevJSON },
    sv: isDev ? { ...svDevJSON } : { ...svDevJSON },
} as const;

export const defaultNS = "translation";

void i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    defaultNS,
});

export default i18n;
