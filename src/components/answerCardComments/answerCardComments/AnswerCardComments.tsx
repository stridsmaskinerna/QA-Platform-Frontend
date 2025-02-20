import { useState } from "react";
import { useTranslation } from "react-i18next";

import { IComment } from "../../../utils";
import { H2 } from "../../text";
import viewIcon from "../../../assets/icons/visibility_on.svg";
import hideIcon from "../../../assets/icons/visibility_off.svg";
import { CommentCreator } from "../commentCreator";
import { CommentList } from "../commentList";
import styles from "./AnswerCardComments.module.css";

interface IAnswerCardCommentsProps {
    answerId: string;
    comments: IComment[];
}

export function AnswerCardComments({
    answerId,
    comments,
}: IAnswerCardCommentsProps) {
    const { t } = useTranslation();
    const [hideComment, setHideComment] = useState(true);

    const toggleComments = () => {
        setHideComment(prev => !prev);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <H2 text={t("answerCardComments.title")} />
                {hideComment ? (
                    <img
                        onClick={() => {
                            toggleComments();
                        }}
                        src={viewIcon}
                        alt={t("answerCardComments.viewCommentInfo")}
                        title={t("answerCardComments.viewCommentInfo")}
                        className={styles.toolbarIcon}
                    />
                ) : (
                    <img
                        onClick={() => {
                            toggleComments();
                        }}
                        src={hideIcon}
                        alt={t("answerCardComments.hideCommentInfo")}
                        title={t("answerCardComments.hideCommentInfo")}
                        className={styles.toolbarIcon}
                    />
                )}
            </div>
            <CommentCreator answerId={answerId} />
            {!hideComment && <CommentList comments={comments} />}
        </div>
    );
}
