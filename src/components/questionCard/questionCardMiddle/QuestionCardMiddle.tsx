import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./QuestionCardMiddle.module.css";
import clock_icon from "../../../assets/icons/clock_24dp_808080.svg";
interface QuestionCardMiddleProps {
    data: {
        title: string;
        created: string;
        username: string;
        answerCount: number;
        topicName: string;
    };
}

export function QuestionCardMiddle({ data }: QuestionCardMiddleProps) {
    const { t } = useTranslation();
    const answerLabel = data.answerCount === 1 ? t("answer") : t("answers");

    const [timeAgo, setTimeAgo] = useState(() => getTimeAgo(data.created, t));

    useEffect(() => {
        const updateTimer = () => {
            setTimeAgo(getTimeAgo(data.created, t));
        };

        updateTimer(); // Ensure immediate update

        const secondsToNextMinute = 60 - new Date().getSeconds();
        const initialTimeout = setTimeout(() => {
            updateTimer();
            setInterval(updateTimer, 60000); // Updates every full system minute
        }, secondsToNextMinute * 1000);

        return () => clearTimeout(initialTimeout); // Cleanup on unmount
    }, [data.created, t]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.topicName}>{data.topicName}</span>
                <div className={styles.time_section}>
                    <img
                        className={styles.icon}
                        src={clock_icon}
                        alt=""
                    />
                    <div>{timeAgo}</div>
                </div>
            </div>
            <section className={styles.question_section}>
                <section>
                    <h2 className={styles.title}>{data.title}</h2>
                    <p>
                        {t("askedBy")}: {data.username}
                    </p>
                </section>
                <p>
                    {data.answerCount} {answerLabel}
                </p>
            </section>
        </div>
    );
}

export const getTimeAgo = (
    created: string,
    t: (key: string, options?: any) => string
): string => {
    const createdDate = new Date(created);
    const now = new Date();
    const diffInSeconds = Math.floor(
        (now.getTime() - createdDate.getTime()) / 1000
    );
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 60) return t("lessThanMinuteAgo");
    if (diffInMinutes === 1) return t("oneMinuteAgo");
    if (diffInMinutes < 60) return t("minutesAgo", { minutes: diffInMinutes });
    if (diffInHours === 1) return t("oneHourAgo");
    if (diffInHours < 24) return t("hoursAgo", { hours: diffInHours });
    if (diffInDays === 1) return t("oneDayAgo");
    return t("daysAgo", { days: diffInDays });
};
