import {
    CSSProperties,
    FormEventHandler,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import styles from "./AskAQuestion.module.css";
import { Input, InputWithPrefetchedSuggestions, Loader, Select } from "../..";
import { useTranslation } from "react-i18next";
import { useFetchWithToken } from "../../../hooks";
import { ICourse, IOption, ISuggestion } from "../../../utils";
import { BASE_URL } from "../../../data";

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

const courseUrl = `${BASE_URL}/subject`;

export function AskAQuestion() {
    const { requestHandler: fetchCourses, isLoading: isLoadingCourses } =
        useFetchWithToken<ICourse[]>();
    const { t } = useTranslation();
    const [courses, setCourses] = useState<ICourse[]>([]);
    const [topics, setTopics] = useState<{
        options: IOption[];
        defaultValue: string;
    }>({ options: [], defaultValue: t("topicSelectDefault") });

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
                name: `${c.subjectCode ? c.subjectCode + " " : ""}${c.name}`,
            })),
        [courses],
    );

    const isLoading = isLoadingCourses;

    const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();
        console.log(formValues);
    };

    const handleCourseSuggestionClick = ({ id }: ISuggestion) => {
        setFormValues(prev => ({ ...prev, courseId: id }));
    };

    useEffect(() => {
        void fetchCourses(courseUrl).then(data => {
            if (data) {
                setCourses(data);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.loaderContainer}>
                    <Loader />
                </div>
            </div>
        );
    }

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

                <Select
                    label={t("topic")}
                    defaultValue={topics.defaultValue}
                    options={topics.options}
                    selectName="topic"
                    labelStyle={labelStyle}
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
