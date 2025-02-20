import { useRef, useState } from "react";
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
    useGet,
    useQAContext,
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
    const postCommentReq = usePOST<IComment>();
    const deleteCommentReq = useDelete<IComment>();
    const getAnswerCommentsReq = useGet<IComment[]>();
    const putCommentReq = usePUT<IComment>();
    const viewCommentsRef = useRef<HTMLImageElement | null>(null);
    const viewCommentsCreatorRef = useRef<HTMLImageElement | null>(null);
    const scrollPositionRef = useRef<number>(0);
    const [hideComment, setHideComment] = useState(true);
    const [hideCommentCreator, setHideCommentCreator] = useState(true);
    const [currentComments, setCurrentComments] = useState(comments);
    const [highlightedCommentId, setHighlightedCommentId] = useState<
        string | null
    >(null);

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

    const createComment = async (comment: ICommentForCreation) => {
        await postCommentReq.postRequest(`${BASE_URL}${COMMENT_URL}`, comment);

        const getRes = await getAnswerCommentsReq.getRequest(
            `${BASE_URL}${ANSWER_URL}/${answerId}/comments`,
        );

        setCurrentComments(getRes ?? []);

        markNewComment(getRes ?? [], comment.value);
    };

    const markNewComment = (comments: IComment[], commentValue: string) => {
        const newComment = comments.find(
            c =>
                c.userName === qaContext.authContext.username &&
                c.value === commentValue,
        );

        if (newComment) {
            setHideComment(false);
            setHighlightedCommentId(newComment.id);

            setTimeout(() => {
                setHighlightedCommentId(null);
            }, 10000);
        }
    };

    const deleteComment = async (comment: IComment) => {
        await deleteCommentReq.deleteRequest(
            `${BASE_URL}${COMMENT_URL}/${comment.id}`,
        );

        const commentsAfterDeletion = currentComments.filter(
            c => c.id != comment.id,
        );

        setCurrentComments(commentsAfterDeletion);
    };

    const updateComment = async (comment: IComment) => {
        await putCommentReq.putRequest(
            `${BASE_URL}${COMMENT_URL}/${comment.id}`,
            comment,
        );

        const commentsAfterUpdate = currentComments.map(c =>
            c.id != comment.id ? c : comment,
        );

        setCurrentComments(commentsAfterUpdate);

        markNewComment(commentsAfterUpdate, comment.value);
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
                    createComment={createComment}
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
                    highlightedCommentId={highlightedCommentId}
                    comments={currentComments}
                    deleteComment={deleteComment}
                    updateComment={updateComment}
                />
            )}
        </div>
    );
}
