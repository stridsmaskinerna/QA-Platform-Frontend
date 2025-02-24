import styles from "./AnswerCardAccept.module.css";

interface IAnswerAcceptProps {
    isAccepted: boolean;
    isOwner: boolean;
    onMarkAsSolved: () => void;
}

export function AnswerAccept({ isAccepted, isOwner, onMarkAsSolved }: IAnswerAcceptProps) {
    if (!isOwner) return null;

    return (
        <button 
            className={isAccepted ? styles.accepted : styles.default} 
            onClick={onMarkAsSolved}
        >
            {isAccepted ? "✔ Marked as Solution" : "Mark as Solution"}
        </button>
    );
}

