import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJSON from "./locale/en.json";
import svJSON from "./locale/sv.json";

// eslint-disable-next-line @typescript-eslint/no-floating-promises
i18n.use(initReactI18next).init({
    resources: {
        en: { ...enJSON },
        sv: { ...svJSON },
    },
    lng: "en", // Set the initial language of the App
});

export default i18n;
