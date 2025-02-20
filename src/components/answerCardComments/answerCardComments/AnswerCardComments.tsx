import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { IComment, ICommentForCreation } from "../../../utils";
import { H2 } from "../../text";
import openIcon from "../../../assets/icons/arrow_right.svg";
import addCommentIcon from "../../../assets/icons/add_comment.svg";
import commentListIcon from "../../../assets/icons/comment_list.svg";
import { CommentCreator } from "../commentCreator";
import { CommentList } from "../commentList";
import styles from "./AnswerCardComments.module.css";
import {
    useDelete,
    usePOST,
    usePUT,
    useQAContext,
    useGet,
} from "../../../hooks";
import { ANSWER_URL, BASE_URL, COMMENT_URL } from "../../../data";

interface IAnswerCardCommentsProps {
    answerId: string;
    comments: IComment[];
}

export function AnswerCardComments({
    answerId,
    comments,
}: IAnswerCardCommentsProps) {
    const { t } = useTranslation();
    const qaContext = useQAContext();
    const postComment = usePOST<IComment>();
    const deleteComment = useDelete<IComment>();
    const getAnswerComments = useGet<IComment[]>();
    const putComment = usePUT<IComment>();
    const viewCommentsRef = useRef<HTMLImageElement | null>(null);
    const viewCommentsCreatorRef = useRef<HTMLImageElement | null>(null);
    const scrollPositionRef = useRef<number>(0);
    const [hideComment, setHideComment] = useState(true);
    const [hideCommentCreator, setHideCommentCreator] = useState(true);
    const [currentComments, setCurrentComments] = useState(comments);

    useEffect(() => {
        console.log("answerId", answerId);
        console.log("comments", comments);
    });

    const toggleCommentsCreator = () => {
        setHideCommentCreator(prev => !prev);
        viewCommentsCreatorRef.current?.classList.toggle(styles.openIconHide);
    };

    const toggleComments = () => {
        scrollPositionRef.current = window.scrollY;

        setHideComment(prev => !prev);
        viewCommentsRef.current?.classList.toggle(styles.openIconHide);

        requestAnimationFrame(() => {
            window.scrollTo(0, scrollPositionRef.current);
        });
    };

    const createComments = async (comment: ICommentForCreation) => {
        const postRes = await postComment.postRequest(
            `${BASE_URL}${COMMENT_URL}`,
            comment,
        );

        // HAPPY PATH
        const getRes = await getAnswerComments.getRequest(
            `${BASE_URL}${ANSWER_URL}/${answerId}/comments`,
        );
        // 14dae759-bea3-454c-b76d-7c3e1b50a555
        // setCurrentComments(prev => [...prev, {
        //     id: generateTemporaryId(),
        //     value: comment.value,
        //     userName: qaContext.authContext.username ?? "unknown user"
        // }])

        console.log("getRes", getRes);
        console.log(qaContext.authContext.username);
        setCurrentComments(getRes ?? []);
    };

    const deleteComments = async (comment: IComment) => {
        const res = await deleteComment.deleteRequest(
            `${BASE_URL}${COMMENT_URL}/${comment.id}`,
        );

        // HAPPY PATH

        const commentsAfterDeletion = currentComments.filter(
            c => c.id != comment.id,
        );

        setCurrentComments(commentsAfterDeletion);
    };

    const updateComments = async (comment: IComment) => {
        const res = await putComment.putRequest(
            `${BASE_URL}${COMMENT_URL}/${comment.id}`,
            comment,
        );

        // HAPPY PATH
    };

    return (
        <div className={styles.container}>
            <div
                className={styles.header}
                onClick={() => {
                    toggleCommentsCreator();
                }}
            >
                <div className={styles.headerLabel}>
                    <img
                        src={addCommentIcon}
                        alt={t("answerCardComments.createCommentInfo")}
                        title={t("answerCardComments.createCommentInfo")}
                        className={styles.labelIcon}
                    />
                    <H2 text={t("answerCardComments.commentsCreatorTitle")} />
                </div>
                <img
                    ref={viewCommentsCreatorRef}
                    src={openIcon}
                    alt={t("answerCardComments.createCommentInfo")}
                    title={t("answerCardComments.createCommentInfo")}
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
                onClick={() => {
                    toggleComments();
                }}
            >
                <div className={styles.headerLabel}>
                    <img
                        src={commentListIcon}
                        alt={t("answerCardComments.viewCommentInfo")}
                        title={t("answerCardComments.viewCommentInfo")}
                        className={styles.labelIcon}
                    />
                    <H2 text={t("answerCardComments.commentsListTitle")} />
                </div>
                <img
                    ref={viewCommentsRef}
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
