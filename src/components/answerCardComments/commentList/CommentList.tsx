import { useTranslation } from "react-i18next";

import { IComment } from "../../../utils";
import { H2 } from "../../text";
import { CommentItem } from "../commentItem";
import styles from "./CommentList.module.css";

interface ICommentListProps {
    comments: IComment[];
    highlightedCommentId: string | null;
    deleteComment: (comment: IComment) => Promise<void>;
    updateComment: (comment: IComment) => Promise<void>;
}

export function CommentList({
    highlightedCommentId,
    comments,
    deleteComment,
    updateComment,
}: ICommentListProps) {
    const { t } = useTranslation();

    if (comments.length === 0) {
        return (
            <div className={styles.containerNoComments}>
                <H2 text={t("answerCardComments.noCommentsLabel")} />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {comments.map(c => (
                <CommentItem
                    key={c.id}
                    highlightedCommentId={highlightedCommentId}
                    comment={c}
                    deleteComment={deleteComment}
                    updateComment={updateComment}
                />
            ))}
        </div>
    );
}
