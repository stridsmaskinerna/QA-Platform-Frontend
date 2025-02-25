import { FormEvent, ReactNode } from "react";
import { useTranslation } from "react-i18next";

import chatIcon from "../../../assets/icons/chat_white.svg";
import styles from "./AnswerForm.module.css";

interface IAnswerFormProps {
    children: ReactNode;
    onSubmit: () => void;
}

export function AnswerForm({ children, onSubmit }: IAnswerFormProps) {
    const { t } = useTranslation();

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onSubmit();
    };

    return (
        <form
            className={styles.container}
            onSubmit={submit}
        >
            <div className={styles.editor}>{children}</div>
            <div className={styles.answerBtnCtr}>
                <button
                    type="submit"
                    className={styles.answerBtn}
                    title={"Submit Answer"}
                >
                    <img
                        src={chatIcon}
                        alt={"Submit Answer"}
                    />
                    <span className={styles.answerBtnText}>{"Submit"}</span>
                </button>
            </div>
        </form>
    );
}
