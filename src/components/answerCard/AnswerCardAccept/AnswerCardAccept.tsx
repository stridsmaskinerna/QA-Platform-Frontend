import styles from "./AnswerCardAccept.module.css";

interface IAnswerAcceptProps {
    answerId: string;
    isAccepted: boolean;
    isOwner: boolean;
    onMarkAsSolved: (answerId: string) => void;
}

export function AnswerAccept({
    answerId,
    isAccepted,
    isOwner,
    onMarkAsSolved,
}: IAnswerAcceptProps) {
    if (!isOwner) return null;

    return (
        <button
            className={isAccepted ? styles.accepted : styles.default}
            onClick={() => onMarkAsSolved(answerId)}
        >
            {isAccepted ? "✔ Marked as Solution" : "Mark as Solution"}
        </button>
    );
}
