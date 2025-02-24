import { IAnswer } from "../../utils";
import { AnswerCardBody } from "./answerCardBody";
import { AnswerCardHeader } from "./answerCardHeader";
import { AnswerCardComments } from "../answerCardComments";
import { AnswerCardBottom } from "./AnswerCardBottom";
import styles from "./AnswerCard.module.css";

interface IAnswerProps {
    data: IAnswer;
    isOwner: boolean;
    questionId: string;
    onMarkAsSolved: (answerId: string) => void;
}

export function AnswerCard({ data, isOwner, onMarkAsSolved }: IAnswerProps) {
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
                answerId={data.id}
                voteCount={data.voteCount}
                myVote={data.myVote}
                isAccepted={data.isAccepted}
                isOwner={isOwner}
                onMarkAsSolved={() => onMarkAsSolved(data.id)}
            />
            <AnswerCardComments
                answerId={data.id}
                comments={data.comments}
            />
        </div>
    );
}
