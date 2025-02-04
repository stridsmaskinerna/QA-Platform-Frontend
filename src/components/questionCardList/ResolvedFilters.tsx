import { useTranslation } from "react-i18next";
import styles from "./ResolvedFilters.module.css";
interface IResolvedFilterProps {
    activeResolvedFilter: boolean | null;
    onResolvedFilterClick: (arg: boolean | null) => void;
}

export function ResolvedFilters({
    activeResolvedFilter,
    onResolvedFilterClick,
}: IResolvedFilterProps) {
    const { t } = useTranslation();
    return (
        <div className={styles.container}>
            <button
                onClick={() => onResolvedFilterClick(null)}
                className={`${styles.btn} ${activeResolvedFilter === null ? styles.active : ""}`}
            >
                {t("all")}
            </button>
            <button
                onClick={() => onResolvedFilterClick(true)}
                className={`${styles.btn} ${activeResolvedFilter === true ? styles.active : ""}`}
            >
                {t("resolvedPlural")}
            </button>
            <button
                onClick={() => onResolvedFilterClick(false)}
                className={`${styles.btn} ${activeResolvedFilter === false ? styles.active : ""}`}
            >
                {t("unresolvedPlural")}
            </button>
        </div>
    );
}
