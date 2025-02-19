import React from "react";
import styles from "./AnswerCardVote.module.css";
import unfilledThumbUp from "../../../assets/icons/thumb_up_neutral.svg";

interface IAnswerCardVoteProps {
    voteCount: number;
    myVote: string;
}

export function AnswerCardVote({ voteCount, myVote }: IAnswerCardVoteProps) {
    return (
        <div className={styles.container}>
            <img
                src={unfilledThumbUp}
                alt=""
            />
            {voteCount}
        </div>
    );
}
