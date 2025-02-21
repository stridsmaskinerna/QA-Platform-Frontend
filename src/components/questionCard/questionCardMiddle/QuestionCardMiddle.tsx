import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./QuestionCardMiddle.module.css";
import sharedStyles from "../QuestionCardSharedStyles.module.css";
import clock_icon from "../../../assets/icons/clock_24dp_808080.svg";
import { getTimeAgo } from "../../../utils";
import { RichTextReader } from "../../richText";

interface QuestionCardMiddleProps {
    title: string;
    created: string;
    username: string;
    answerCount?: number;
    topicName: string;
    description?: string;
    isHiddenOptimistic: boolean;
}

export function QuestionCardMiddle(props: QuestionCardMiddleProps) {
    const { t } = useTranslation();
    const answerLabel = props.answerCount === 1 ? t("answer") : t("answers");

    const [timeAgo, setTimeAgo] = useState(() => getTimeAgo(props.created, t));

    useEffect(() => {
        const updateTimer = () => {
            setTimeAgo(getTimeAgo(props.created, t));
        };

        updateTimer(); // Ensure immediate update

        const secondsToNextMinute = 60 - new Date().getSeconds();
        const initialTimeout = setTimeout(() => {
            updateTimer();
            setInterval(updateTimer, 60000); // Updates every full system minute
        }, secondsToNextMinute * 1000);

        return () => clearTimeout(initialTimeout); // Cleanup on unmount
    }, [props.created, t]);

    return (
        <div className={styles.container}>
            {props.isHiddenOptimistic && (
                <div className={sharedStyles.isHidden} />
            )}
            <div className={styles.header}>
                <span className={styles.topicName}>{props.topicName}</span>
                <div className={styles.timeSection}>
                    <img
                        className={styles.icon}
                        src={clock_icon}
                        alt=""
                    />
                    <div>
                        <p>{timeAgo}</p>
                    </div>
                </div>
            </div>
            <div className={styles.questionSection}>
                <h2 className={styles.title}>{props.title}</h2>
                <p>
                    {t("askedBy")}: {props.username}
                </p>
                {props.description !== undefined && (
                    <RichTextReader initialState={props.description} />
                )}
                {props.answerCount !== undefined && (
                    <p>
                        {props.answerCount} {answerLabel}
                    </p>
                )}
            </div>
        </div>
    );
}
