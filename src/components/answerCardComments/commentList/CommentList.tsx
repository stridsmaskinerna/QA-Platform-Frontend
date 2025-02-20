import { IComment } from "../../../utils";
import { CommentItem } from "../commentItem";
import styles from "./CommentList.module.css";

interface ICommentListProps {
    comments: IComment[];
    deleteComments: (comment: IComment) => Promise<void>;
    updateComments: (comment: IComment) => Promise<void>;
}

export function CommentList({
    comments,
    deleteComments,
    updateComments,
}: ICommentListProps) {
    return (
        <div className={styles.container}>
            {comments.map(c => (
                <CommentItem
                    key={c.id}
                    comment={c}
                    deleteComments={deleteComments}
                    updateComments={updateComments}
                />
            ))}
        </div>
    );
}
