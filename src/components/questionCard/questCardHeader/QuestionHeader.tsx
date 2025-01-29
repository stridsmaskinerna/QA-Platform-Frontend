import React from "react";
import styles from "./QuestionHeader.module.css";
import check_circle_white from "../../../assets/icons/check_circle_white.svg";

interface QuestionHeaderProps {
    data: {
        courseName: string;
        courseCode: string;
        isProtected: boolean;
        isResolved: boolean;
        isHidden: boolean;
    };
}

export function QuestionHeader({ data }: QuestionHeaderProps) {
    const statusClass = data.isResolved ? styles.resolved : styles.notResolved;

    return (
        <div className={styles.container}>
            <h3 className={styles.courseTitle}>
                {data.courseCode} - {data.courseName}
            </h3>
            <div className={`${styles.status} ${statusClass}`}>
                {data.isResolved && (
                    <img
                        src={check_circle_white}
                        alt="Resolved"
                        className={styles.icon}
                    />
                )}
                <span>{data.isResolved ? "Resolved" : "Not Resolved"}</span>
            </div>
        </div>
    );
}
