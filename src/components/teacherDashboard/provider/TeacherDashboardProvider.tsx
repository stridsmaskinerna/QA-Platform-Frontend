import { ReactNode, useState } from "react";

import { IQuestion, ISubject, ITopic, ITopicForCreation } from "../../../utils";
import { BASE_URL, SUBJECT_URL, TOPIC_URL } from "../../../data";
import { ITeacherDashboardContext, TeacherDashboardContext } from "../context";
import { useFetchWithToken } from "../../../hooks";
import { ErrorModal } from "../../modal";

interface ITeacherDashboardProviderProps {
    children: ReactNode;
}

export function TeacherDashboardProvider({
    children,
}: ITeacherDashboardProviderProps) {
    const [subjects, setSubjects] = useState<ISubject[]>([]);
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<ISubject | null>(
        null,
    );
    const createTopicReq = useFetchWithToken<void>();
    const updateTopicReq = useFetchWithToken<void>();
    const deleteTopicReq = useFetchWithToken<void>();
    const fetchSubjectsReq = useFetchWithToken<ISubject[]>();
    const fetchSubjectQuestionReq = useFetchWithToken<IQuestion[]>();

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
        const data = await fetchSubjectQuestionReq.requestHandler(
            `${BASE_URL}${SUBJECT_URL}/${subject.id}/questions`,
        );
        setQuestions(data ?? []);
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
            setQuestions([]);
        }
        setSelectedSubject(subject);
    };

    const isLoading = () => {
        return fetchSubjectQuestionReq.isLoading;
    };

    const getContext = (): ITeacherDashboardContext => {
        return {
            selectedSubject,
            subjects,
            questions,
            createTopic,
            updateTopic,
            deleteTopic,
            updateSelectedSubject,
            updateSubjects: setSubjects,
            updateQuestions: setQuestions,
            fetchQuestionDetails,
            fetchTeacherSubjects,
            isLoading,
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
