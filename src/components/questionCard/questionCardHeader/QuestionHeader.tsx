import { useTranslation } from "react-i18next";
import styles from "./QuestionHeader.module.css";
import check_circle_white from "../../../assets/icons/check_circle_white.svg";
import public_question from "../../../assets/icons/globe_public_24dp_white.svg";
import hidden_question from "../../../assets/icons/hide_source_24dp_white.svg";

interface QuestionHeaderProps {
    data: {
        subjectName: string;
        subjectCode: string;
        isProtected: boolean;
        isResolved: boolean;
    };
}

export function QuestionHeader({ data }: QuestionHeaderProps) {
    const { t } = useTranslation();
    const statusClass = data.isResolved ? styles.resolved : styles.notResolved;
    const visibility = data.isProtected ? hidden_question : public_question;

    const subjectDisplay = data.subjectCode
        ? `${data.subjectCode} - ${data.subjectName}`
        : data.subjectName;

    return (
        <div className={styles.container}>
            <h3 className={styles.courseTitle}>{subjectDisplay}</h3>
            <div className={styles.icon_section}>
                <div className={`${styles.status} ${statusClass}`}>
                    {data.isResolved && (
                        <img
                            src={check_circle_white}
                            alt="Resolved"
                            className={styles.icon}
                        />
                    )}
                    <span>
                        {data.isResolved ? t("resolved") : t("notResolved")}
                    </span>
                </div>
                <div className={styles.iconWrapper}>
                    <img
                        className={styles.icon}
                        src={visibility}
                        alt=""
                    />
                    <span className={styles.tooltip}>
                        {data.isProtected
                            ? t("nonPublicQuestion")
                            : t("publicQuestion")}
                    </span>
                </div>
            </div>
        </div>
    );
}
