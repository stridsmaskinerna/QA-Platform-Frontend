import { IComment } from "../../../utils";
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
