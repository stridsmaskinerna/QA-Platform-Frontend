import styles from "./AnswerCardBottom.module.css";
import { AnswerCardVote } from "../answerCardVote";

interface IAnswerCardBottomProps {
    voteCount: number;
    myVote: string;
}

export function AnswerCardBottom({
    voteCount,
    myVote,
}: IAnswerCardBottomProps) {
    return (
        <div className={styles.container}>
            <AnswerCardVote
                voteCount={voteCount}
                myVote={myVote}
            />
        </div>
    );
}
