import { useTranslation } from "react-i18next";
import styles from "./QuestionHeader.module.css";
import check_circle_white from "../../../assets/icons/check_circle_white.svg";
import public_icon from "../../../assets/icons/public.svg";
import non_public_icon from "../../../assets/icons/non_public.svg";
import visibility_off from "../../../assets/icons/visibility_off.svg";
import visibility_on from "../../../assets/icons/visibility_on.svg";
import { usePUT } from "../../../hooks";
import { BASE_URL, QUESTION_URL } from "../../../data";
import { Dispatch, SetStateAction } from "react";
import { highlights } from "../constants";

interface QuestionHeaderProps {
    subjectName: string;
    subjectCode: string;
    isProtected: boolean;
    isResolved: boolean;
    isHideable: boolean;
    id: string;
    setIsHiddenOptimistic: Dispatch<SetStateAction<boolean>>;
    isHiddenOptimistic: boolean;
}

export function QuestionHeader(props: QuestionHeaderProps) {
    const { t } = useTranslation();
    const {
        putRequest,
        isLoading: isVisibilityToggleLoading,
        error: toggleVisibilityError,
    } = usePUT();

    const isResolvedClass = props.isResolved
        ? styles.resolved
        : styles.notResolved;
    const isPublic = !props.isProtected ? public_icon : non_public_icon;

    const subjectDisplay = props.subjectCode
        ? `${props.subjectCode} - ${props.subjectName}`
        : props.subjectName;

    const toggleVisibility = async () => {
        await putRequest(`${BASE_URL}${QUESTION_URL}/${props.id}/visibility`);
        if (!toggleVisibilityError) {
            props.setIsHiddenOptimistic(prev => !prev);
        } else {
            console.error(toggleVisibilityError);
        }
    };

    return (
        <div className={styles.container}>
            <h3
                className={styles.courseTitle}
                data-hl={highlights.subjectTitle}
            >
                {subjectDisplay}
            </h3>
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
                    <span
                        className={styles.resolvedTextContainer}
                        data-hl={highlights.resolvedQuestion}
                    >
                        {props.isResolved ? t("resolved") : t("unresolved")}
                    </span>
                </div>
                <div className={styles.iconWrapper}>
                    <img
                        className={styles.icon}
                        src={isPublic}
                        alt=""
                        data-hl={highlights.publicQuestion}
                    />
                    <span
                        className={styles.tooltip}    
                        data-hl={highlights.publicQuestionTooltip}
                    >
                        {props.isProtected
                            ? t("nonPublicQuestion")
                            : t("publicQuestion")}
                    </span>
                </div>
                {props.isHideable && (
                    <div className={styles.iconWrapper}>
                        <button
                            className={styles.hideShowBtn}
                            disabled={isVisibilityToggleLoading}
                            onClick={() => void toggleVisibility()}
                        >
                            <img
                                className={styles.icon}
                                src={
                                    props.isHiddenOptimistic
                                        ? visibility_off
                                        : visibility_on
                                }
                                alt=""
                            />
                        </button>
                        <span className={styles.tooltip}>
                            {props.isHiddenOptimistic
                                ? t("clickToShow")
                                : t("clickToHide")}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
