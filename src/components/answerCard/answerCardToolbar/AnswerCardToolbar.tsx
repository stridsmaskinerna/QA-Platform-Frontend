import { useRef, useState } from "react";

import { useQAContext } from "../../../hooks";
import updateIcon from "../../../assets/icons/edit.svg";
import deleteIcon from "../../../assets/icons/delete.svg";
import { IAnswer } from "../../../utils";
import styles from "./AnswerCardToolbar.module.css";

// TODO! Delete and update functionality for answer.

interface IAnswerCardToolbarProps {
    answer: IAnswer;
}

export function AnswerCardToolbar({ answer }: IAnswerCardToolbarProps) {
    const qaContext = useQAContext();

    const isMyAnswer = () => {
        return qaContext.authContext.username === answer.userName;
    };

    return (
        <>
            {isMyAnswer() && (
                <div className={styles.container}>
                    <button className={styles.toolbarBtn}>
                        <img
                            onClick={() => {
                                return;
                            }}
                            src={updateIcon}
                            alt={"Update Answer"}
                            title={"Update Answer"}
                            className={styles.toolbarIcon}
                        />
                        Edit
                    </button>
                    <button className={styles.toolbarBtn}>
                        <img
                            onClick={() => {
                                return;
                            }}
                            src={deleteIcon}
                            alt={"Delete Answer"}
                            title={"Delete Answer"}
                            className={styles.toolbarIcon}
                        />
                        Delete
                    </button>
                </div>
            )}
        </>
    );
}
