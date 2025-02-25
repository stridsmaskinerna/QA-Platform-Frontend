import { FormEvent, ReactNode } from "react";
import { useTranslation } from "react-i18next";

import chatIcon from "../../../assets/icons/chat_white.svg";
import styles from "./AnswerForm.module.css";
import { CancelButton } from "../../button";

interface IAnswerFormProps {
    children: ReactNode;
    onSubmit: () => void;
    onCancel?: () => void;
}

export function AnswerForm({
    children,
    onSubmit,
    onCancel = () => {
        return;
    },
}: IAnswerFormProps) {
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
                <CancelButton
                    text={"Cancel"}
                    onClick={() => {
                        onCancel();
                    }}
                />
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
