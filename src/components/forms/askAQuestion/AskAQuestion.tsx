import { useRef } from "react";
import styles from "./AskAQuestion.module.css";
import { Input } from "../..";
import { useTranslation } from "react-i18next";
export function AskAQuestion() {
    const formRef = useRef<HTMLFormElement>(null);
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <form ref={formRef}>
                <Input
                    inputName="questionTitle"
                    minInputValueLength={5}
                    inputType="text"
                    label={t("questionTitle")}
                    placeHolder={t("questionTitlePlaceholder")}
                />
            </form>
        </div>
    );
}
