import { useTranslation } from "react-i18next";
import styles from "./Header.module.css";
import { NavMenu } from ".";

export function Header() {
    const { t } = useTranslation();
    return (
        <header className={styles.container}>
            <h1>{t("header.headerHeadline")}</h1>
            <NavMenu />
        </header>
    );
}
