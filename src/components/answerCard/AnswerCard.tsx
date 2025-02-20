import { IAnswer } from "../../utils";
import { AnswerCardBody } from "./answerCardBody";
import { AnswerCardHeader } from "./answerCardHeader";
import { AnswerCardComments } from "../answerCardComments";
import { AnswerCardBottom } from "./AnswerCardBottom";
import styles from "./AnswerCard.module.css";
import { useEffect } from "react";

interface IAnswerProps {
    data: IAnswer;
}

export function AnswerCard({ data }: IAnswerProps) {
    const borderStyle = data.isAccepted
        ? styles.borderAccepted
        : styles.borderDefault;

    useEffect(() => {
        console.log(data);
    });

    return (
        <div className={`${styles.container} ${borderStyle}`}>
            <AnswerCardHeader
                username={data.userName}
                answeredByTeacher={data.answeredByTeacher}
                created={data.created}
                isAccepted={data.isAccepted}
                isHidden={data.isHidden}
            />
            <AnswerCardBody answer={data.value} />
            <AnswerCardBottom
                voteCount={data.voteCount}
                myVote={data.myVote}
            />
            <AnswerCardComments
                answerId={data.id}
                comments={data.comments}
            />
        </div>
    );
}
