import { useTranslation } from "react-i18next";
import styles from "./QuestionHeader.module.css";
import check_circle_white from "../../../assets/icons/check_circle_white.svg";
import public_icon from "../../../assets/icons/public.svg";
import non_public_icon from "../../../assets/icons/non_public.svg";
import visibility_off from "../../../assets/icons/visibility_off.svg";
import visibility_on from "../../../assets/icons/visibility_on.svg";
import { useRoles } from "../../../hooks";

interface QuestionHeaderProps {
    subjectName: string;
    subjectCode: string;
    isProtected: boolean;
    isResolved: boolean;
    isHidden: boolean;
}

export function QuestionHeader(props: QuestionHeaderProps) {
    const { t } = useTranslation();

    //TODO Replace isTeacher with isTeacher from server later on
    const { isTeacher } = useRoles();
    const isResolvedClass = props.isResolved
        ? styles.resolved
        : styles.notResolved;
    const isPublic = !props.isProtected ? public_icon : non_public_icon;
    const isVisible = !props.isHidden ? visibility_on : visibility_off;

    const subjectDisplay = props.subjectCode
        ? `${props.subjectCode} - ${props.subjectName}`
        : props.subjectName;

    return (
        <div className={styles.container}>
            <h3 className={styles.courseTitle}>{subjectDisplay}</h3>
            <div className={styles.iconSection}>
                <div
                    className={`${styles.resolvedContainer} ${isResolvedClass}`}
                >
                    {props.isResolved && (
                        <img
                            src={check_circle_white}
                            alt="Resolved"
                            className={styles.icon}
                        />
                    )}
                    <span className={styles.resolvedTextContainer}>
                        {props.isResolved ? t("resolved") : t("unresolved")}
                    </span>
                </div>
                <div className={styles.iconWrapper}>
                    <img
                        className={styles.icon}
                        src={isPublic}
                        alt=""
                    />
                    <span className={styles.tooltip}>
                        {props.isProtected
                            ? t("nonPublicQuestion")
                            : t("publicQuestion")}
                    </span>
                </div>
                {!isTeacher && (
                    <div className={styles.iconWrapper}>
                        <img
                            className={styles.icon}
                            src={isVisible}
                            alt=""
                        />
                        <span className={styles.tooltip}>
                            {props.isHidden
                                ? t("clickToShow")
                                : t("clickToHide")}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
