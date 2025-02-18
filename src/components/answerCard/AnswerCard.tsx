import { IAnswer } from "../../utils";
import { AnswerCardBody } from "./answerCardBody";
import { AnswerCardHeader } from "./answerCardHeader";
import styles from "./AnswerCard.module.css";
import gStyles from "../../globalStyles.module.css";

interface IAnswerProps {
    data: IAnswer;
}

export function AnswerCard({ data }: IAnswerProps) {
    return (
        <div className={styles.container}>
            <AnswerCardHeader
                username={data.userName}
                answeredByTeacher={data.answeredByTeacher}
            />
            <AnswerCardBody answer={data.value} />
            {/* <AnswerCardVote rating={data.rating} /> */}
            {/* <AnswerCardComments /> */}
        </div>
    );
}
