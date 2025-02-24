import styles from "./AnswerCardBottom.module.css";
import { AnswerCardVote } from "../answerCardVote";
import { AnswerAccept } from "../AnswerCardAccept";

interface IAnswerCardBottomProps {
    answerId: string;
    voteCount: number;
    myVote: string;
    isAccepted: boolean;
    isOwner: boolean;
    onMarkAsSolved: () => void;
}

export function AnswerCardBottom({
    answerId,
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
            <AnswerAccept 
                isAccepted={isAccepted} 
                isOwner={isOwner} 
                onMarkAsSolved={onMarkAsSolved} 
            />
        </div>
    );
}
