import { useTranslation } from "react-i18next";

import chatIcon from "../../../assets/icons/chat_white.svg";
import styles from "./CommentSubmitButton.module.css";

export function CommentSubmitButton() {
    const { t } = useTranslation();

    return (
        <div className={styles.commentBtnCtr}>
            <button
                title={t("answerCardComments.submitCommentInfo")}
                type="submit"
                className={styles.commentBtn}
            >
                <img
                    src={chatIcon}
                    alt="Add"
                />
                <span className={styles.commentBtnText}>
                    {t("answerCardComments.submitComment")}
                </span>
            </button>
        </div>
    );
}
