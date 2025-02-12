import {
    ChangeEventHandler,
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
    RichTextEditor,
    Select,
} from "../..";
import { useTranslation } from "react-i18next";
import { useFetchWithToken, useQAContext } from "../../../hooks";
import { CustomError, ISubject, IOption, ISuggestion } from "../../../utils";
import { BASE_URL } from "../../../data";
import { PublicQuestionToggle } from ".";
import { AddATag } from "./AddATag";
import { useDebounceCallback } from "usehooks-ts";

interface IAskAQuestionFormValues {
    title: string;
    description: string;
    subjectId: string;
    topicId: string;
    isProtected?: boolean;
    tags: string[];
}

const labelStyle: CSSProperties = {
    fontWeight: "600",
    fontSize: "14px",
};

const courseUrl = `${BASE_URL}/subject`;
const postQuestionUrl = `${BASE_URL}/questions`;

export function AskAQuestion() {
    const { requestHandler: fetchCourses } = useFetchWithToken<ISubject[]>();
    const { requestHandler: postQuestion } = useFetchWithToken<void>();
    const { t } = useTranslation();
    const {
        loaderContext: { setIsLoading },
    } = useQAContext();
    const [courses, setCourses] = useState<ISubject[]>([]);
    const [selectedCourseId, setSelectedCourseId] = useState<string>("");
    const [addedTags, setAddedTags] = useState<string[]>([]);
    const [topics, setTopics] = useState<IOption[]>([]);
    const [description, setDescription] = useState("");

    const formRef = useRef<HTMLFormElement>(null);

    const possibleCourseSuggestions: ISuggestion[] = useMemo(
        () =>
            courses.map(c => ({
                id: c.id,
                name: `${c.subjectCode ? c.subjectCode + " " : ""}${c.name}`,
            })),
        [courses],
    );

    const courseNames = useMemo(
        () => possibleCourseSuggestions.map(c => c.name),
        [possibleCourseSuggestions],
    );

    const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();
        console.log("HERE");
        const formData = new FormData(e.currentTarget);
        const formDetails = Object.fromEntries(
            formData,
        ) as unknown as IAskAQuestionFormValues;
        //If the public toggle is off (which is the default), then no attribute for
        //isProtected will be submitted. Therefore we append the missing isProtected:true here
        //if there is no isProtected key in the formDetails object.
        if (!("isProtected" in formDetails)) {
            formDetails.isProtected = true;
        } else {
            formDetails.isProtected = false;
        }
        formDetails.tags = addedTags;
        formDetails.description = description;
        void (async () => {
            setIsLoading(true);
            try {
                await postQuestion(postQuestionUrl, {
                    method: "POST",
                    body: JSON.stringify(formDetails),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                formRef.current?.reset();
            } catch (e) {
                if (e instanceof CustomError) {
                    console.error(e);
                } else {
                    throw e;
                }
            } finally {
                setIsLoading(false);
            }
        })();
    };

    const handleCourseSuggestionClick = ({ id }: ISuggestion) => {
        setSelectedCourseId(id);
        setTopics(courses.find(c => c.id === id)?.topics ?? []);
    };
    const handleCourseOnChange: ChangeEventHandler<HTMLInputElement> = e => {
        if (
            courseNames.every(
                n => n.toLowerCase() !== e.target.value.trim().toLowerCase(),
            )
        ) {
            setTopics([]);
        }
    };
    const debouncedHandleCourseOnChange = useDebounceCallback(
        handleCourseOnChange,
        400,
    );

    const onAddTag = (tag: string) => setAddedTags(prev => [...prev, tag]);
    const onRemoveTag = (tag: string) =>
        setAddedTags(prev => prev.filter(t => t !== tag));

    useEffect(() => {
        void fetchCourses(courseUrl).then(data => {
            if (data) {
                setCourses(data);
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                <div className={styles.richTextWrapper}>
                    <h5>{t("questionDetails")}</h5>
                    <RichTextEditor
                        placeholder={t("questionDescriptionExpl")}
                        setEditorState={setDescription}
                    />
                </div>

                <InputWithPrefetchedSuggestions
                    onChange={debouncedHandleCourseOnChange}
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
                    <AddATag
                        addedTags={addedTags}
                        onRemoveClick={onRemoveTag}
                        onAddClick={onAddTag}
                    />
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
