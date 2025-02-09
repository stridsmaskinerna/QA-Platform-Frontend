import { CSSProperties, useRef } from "react";
import styles from "./AskAQuestion.module.css";
import { Input } from "../..";
import { useTranslation } from "react-i18next";
import { useSearchCourses } from "../../../hooks";

const labelStyle: CSSProperties = {
    fontWeight: "600",
    fontSize: "14px",
};

export function AskAQuestion() {
    const formRef = useRef<HTMLFormElement>(null);
    const { t } = useTranslation();
    const { filteredCourses, isLoadingCourses, debouncedOnCourseInputChange } =
        useSearchCourses();

    console.log(filteredCourses);

    return (
        <div className={styles.container}>
            <form
                className={styles.form}
                ref={formRef}
            >
                <Input
                    labelStyle={labelStyle}
                    inputName="questionTitle"
                    minInputValueLength={5}
                    inputType="text"
                    label={t("questionTitle")}
                    placeHolder={t("questionTitlePlaceholder")}
                />

                <Input
                    onChange={debouncedOnCourseInputChange}
                    labelStyle={labelStyle}
                    inputName="course"
                    minInputValueLength={1}
                    inputType="search"
                    label={t("course")}
                    placeHolder={t("askQuestionCoursePlaceholder")}
                />
            </form>
        </div>
    );
}
