import {
    CSSProperties,
    FormEventHandler,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import styles from "./AskAQuestion.module.css";
import {
    Input,
    InputWithPrefetchedSuggestions,
    Loader,
    Select,
    Toggle,
} from "../..";
import { useTranslation } from "react-i18next";
import { useFetchWithToken } from "../../../hooks";
import { ICourse, IOption, ISuggestion } from "../../../utils";
import { BASE_URL } from "../../../data";

interface IAskAQuestionFormValues {
    title: string;
    description: string;
    subjectId: string;
    topicId: string;
    isProtected?: string;
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
    const [selectedCourseId, setSelectedCourseId] = useState<string>("");
    const [topics, setTopics] = useState<{
        options: IOption[];
        defaultValue: string;
    }>({ options: [], defaultValue: t("topicSelectDefault") });

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
        const formData = new FormData(e.currentTarget);
        const formDetails = Object.fromEntries(
            formData,
        ) as unknown as IAskAQuestionFormValues;
        if (!("isProtected" in formDetails)) {
            formDetails.isProtected = "true";
        }
        console.log(formDetails);
    };

    const handleCourseSuggestionClick = ({ id }: ISuggestion) => {
        setSelectedCourseId(id);
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
                    inputName="title"
                    minInputValueLength={5}
                    inputType="text"
                    label={t("questionTitle")}
                    placeHolder={t("questionTitlePlaceholder")}
                />

                <InputWithPrefetchedSuggestions
                    onSuggestionClick={handleCourseSuggestionClick}
                    labelStyle={labelStyle}
                    inputType="search"
                    label={t("course")}
                    placeHolder={t("askQuestionCoursePlaceholder")}
                    possibleSuggestions={possibleCourseSuggestions}
                />
                <input
                    name="subjectId"
                    type="hidden"
                    value={selectedCourseId}
                />

                <Select
                    label={t("topic")}
                    defaultValue={topics.defaultValue}
                    options={topics.options}
                    selectName="topicId"
                    labelStyle={labelStyle}
                />
                <div className={styles.inputPair}>
                    <Toggle inputName="isProtected" />
                </div>
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
