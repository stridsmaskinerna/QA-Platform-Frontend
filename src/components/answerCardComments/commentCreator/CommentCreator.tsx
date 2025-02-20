import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";

import { TextArea } from "../../input";
import chatIcon from "../../../assets/icons/chat_white.svg";
import { IComment } from "../../../utils";
import { useQAContext } from "../../../hooks";
import styles from "./CommentCreator.module.css";

interface ICommentCreatorProps {
    answerId: string;
}

export function CommentCreator({ answerId }: ICommentCreatorProps) {
    const { t } = useTranslation();
    const qaContext = useQAContext();
    const [commentValue, setCommentValue] = useState("");

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCommentValue("");
        const comment: IComment = {
            id: "",
            userName: qaContext.authContext.username ?? "",
            value: commentValue,
        };
        console.log(`Submit comment ${comment.value} for answer ${answerId}`);
    };

    const updateComment = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCommentValue(e.target.value);
    };

    return (
        <form
            className={styles.container}
            onSubmit={submit}
        >
            <div className={styles.textArea}>
                <TextArea
                    rows={4}
                    inputValue={commentValue}
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
