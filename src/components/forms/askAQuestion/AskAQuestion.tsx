import {
    CSSProperties,
    FormEventHandler,
    useMemo,
    useRef,
    useState,
} from "react";
import styles from "./AskAQuestion.module.css";
import { Input, InputWithPrefetchedSuggestions } from "../..";
import { useTranslation } from "react-i18next";
import { useSearchCourses } from "../../../hooks";
import { ISuggestion } from "../../../utils";

interface IAskAQuestionFormValues {
    title: string;
    description: string;
    courseId: string;
    topicId: string;
    isProtected: boolean;
    tags: string[];
}

const labelStyle: CSSProperties = {
    fontWeight: "600",
    fontSize: "14px",
};

export function AskAQuestion() {
    const { t } = useTranslation();
    const { courses } = useSearchCourses();

    const [formValues, setFormValues] = useState<IAskAQuestionFormValues>({
        title: "",
        description: "",
        courseId: "",
        topicId: "",
        isProtected: true,
        tags: [],
    });

    const formRef = useRef<HTMLFormElement>(null);

    const possibleCourseSuggestions: ISuggestion[] = useMemo(
        () =>
            courses.map(c => ({
                id: c.id,
                name: `${c.subjectCode} ${c.name}`,
            })),
        [courses],
    );

    const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();
        console.log(formValues);
    };

    const handleCourseSuggestionClick = ({ id }: ISuggestion) => {
        setFormValues(prev => ({ ...prev, courseId: id }));
    };

    return (
        <div className={styles.container}>
            <form
                onSubmit={handleSubmit}
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

                <InputWithPrefetchedSuggestions
                    onSuggestionClick={handleCourseSuggestionClick}
                    labelStyle={labelStyle}
                    inputName="course"
                    inputType="search"
                    label={t("course")}
                    placeHolder={t("askQuestionCoursePlaceholder")}
                    possibleSuggestions={possibleCourseSuggestions}
                />
                <button
                    className={styles.submitBtn}
                    type="submit"
                >
                    {t("submitQuestion")}
                </button>
            </form>
        </div>
    );
}
