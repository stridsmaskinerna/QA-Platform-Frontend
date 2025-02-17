import { ReactNode, useState } from "react";

import { IQuestion, ISubject, ITopic } from "../../../utils";
import { BASE_URL, SUBJECT_URL, TOPIC_URL } from "../../../data";
import { ITeacherDashboardContext, TeacherDashboardContext } from "../context";
import { useFetchWithToken } from "../../../hooks";

interface ITeacherDashboardProviderProps {
    children: ReactNode;
}

// TODO! Handle error globaly in errorBoundary or in local context ???
// TODO! Add TOPIC CRUD functionality
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

        if (data != null) {
            setSubjects(data ?? []);
            setSelectedSubject(data[0]);
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

    const createTopic = async (topic: ITopic) => {
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
    };

    const isLoading = () => {
        return fetchSubjectsReq.isLoading || fetchSubjectQuestionReq.isLoading;
    };

    const getContext = (): ITeacherDashboardContext => {
        return {
            selectedSubject,
            subjects,
            questions,
            createTopic,
            updateTopic,
            deleteTopic,
            updateSelectedSubject: setSelectedSubject,
            updateSubjects: setSubjects,
            updateQuestions: setQuestions,
            fetchQuestionDetails,
            fetchTeacherSubjects,
            isLoading,
        };
    };

    return (
        <TeacherDashboardContext.Provider value={getContext()}>
            {children}
        </TeacherDashboardContext.Provider>
    );
}
