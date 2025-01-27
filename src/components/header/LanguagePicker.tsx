/* eslint-disable @typescript-eslint/no-misused-promises */
import styles from "./LanguagePicker.module.css";
import swedishFlag from "../../assets/img/flag_sweden.png";
import britishFlag from "../../assets/img/flag_UK.png";
import { useTranslation } from "react-i18next";

export function LanguagePicker() {
    const {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        i18n: { changeLanguage, language }
    } = useTranslation();

    return (
        <div className={styles.container}>
            <img
                onClick={() => changeLanguage("sv")}
                src={swedishFlag}
                alt="Flag of Sweden"
                className={`${styles.flagImg} ${language !== "sv" ? styles.inactive : ""}`}
            />
            <img
                onClick={() => changeLanguage("en")}
                src={britishFlag}
                alt="Flag of Great Britain"
                className={`${styles.flagImg} ${language !== "en" ? styles.inactive : ""}`}
            />
        </div>
    );
}
