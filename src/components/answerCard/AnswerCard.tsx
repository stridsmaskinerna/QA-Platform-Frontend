import { IAnswer } from "../../utils";
import { AnswerCardBody } from "./answerCardBody";
import { AnswerCardHeader } from "./answerCardHeader";
import styles from "./AnswerCard.module.css";
import { AnswerCardBottom } from "./AnswerCardBottom";

interface IAnswerProps {
    data: IAnswer;
}

export function AnswerCard({ data }: IAnswerProps) {
    const borderStyle = data.isAccepted
        ? styles.borderAccepted
        : styles.borderDefault;

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
            {/* <AnswerCardComments /> */}
        </div>
    );
}
