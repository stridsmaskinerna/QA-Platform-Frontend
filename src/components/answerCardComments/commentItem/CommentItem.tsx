import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { useQAContext } from "../../../hooks";
import { IComment } from "../../../utils";
import updateIcon from "../../../assets/icons/edit.svg";
import deleteIcon from "../../../assets/icons/delete.svg";
import { CommentUpdater } from "../commentUpdater";
import styles from "./CommentItem.module.css";

interface ICommentItemProps {
    comment: IComment;
    highlightedCommentId: string | null;
    deleteComment: (comment: IComment) => Promise<void>;
    updateComment: (comment: IComment) => Promise<void>;
}

export function CommentItem({
    comment,
    highlightedCommentId,
    deleteComment,
    updateComment,
}: ICommentItemProps) {
    const { t } = useTranslation();
    const qaContext = useQAContext();
    const [isUpdating, setIsUpdating] = useState(false);
    const commentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (highlightedCommentId === comment.id && commentRef.current != null) {
            commentRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [highlightedCommentId, comment.id]);

    const isMyQuestion = () => {
        return qaContext.authContext.username === comment.userName;
    };

    const handleIsUpdating = () => {
        setIsUpdating(prev => !prev);
    };

    const handleDelete = () => {
        void deleteComment(comment);
    };

    const handleUpdate = async (comment: IComment) => {
        await updateComment(comment);
        setIsUpdating(false);
    };

    const getDerivedContainerClassName = () => {
        return highlightedCommentId == comment.id
            ? `${styles.container} ${styles.highlightedContainer}`
            : styles.container;
    };

    return (
        <div
            ref={commentRef}
            className={getDerivedContainerClassName()}
        >
            {!isUpdating ? (
                <p className={styles.content}>{comment.value}</p>
            ) : (
                <CommentUpdater
                    comment={comment}
                    onUpdateComment={handleUpdate}
                />
            )}
            <div className={styles.footer}>
                <p className={styles.userName}>{comment.userName}</p>
                {isMyQuestion() && (
                    <div className={styles.footerToolbar}>
                        <img
                            onClick={() => {
                                handleIsUpdating();
                            }}
                            src={updateIcon}
                            alt={t("answerCardComments.updateCommentInfo")}
                            title={t("answerCardComments.updateCommentInfo")}
                            className={styles.toolbarIcon}
                        />
                        <img
                            onClick={() => {
                                handleDelete();
                            }}
                            src={deleteIcon}
                            alt={t("answerCardComments.deleteCommentInfo")}
                            title={t("answerCardComments.deleteCommentInfo")}
                            className={styles.toolbarIcon}
                        />
                    </div>
                )}
            </div>
            {highlightedCommentId === comment.id && (
                <span className={styles.commentLabel}>
                    {t("answerCardComments.commentLabelMarker")}
                </span>
            )}
        </div>
    );
}
