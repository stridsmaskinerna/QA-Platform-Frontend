import { useTranslation } from "react-i18next";
import { Toggle } from "../../..";
import styles from "./PublicQuestionToggle.module.css";
import { useState } from "react";

interface IPublicQuestionToggleProps {
    defaultChecked?: boolean;
}

export function PublicQuestionToggle({
    defaultChecked,
}: IPublicQuestionToggleProps) {
    const { t } = useTranslation();
    const [isPublic, setIsPublic] = useState(defaultChecked ?? false);
    return (
        <div className={styles.container}>
            <div className={styles.itemsWrapper}>
                <h5>{t("publicQuestion")}</h5>
                <p>{t("publicQuestionExpl")}</p>
            </div>
            <div className={`${styles.itemsWrapper} ${styles.center}`}>
                <Toggle
                    defaultChecked={defaultChecked}
                    onClick={() => setIsPublic(prev => !prev)}
                    inputName="isProtected"
                />
                <p>{t(isPublic ? "public" : "nonPublic")}</p>
            </div>
        </div>
    );
}
