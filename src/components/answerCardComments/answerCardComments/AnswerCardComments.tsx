import { MouseEventHandler, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { IComment } from "../../../utils";
import { H2 } from "../../text";
import openIcon from "../../../assets/icons/arrow_right.svg";
import addCommentIcon from "../../../assets/icons/add_comment.svg";
import commentListIcon from "../../../assets/icons/comment_list.svg";
import { CommentCreator } from "../commentCreator";
import { CommentList } from "../commentList";
import styles from "./AnswerCardComments.module.css";
import { useDelete, useFetchWithToken, usePOST, usePUT } from "../../../hooks";
import { BASE_URL, COMMENT_URL } from "../../../data";

interface IAnswerCardCommentsProps {
    answerId: string;
    comments: IComment[];
}

export function AnswerCardComments({
    answerId,
    comments,
}: IAnswerCardCommentsProps) {
    const { t } = useTranslation();
    const createTopicReq = useFetchWithToken<void>();
    const postComment = usePOST<IComment>();
    const deleteComment = useDelete<IComment>();
    const putComment = usePUT<IComment>();
    const viewCommentsRef = useRef<HTMLImageElement | null>(null);
    const viewCommentsCreatorRef = useRef<HTMLImageElement | null>(null);
    const scrollPositionRef = useRef<number>(0);
    const [hideComment, setHideComment] = useState(true);
    const [hideCommentCreator, setHideCommentCreator] = useState(true);
    const [currentComments, setCurrentComments] = useState(comments);

    const toggleCommentsCreator: MouseEventHandler<HTMLElement> = e => {
        e.stopPropagation();
        setHideCommentCreator(prev => !prev);
        viewCommentsCreatorRef.current?.classList.toggle(styles.openIconHide);
    };

    const toggleComments: MouseEventHandler<HTMLElement> = e => {
        e.stopPropagation();
        scrollPositionRef.current = window.scrollY;

        setHideComment(prev => !prev);
        viewCommentsRef.current?.classList.toggle(styles.openIconHide);

        requestAnimationFrame(() => {
            window.scrollTo(0, scrollPositionRef.current);
        });
    };

    const createComments = async (comment: IComment) => {
        const res = await postComment.postRequest(
            `${BASE_URL}${COMMENT_URL}`,
            comment,
        );
    };

    const deleteComments = async (comment: IComment) => {
        const res = await deleteComment.deleteRequest(
            `${BASE_URL}${COMMENT_URL}/${comment.id}`,
        );
    };

    const updateComments = async (comment: IComment) => {
        const res = await putComment.putRequest(
            `${BASE_URL}${COMMENT_URL}/${comment.id}`,
            comment,
        );
    };

    return (
        <div className={styles.container}>
            <div
                className={styles.header}
                onClick={toggleCommentsCreator}
            >
                <div className={styles.headerLabel}>
                    <img
                        onClick={toggleCommentsCreator}
                        src={addCommentIcon}
                        alt={t("answerCardComments.viewCommentInfo")}
                        title={t("answerCardComments.viewCommentInfo")}
                        className={styles.labelIcon}
                    />
                    <H2 text={t("answerCardComments.commentsCreatorTitle")} />
                </div>
                <img
                    ref={viewCommentsCreatorRef}
                    onClick={toggleCommentsCreator}
                    src={openIcon}
                    alt={t("answerCardComments.viewCommentInfo")}
                    title={t("answerCardComments.viewCommentInfo")}
                    className={styles.openIcon}
                />
            </div>
            {!hideCommentCreator && (
                <CommentCreator
                    answerId={answerId}
                    createComments={createComments}
                />
            )}
            <div
                className={styles.header}
                onClick={toggleComments}
            >
                <div className={styles.headerLabel}>
                    <img
                        onClick={toggleCommentsCreator}
                        src={commentListIcon}
                        alt={t("answerCardComments.viewCommentInfo")}
                        title={t("answerCardComments.viewCommentInfo")}
                        className={styles.labelIcon}
                    />
                    <H2 text={t("answerCardComments.commentsListTitle")} />
                </div>
                <img
                    ref={viewCommentsRef}
                    onClick={toggleComments}
                    src={openIcon}
                    alt={t("answerCardComments.viewCommentInfo")}
                    title={t("answerCardComments.viewCommentInfo")}
                    className={styles.openIcon}
                />
            </div>
            {!hideComment && (
                <CommentList
                    comments={currentComments}
                    deleteComments={deleteComments}
                    updateComments={updateComments}
                />
            )}
        </div>
    );
}
