import { IComment } from "../../../utils";
import { CommentItem } from "../commentItem";
import styles from "./CommentList.module.css";

interface ICommentListProps {
    comments: IComment[];
}

export function CommentList({ comments }: ICommentListProps) {
    return (
        <div className={styles.container}>
            {comments.map(c => (
                <CommentItem
                    key={c.id}
                    comment={c}
                />
            ))}
        </div>
    );
}
