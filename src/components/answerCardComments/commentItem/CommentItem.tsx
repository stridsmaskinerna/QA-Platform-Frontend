import { useTranslation } from "react-i18next";

import { useQAContext } from "../../../hooks";
import { IComment } from "../../../utils";
import updateIcon from "../../../assets/icons/edit.svg";
import deleteIcon from "../../../assets/icons/delete.svg";
import styles from "./CommentItem.module.css";

interface ICommentItemProps {
    comment: IComment;
    deleteComments: (comment: IComment) => Promise<void>;
    updateComments: (comment: IComment) => Promise<void>;
}

export function CommentItem({
    comment,
    deleteComments,
    updateComments,
}: ICommentItemProps) {
    const { t } = useTranslation();
    const qaContext = useQAContext();

    const isMyQuestion = () => {
        return qaContext.authContext.username === comment.userName;
    };

    const handleUpdate = () => {
        console.log("handle update comment: ", comment);
        void updateComments(comment);
    };

    const handleDelete = () => {
        console.log("handle delete comment:", comment);
        void deleteComments(comment);
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
                            alt={t("answerCardComments.updateCommentInfo")}
                            title={t("answerCardComments.updateCommentInfo")}
                            className={styles.toolbarIcon}
                        />
                        <img
                            onClick={() => {
                                handleDelete();
                            }}
                            src={deleteIcon}
                            alt={t("answerCardComments.deleteCommentInfo")}
                            title={t("answerCardComments.deleteCommentInfo")}
                            className={styles.toolbarIcon}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
