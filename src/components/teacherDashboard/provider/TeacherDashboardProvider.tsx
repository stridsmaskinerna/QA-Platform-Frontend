import { ReactNode, useRef, useState } from "react";

import { IQuestion, ISubject, ITopic, ITopicForCreation } from "../../../utils";
import { BASE_URL, SUBJECT_URL, TOPIC_URL } from "../../../data";
import { ITeacherDashboardContext, TeacherDashboardContext } from "../context";
import { useFetchWithToken } from "../../../hooks";
<<<<<<< HEAD
import { useInfiniteScrolling } from "../../../hooks/useInfiniteScrolling";
=======
import { ErrorModal } from "../../modal";
>>>>>>> development

interface ITeacherDashboardProviderProps {
    children: ReactNode;
}

export function TeacherDashboardProvider({
    children,
}: ITeacherDashboardProviderProps) {
    const [subjects, setSubjects] = useState<ISubject[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<ISubject | null>(
        null,
    );
    const createTopicReq = useFetchWithToken<void>();
    const updateTopicReq = useFetchWithToken<void>();
    const deleteTopicReq = useFetchWithToken<void>();
    const fetchSubjectsReq = useFetchWithToken<ISubject[]>();
    const fetchQuestionUrl = useRef<string>();
    const {
        fetchFromStart,
        loaderRef,
        hasMore,
        paginatedData,
        totalItemCount,
        resetPaginatedData,
        isLoading: fetchQuestionsLoading,
    } = useInfiniteScrolling<IQuestion>({
        url: fetchQuestionUrl.current,
        limit: 20,
    });

    const fetchTeacherSubjects = async () => {
        const data = await fetchSubjectsReq.requestHandler(
            `${BASE_URL}${SUBJECT_URL}/teacher`,
        );

        if (data != null && selectedSubject == null) {
            setSubjects(data);
            setSelectedSubject(data[0]);
        } else if (data != null && selectedSubject != null) {
            setSubjects(data);
            const subject = data.find(s => s.id === selectedSubject.id) ?? null;
            setSelectedSubject(subject);
        } else {
            setSubjects([]);
            setSelectedSubject(null);
        }
    };

    const fetchQuestionDetails = async (subject: ISubject) => {
<<<<<<< HEAD
        fetchQuestionUrl.current = `${BASE_URL}${SUBJECT_URL}/${subject.id}/questions`;
        await fetchFromStart(fetchQuestionUrl.current);
=======
        const data = await fetchSubjectQuestionReq.requestHandler(
            `${BASE_URL}${SUBJECT_URL}/${subject.id}/questions`,
        );
        setQuestions(data ?? []);
>>>>>>> development
    };

    const updateTopic = async (topic: ITopic) => {
        await updateTopicReq.requestHandler(
            `${BASE_URL}${TOPIC_URL}/${topic.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(topic),
            },
        );
        await fetchTeacherSubjects();
    };

    const createTopic = async (topic: ITopicForCreation) => {
        await createTopicReq.requestHandler(`${BASE_URL}${TOPIC_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(topic),
        });
        await fetchTeacherSubjects();
    };

    const deleteTopic = async (topic: ITopic) => {
        await deleteTopicReq.requestHandler(
            `${BASE_URL}${TOPIC_URL}/${topic.id}`,
            {
                method: "DELETE",
            },
        );
        await fetchTeacherSubjects();
    };

    const updateSelectedSubject = (subject: ISubject) => {
        if (selectedSubject?.id != subject.id) {
            resetPaginatedData();
        }
        setSelectedSubject(subject);
    };

    const isLoading = () => {
<<<<<<< HEAD
        return fetchSubjectsReq.isLoading || fetchQuestionsLoading;
=======
        return fetchSubjectQuestionReq.isLoading;
>>>>>>> development
    };

    const getContext = (): ITeacherDashboardContext => {
        return {
            selectedSubject,
            subjects,
            questions: paginatedData,
            createTopic,
            updateTopic,
            deleteTopic,
            updateSelectedSubject,
            updateSubjects: setSubjects,
            fetchQuestionDetails,
            fetchTeacherSubjects,
            isLoading,
            loaderRef,
            hasMore,
            totalItemCount,
        };
    };

    const clearErrors = () => {
        updateTopicReq.clearError();
        deleteTopicReq.clearError();
        createTopicReq.clearError();
    };

    return (
        <TeacherDashboardContext.Provider value={getContext()}>
            {
                <ErrorModal
                    errors={[
                        updateTopicReq.error,
                        deleteTopicReq.error,
                        createTopicReq.error,
                    ]}
                    onClearErrors={clearErrors}
                />
            }
            {children}
        </TeacherDashboardContext.Provider>
    );
}
