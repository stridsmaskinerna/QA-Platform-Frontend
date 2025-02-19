import { useState } from "react";

import { IComment } from "../../utils";
import { H1 } from "../text";
import viewIcon from "../../assets/icons/visibility_on.svg";
import hideIcon from "../../assets/icons/visibility_off.svg";
import { CommentCreator } from "./commentCreator";
import { CommentList } from "./commentList";
import styles from "./AnswerCardComments.module.css";

interface IAnswerCardCommentsProps {
    answerId: string;
    comments: IComment[];
}

export function AnswerCardComments({
    answerId,
    comments,
}: IAnswerCardCommentsProps) {
    const [hideComment, setHideComment] = useState(true);

    const toggleComments = () => {
        setHideComment(prev => !prev);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <H1 text="Comments" />
                {hideComment ? (
                    <img
                        onClick={() => {
                            toggleComments();
                        }}
                        src={viewIcon}
                        alt={"View comments"}
                        title={"View comments"}
                        className={styles.toolbarIcon}
                    />
                ) : (
                    <img
                        onClick={() => {
                            toggleComments();
                        }}
                        src={hideIcon}
                        alt={"Hide comments"}
                        title={"Hide comments"}
                        className={styles.toolbarIcon}
                    />
                )}
            </div>
            <CommentCreator answerId={answerId} />
            {!hideComment && <CommentList comments={comments} />}
        </div>
    );
}
