import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enDevJSON from "./locale/en/index";
import svDevJSON from "./locale/sv/index";
import enJSON from "./locale/en/index.json";
import svJSON from "./locale/sv/index.json";

const isDev = import.meta.env.MODE === "development";

export const resources = {
    en: isDev ? { ...enDevJSON } : { ...enJSON },
    sv: isDev ? { ...svDevJSON } : { ...svJSON },
} as const;

export const defaultNS = "translation";

void i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    defaultNS,
});

export default i18n;
