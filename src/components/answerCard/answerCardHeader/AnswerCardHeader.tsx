import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getTimeAgo } from "../../../utils";
import styles from "./AnswerCardHeader.module.css";

interface IAnswerCardHeaderProps {
    username: string;
    answeredByTeacher: boolean;
    created: string;
    isAccepted: boolean;
    isHidden: boolean;
}

export function AnswerCardHeader({
    username,
    answeredByTeacher,
    created,
    isAccepted,
    isHidden,
}: IAnswerCardHeaderProps) {
    const { t } = useTranslation();
    const [timeAgo, setTimeAgo] = useState(() => getTimeAgo(created, t));

    const isAnsweredByTeacher = answeredByTeacher
        ? styles.answeredByTeacher
        : "";

    useEffect(() => {
        const updateTimer = () => {
            setTimeAgo(getTimeAgo(created, t));
        };

        updateTimer(); // Ensure immediate update

        const secondsToNextMinute = 60 - new Date().getSeconds();
        const initialTimeout = setTimeout(() => {
            updateTimer();
            setInterval(updateTimer, 60000); // Updates every full system minute
        }, secondsToNextMinute * 1000);

        return () => clearTimeout(initialTimeout); // Cleanup on unmount
    }, [created, t]);

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                {answeredByTeacher && (
                    <span className={styles.teacherBox}>Teacher</span>
                )}
                <span>{username}</span>
                <span className={styles.timeContainer}>{timeAgo}</span>
            </div>
        </div>
    );
}
