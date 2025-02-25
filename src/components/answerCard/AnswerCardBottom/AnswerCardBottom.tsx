import styles from "./AnswerCardBottom.module.css";
import { AnswerCardVote } from "../answerCardVote";
import { AnswerCardToolbar } from "../answerCardToolbar/AnswerCardToolbar";
import { IAnswer } from "../../../utils";

interface IAnswerCardBottomProps {
    answerId: string;
    answer: IAnswer;
    voteCount: number;
    myVote: string;
}

export function AnswerCardBottom({
    answerId,
    answer,
    voteCount,
    myVote,
}: IAnswerCardBottomProps) {
    return (
        <div className={styles.container}>
            <AnswerCardVote
                answerId={answerId}
                voteCount={voteCount}
                myVote={myVote}
            />
            <AnswerCardToolbar answer={answer} />
        </div>
    );
}
