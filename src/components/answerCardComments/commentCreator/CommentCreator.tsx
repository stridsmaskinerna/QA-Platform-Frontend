import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";

import { TextArea } from "../../input";
import chatIcon from "../../../assets/icons/chat_white.svg";
import { ICommentForCreation } from "../../../utils";
import styles from "./CommentCreator.module.css";

interface ICommentCreatorProps {
    answerId: string;
    createComments: (comment: ICommentForCreation) => Promise<void>;
}

export function CommentCreator({
    answerId,
    createComments,
}: ICommentCreatorProps) {
    const { t } = useTranslation();
    const [currentContent, setCurrentContent] = useState("");

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCurrentContent("");
        const comment: ICommentForCreation = {
            answerId,
            value: currentContent,
        };
        void createComments(comment);
    };

    const updateComment = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentContent(e.target.value);
    };

    return (
        <form
            className={styles.container}
            onSubmit={submit}
        >
            <div className={styles.textArea}>
                <TextArea
                    rows={4}
                    inputValue={currentContent}
                    minInputValueLength={2}
                    placeHolder={t(
                        "answerCardComments.createCommentPlaceholder",
                    )}
                    inputType="text"
                    onChange={updateComment}
                />
            </div>
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
        </form>
    );
}
