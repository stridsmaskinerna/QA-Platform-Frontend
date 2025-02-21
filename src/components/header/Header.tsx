import { useTranslation } from "react-i18next";
import styles from "./Header.module.css";
import { NavMenu } from ".";
import { InfoModal } from "../modal";

export function Header() {
    const { t } = useTranslation();
    return (
        <header className={styles.container}>
            <h1>{t("headerHeadline")}</h1>
            <NavMenu />
            <InfoModal />
        </header>
    );
}
