import styles from "./AnswerCardAccept.module.css";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();

    if (!isOwner) return null;

    return (
        <button
            className={`${styles.button} ${isAccepted ? styles.accepted : styles.default}`}
            onClick={() => onMarkAsSolved(answerId)}
        >
            {isAccepted ? t("acceptedAnswer") : t("markAsAccepted")}
        </button>
    );
}
