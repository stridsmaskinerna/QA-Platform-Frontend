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
import { PublicQuestionToggle } from ".";

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
    const [topics, setTopics] = useState<IOption[]>([]);

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
        //If the public toggle is off (which is the default), then no attribute for
        //isProtected will be submitted. Therefore we append the missing isProtected:true here
        //if there is no isProtected key in the formDetails object.
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
                {/* Hidden input to carry the subjectId rather than the subject name shown to the user in above input */}
                <input
                    name="subjectId"
                    type="hidden"
                    value={selectedCourseId}
                />

                <Select
                    label={t("topic")}
                    defaultValue={
                        topics.length
                            ? t("topicSelectActive")
                            : t("topicSelectDefault")
                    }
                    options={topics}
                    selectName="topicId"
                    labelStyle={labelStyle}
                />
                <div className={styles.inputPair}>
                    <PublicQuestionToggle />
                    <></>
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
