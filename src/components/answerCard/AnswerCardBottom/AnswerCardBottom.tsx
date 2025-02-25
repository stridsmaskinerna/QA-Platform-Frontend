import styles from "./AnswerCardBottom.module.css";
import { AnswerCardVote } from "../answerCardVote";
import { AnswerAccept } from "../AnswerCardAccept";
import { AnswerCardToolbar } from "../answerCardToolbar/AnswerCardToolbar";
import { IAnswer } from "../../../utils";

interface IAnswerCardBottomProps {
    answerId: string;
    answer: IAnswer;
    voteCount: number;
    myVote: string;
    isAccepted: boolean;
    isOwner: boolean;
    onMarkAsSolved: () => void;
}

export function AnswerCardBottom({
    answerId,
    answer,
    voteCount,
    myVote,
    isAccepted,
    isOwner,
    onMarkAsSolved,
}: IAnswerCardBottomProps) {
    return (
        <div className={styles.container}>
            <AnswerCardVote
                answerId={answerId}
                voteCount={voteCount}
                myVote={myVote}
            />
            <AnswerCardToolbar
                answer={answer}
                isOwner={isOwner}
            />
        </div>
    );
}
