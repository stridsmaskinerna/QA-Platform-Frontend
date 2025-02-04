import { ReactElement } from "react";
import { UserInteractionFilter } from "../../utils";
import styles from "./MyQASection.module.css";
import { useTranslation } from "react-i18next";

interface MyQASectionProps {
    activeFilter: UserInteractionFilter;
    setActiveFilter: (filter: UserInteractionFilter) => void;
    children: ReactElement;
}

export function MyQASection({
    activeFilter,
    setActiveFilter,
    children,
}: MyQASectionProps) {
    const { t } = useTranslation();
    return (
        <div className={styles.container}>
            <div className={styles.btnsContainer}>
                <button
                    onClick={() => setActiveFilter("created")}
                    className={`${styles.btn} ${activeFilter === "created" ? styles.active : ""}`}
                >
                    {t("asked")}
                </button>
                <button
                    onClick={() => setActiveFilter("answered")}
                    className={`${styles.btn} ${activeFilter === "answered" ? styles.active : ""}`}
                >
                    {t("answered")}
                </button>
                <button
                    onClick={() => setActiveFilter("commented")}
                    className={`${styles.btn} ${activeFilter === "commented" ? styles.active : ""}`}
                >
                    {t("commented")}
                </button>
            </div>
            <div className={styles.childrenWrapper}>{children}</div>
        </div>
    );
}
