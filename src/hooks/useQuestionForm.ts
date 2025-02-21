import {
    ChangeEventHandler,
    FormEventHandler,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { BASE_URL, QUESTION_URL } from "../data";
import { IOption, IQuestionForEdit, ISubject, ISuggestion } from "../utils";
import { useGet, usePOST, usePUT } from "./Http";
import { useQAContext } from ".";
import { useDebounceCallback } from "usehooks-ts";

interface IQuestionFormValues {
    title: string;
    description: string;
    subjectId: string;
    topicId: string;
    isProtected?: boolean;
    tags: string[];
}

const courseUrl = `${BASE_URL}/subjects`;
const postQuestionUrl = `${BASE_URL}/questions`;

interface IUseQuestionForm {
    action: "edit" | "ask";
    questionId?: string;
}

export function useQuestionForm({ action, questionId }: IUseQuestionForm) {
    if (action === "edit" && questionId === undefined) {
        throw new Error(
            "Need to provide a questionId if using useQuestionForm for editing a question",
        );
    }
    const { getRequest: getSubjects } = useGet<ISubject[]>();
    const { getRequest: getQuestionForEdit } = useGet<IQuestionForEdit>();
    const { postRequest: postQuestion } = usePOST();
    const { putRequest: editQuestion } = usePUT();
    const {
        loaderContext: { setIsLoading },
    } = useQAContext();
    const [courses, setCourses] = useState<ISubject[]>([]);
    const [addedTags, setAddedTags] = useState<string[]>([]);
    const [topics, setTopics] = useState<IOption[]>([]);
    const [description, setDescription] = useState("");
    const [questionForEdit, setQuestionForEdit] = useState<IQuestionForEdit>();
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

    const handleCourseSuggestionClick = ({ id }: Omit<ISuggestion, "name">) => {
        setTopics(courses.find(c => c.id === id)?.topics ?? []);
    };
    const handleCourseOnChange: ChangeEventHandler<HTMLInputElement> = e => {
        if (
            courseNames.every(
                n => n.toLowerCase() !== e.target.value.trim().toLowerCase(),
            )
        ) {
            console.log("here");
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

    const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formDetails = Object.fromEntries(
            formData,
        ) as unknown as IQuestionFormValues;
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
            if (action === "ask") {
                await postQuestion(postQuestionUrl, formDetails);
            } else {
                await editQuestion(
                    `${postQuestionUrl}/${questionId}`,
                    formDetails,
                );
            }
            formRef.current?.reset();

            setIsLoading(false);
        })();
    };

    const fetchData = async () => {
        const subjectData = await getSubjects(courseUrl);
        if (subjectData) {
            setCourses(subjectData);
        }
        if (action === "edit") {
            const originalQuestion = await getQuestionForEdit(
                `${BASE_URL}${QUESTION_URL}/${questionId}/edit`,
            );
            if (originalQuestion) {
                setTopics(
                    (subjectData ?? []).find(
                        s => s.id === originalQuestion.subjectId,
                    )?.topics ?? [],
                );
                setQuestionForEdit(originalQuestion);
                setAddedTags(originalQuestion.tags);
            }
        }
    };

    useEffect(() => {
        void fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        onRemoveTag,
        onAddTag,
        debouncedHandleCourseOnChange,
        handleCourseSuggestionClick,
        possibleCourseSuggestions,
        addedTags,
        topics,
        setDescription,
        description,
        formRef,
        handleSubmit,
        questionForEdit,
    };
}
