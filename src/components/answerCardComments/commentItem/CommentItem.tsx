import { useQAContext } from "../../../hooks";
import { IComment } from "../../../utils";
import updateIcon from "../../../assets/icons/edit.svg";
import deleteIcon from "../../../assets/icons/delete.svg";
import styles from "./CommentItem.module.css";

interface ICommentItemProps {
    comment: IComment;
}

export function CommentItem({ comment }: ICommentItemProps) {
    const qaContext = useQAContext();

    const isMyQuestion = () => {
        return qaContext.authContext.username === comment.userName;
    };

    const handleUpdate = () => {
        console.log("handle update comment: ", comment);
    };

    const handleDelete = () => {
        console.log("handle delete comment:", comment);
    };

    return (
        <div className={styles.container}>
            <p className={styles.content}>{comment.value}</p>
            <div className={styles.footer}>
                <p className={styles.userName}>{comment.userName}</p>
                {isMyQuestion() && (
                    <div className={styles.footerToolbar}>
                        <img
                            onClick={() => {
                                handleUpdate();
                            }}
                            src={updateIcon}
                            alt={"Update comment"}
                            title={"Update comment"}
                            className={styles.toolbarIcon}
                        />
                        <img
                            onClick={() => {
                                handleDelete();
                            }}
                            src={deleteIcon}
                            alt={"Delete comment"}
                            title={"Delete comment"}
                            className={styles.toolbarIcon}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
