import { ReactNode, useRef, useState } from "react";

import { IQuestion, ISubject, ITopic, ITopicForCreation } from "../../../utils";
import { BASE_URL, QUESTION_URL, SUBJECT_URL, TOPIC_URL } from "../../../data";
import { ITeacherDashboardContext, TeacherDashboardContext } from "../context";
import {
    useDELETE,
    useFetchWithToken,
    useInfiniteScrolling,
    usePOST,
    usePUT,
} from "../../../hooks";
import { ErrorModal } from "../../modal";

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
    const createTopicReq = usePOST<void>();
    const updateTopicReq = usePUT<void>();
    const deleteTopicReq = useDELETE<void>();
    const fetchSubjectsReq = useFetchWithToken<ISubject[]>();
    const deleteQuestionReq = useDELETE<void>();
    const fetchQuestionUrl = useRef<string>();
    const {
        fetchFromStart,
        loaderRef,
        hasMore,
        paginatedData,
        totalItemCount,
        resetPaginatedData,
        isLoading: fetchQuestionsLoading,
        removeIdFromPaginatedData,
    } = useInfiniteScrolling<IQuestion>({
        url: fetchQuestionUrl.current ?? "",
        limit: 20,
    });

    const fetchTeacherSubjects = async () => {
        const { response, error } =
            await fetchSubjectsReq.requestHandlerWithError(
                `${BASE_URL}${SUBJECT_URL}/teacher`,
            );

        if (error != null) {
            return;
        }

        if (response != null && selectedSubject == null) {
            setSubjects(response);
            setSelectedSubject(response[0]);
        } else if (response != null && selectedSubject != null) {
            setSubjects(response);
            const subject =
                response.find(s => s.id === selectedSubject.id) ?? null;
            setSelectedSubject(subject);
        } else {
            setSubjects([]);
            setSelectedSubject(null);
        }
    };

    const fetchQuestionDetails = async (subject: ISubject) => {
        fetchQuestionUrl.current = `${BASE_URL}${SUBJECT_URL}/${subject.id}/questions`;
        await fetchFromStart(fetchQuestionUrl.current);
    };

    const updateTopic = async (topic: ITopic) => {
        const { error } = await updateTopicReq.putRequestWithError(
            `${BASE_URL}${TOPIC_URL}/${topic.id}`,
            topic,
        );

        if (error != null) {
            return;
        }

        await fetchTeacherSubjects();
    };

    const createTopic = async (topic: ITopicForCreation) => {
        const { error } = await createTopicReq.postRequestWithError(
            `${BASE_URL}${TOPIC_URL}`,
            topic,
        );

        if (error != null) {
            return;
        }

        await fetchTeacherSubjects();
    };

    const deleteTopic = async (topic: ITopic) => {
        const { error } = await deleteTopicReq.deleteRequestWithError(
            `${BASE_URL}${TOPIC_URL}/${topic.id}`,
        );

        if (error != null) {
            return;
        }

        await fetchTeacherSubjects();
    };

    const updateSelectedSubject = (subject: ISubject) => {
        if (selectedSubject?.id != subject.id) {
            resetPaginatedData();
        }
        setSelectedSubject(subject);
    };

    const handleDeleteQuestion = async (id: string) => {
        const { error } = await deleteQuestionReq.deleteRequestWithError(
            `${BASE_URL}${QUESTION_URL}/${id}`,
        );

        if (error != null) {
            return;
        }

        removeIdFromPaginatedData(id);
    };

    const isLoading = () => {
        return fetchSubjectsReq.isLoading || fetchQuestionsLoading;
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
            handleDeleteQuestion,
        };
    };

    const clearErrors = () => {
        updateTopicReq.clearError();
        deleteTopicReq.clearError();
        createTopicReq.clearError();
        fetchSubjectsReq.clearError();
        deleteQuestionReq.clearError();
    };

    return (
        <TeacherDashboardContext.Provider value={getContext()}>
            <ErrorModal
                errors={[
                    updateTopicReq.error,
                    deleteTopicReq.error,
                    createTopicReq.error,
                    fetchSubjectsReq.error,
                    deleteQuestionReq.error,
                ]}
                onClearErrors={clearErrors}
            />
            {children}
        </TeacherDashboardContext.Provider>
    );
}
