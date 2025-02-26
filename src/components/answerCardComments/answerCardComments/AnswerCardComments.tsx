import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { IComment, ICommentForCreation } from "../../../utils";
import { CommentCreator } from "../commentCreator";
import { CommentList } from "../commentList";
import addCommentIcon from "../../../assets/icons/add_comment.svg";
import commentListIcon from "../../../assets/icons/comment_list.svg";
import {
    useDELETE,
    usePOST,
    usePUT,
    useGET,
    useQAContext,
} from "../../../hooks";
import { ANSWER_URL, BASE_URL, COMMENT_URL } from "../../../data";
import { ErrorModal } from "../../modal";
import { TabLabelContainer } from "../../utility";
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
    const qaContext = useQAContext();
    const scrollPositionRef = useRef<number>(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const postCommentReq = usePOST<void>();
    const deleteCommentReq = useDELETE<void>();
    const getAnswerCommentsReq = useGET<IComment[]>();
    const putCommentReq = usePUT<void>();
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [isCommentCreatorOpen, setIsCommentCreatorOpen] = useState(false);
    const [currentComments, setCurrentComments] = useState(comments);
    const [highlightedCommentId, setHighlightedCommentId] = useState<
        string | null
    >(null);
    const { isLoggedIn } = useQAContext().authContext;

    const toggleComments = () => {
        scrollPositionRef.current = window.scrollY;

        setIsCommentsOpen(prev => !prev);

        requestAnimationFrame(() => {
            window.scrollTo(0, scrollPositionRef.current);
        });
    };

    const createComment = async (comment: ICommentForCreation) => {
        const postRes = await postCommentReq.postRequestWithError(
            `${BASE_URL}${COMMENT_URL}`,
            comment,
        );

        if (postRes.error != null) {
            return;
        }

        const getRes = await getAnswerCommentsReq.getRequestWithError(
            `${BASE_URL}${ANSWER_URL}/${answerId}/comments`,
        );

        if (getRes.error != null) {
            return;
        }

        setCurrentComments(getRes.response ?? []);

        markNewComment(getRes.response ?? [], comment.value);
        setIsCommentsOpen(true);
    };

    const markNewComment = (comments: IComment[], commentValue: string) => {
        const newComment = comments.find(
            c =>
                c.userName === qaContext.authContext.username &&
                c.value === commentValue,
        );

        if (newComment == null) {
            return;
        }

        setHighlightedCommentId(newComment?.id);

        if (timerRef.current != null) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            setHighlightedCommentId(null);
        }, 10000);
    };

    const deleteComment = async (comment: IComment) => {
        const { error } = await deleteCommentReq.deleteRequestWithError(
            `${BASE_URL}${COMMENT_URL}/${comment.id}`,
        );

        if (error != null) {
            return;
        }

        const commentsAfterDeletion = currentComments.filter(
            c => c.id != comment.id,
        );

        setCurrentComments(commentsAfterDeletion);
    };

    const updateComment = async (comment: IComment) => {
        const { error } = await putCommentReq.putRequestWithError(
            `${BASE_URL}${COMMENT_URL}/${comment.id}`,
            comment,
        );

        if (error != null) {
            return;
        }

        const commentsAfterUpdate = currentComments.map(c =>
            c.id != comment.id ? c : comment,
        );

        setCurrentComments(commentsAfterUpdate);
        markNewComment(commentsAfterUpdate, comment.value);
    };

    const clearErrors = () => {
        deleteCommentReq.clearError();
        putCommentReq.clearError();
        postCommentReq.clearError();
        getAnswerCommentsReq.clearError();
    };

    return (
        <div className={styles.container}>
            <ErrorModal
                errors={[
                    deleteCommentReq.error,
                    putCommentReq.error,
                    postCommentReq.error,
                    getAnswerCommentsReq.error,
                ]}
                onClearErrors={clearErrors}
            />
            {isLoggedIn && (
                <TabLabelContainer
                    label={t("answerCardComments.commentsCreatorTitle")}
                    isOpen={isCommentCreatorOpen}
                    labelIcon={addCommentIcon}
                    toggleOpen={() => {
                        setIsCommentCreatorOpen(prev => !prev);
                    }}
                >
                    <CommentCreator
                        answerId={answerId}
                        createComment={createComment}
                    />
                </TabLabelContainer>
            )}
            <TabLabelContainer
                label={t("answerCardComments.commentsListTitle")}
                isOpen={isCommentsOpen}
                labelIcon={commentListIcon}
                toggleOpen={() => {
                    toggleComments();
                }}
            >
                <CommentList
                    highlightedCommentId={highlightedCommentId}
                    comments={currentComments}
                    deleteComment={deleteComment}
                    updateComment={updateComment}
                />
            </TabLabelContainer>
        </div>
    );
}
