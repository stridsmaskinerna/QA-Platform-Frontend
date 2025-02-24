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
    useDELETE,
    usePOST,
    usePUT,
    useGet as useGET,
    useQAContext,
} from "../../../hooks";
import { ANSWER_URL, BASE_URL, COMMENT_URL } from "../../../data";
import { ErrorModal } from "../../modal";
import { TabLabelContainer } from "../../utility";

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
    const deleteCommentReq = useDELETE<IComment>();
    const getAnswerCommentsReq = useGET<IComment[]>();
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
    };

    const markNewComment = (comments: IComment[], commentValue: string) => {
        const newComment = comments.find(
            c =>
                c.userName === qaContext.authContext.username &&
                c.value === commentValue,
        );

        if (newComment) {
            setHideComment(false);
            viewCommentsRef.current?.classList.add(styles.openIconHide);
            setHighlightedCommentId(newComment.id);

            setTimeout(() => {
                setHighlightedCommentId(null);
            }, 10000);
        }
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
            <TabLabelContainer
                label={t("answerCardComments.commentsCreatorTitle")}
            >
                <CommentCreator
                    answerId={answerId}
                    createComment={createComment}
                />
            </TabLabelContainer>

            <TabLabelContainer
                label={t("answerCardComments.commentsListTitle")}
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
