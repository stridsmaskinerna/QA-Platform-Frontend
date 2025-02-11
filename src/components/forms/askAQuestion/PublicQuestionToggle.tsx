import { useTranslation } from "react-i18next";
import { Toggle } from "../..";
import styles from "./PublicQuestionToggle.module.css";
import { useState } from "react";
export function PublicQuestionToggle() {
    const { t } = useTranslation();
    const [isPublic, setIsPublic] = useState(false);
    return (
        <div className={styles.container}>
            <div className={styles.itemsWrapper}>
                <h5>{t("publicQuestion")}</h5>
                <p>{t("publicQuestionExpl")}</p>
            </div>
            <div className={`${styles.itemsWrapper} ${styles.center}`}>
                <Toggle
                    onClick={() => setIsPublic(prev => !prev)}
                    inputName="isProtected"
                />
                <p>{t(isPublic ? "public" : "nonPublic")}</p>
            </div>
        </div>
    );
}
