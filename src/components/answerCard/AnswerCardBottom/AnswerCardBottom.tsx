import styles from "./AnswerCardBottom.module.css";
import { AnswerCardVote } from "../answerCardVote";

interface IAnswerCardBottomProps {
    answerId: string;
    voteCount: number;
    myVote: string;
}

export function AnswerCardBottom({
    answerId,
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
        </div>
    );
}
