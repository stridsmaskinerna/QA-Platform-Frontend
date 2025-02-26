import { FormEvent, ReactNode } from "react";
import { useTranslation } from "react-i18next";

import chatIcon from "../../../assets/icons/chat_white.svg";
import styles from "./CommentForm.module.css";
import { CancelButton } from "../../button";

interface ICommentUpdaterProps {
    children: ReactNode;
    onCancel: () => void;
    onSubmit: () => void;
}

export function CommentForm({
    children,
    onCancel,
    onSubmit,
}: ICommentUpdaterProps) {
    const { t } = useTranslation();

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        void onSubmit();
    };

    return (
        <form
            className={styles.container}
            onSubmit={submit}
        >
            <div className={styles.textArea}>{children}</div>
            <div className={styles.commentBtnCtr}>
                <CancelButton
                    text={t("commentForm.cancelButton")}
                    onClick={() => {
                        onCancel();
                    }}
                />
                <button
                    title={t("commentForm.submitCommentInfo")}
                    type="submit"
                    className={styles.commentBtn}
                >
                    <img
                        src={chatIcon}
                        alt={t("commentForm.submitComment")}
                    />
                    <span className={styles.commentBtnText}>
                        {t("commentForm.submitComment")}
                    </span>
                </button>
            </div>
        </form>
    );
}
