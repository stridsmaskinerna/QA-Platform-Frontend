import { useTranslation } from "react-i18next";

import styles from "./SubjectItem.module.css";
import { ISubject } from "../../../utils";

interface ISubjectItemProps {
    subject: ISubject;
    isSelected: boolean;
    onSelectSubjectQuestions: (subject: ISubject) => void;
}

export function SubjectItem({
    subject,
    isSelected,
    onSelectSubjectQuestions,
}: ISubjectItemProps) {
    const { t } = useTranslation();

    const getDerivedClassName = () => {
        return isSelected
            ? `${styles.selectedSubject} ${styles.subjectItem}`
            : styles.subjectItem;
    };

    return (
        <div className={getDerivedClassName()}>
            <div>
                <p>
                    <span className={styles.subjectCode}>
                        {subject.subjectCode}
                    </span>{" "}
                    - {subject.name}
                </p>
            </div>
            {isSelected && (
                <div>
                    <button
                        onClick={() => {
                            onSelectSubjectQuestions(subject);
                        }}
                        className={styles.viewQuestionsBtn}
                    >
                        {t("teacherDashboard.viewQuestions")}
                    </button>
                </div>
            )}
        </div>
    );
}
