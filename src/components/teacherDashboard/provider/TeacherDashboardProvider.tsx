import { ReactNode, useState } from "react";

import {
    CustomError,
    IQuestion,
    ISubject,
    ITopic,
    ITopicForCreation,
} from "../../../utils";
import { BASE_URL, SUBJECT_URL, TOPIC_URL } from "../../../data";
import { ITeacherDashboardContext, TeacherDashboardContext } from "../context";
import { useFetchWithToken } from "../../../hooks";
import { ErrorModal } from "../../modal";

interface ITeacherDashboardProviderProps {
    children: ReactNode;
}

// TODO! Handle error globaly in errorBoundary or in local context ???
export function TeacherDashboardProvider({
    children,
}: ITeacherDashboardProviderProps) {
    const [subjects, setSubjects] = useState<ISubject[]>([]);
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [error, setError] = useState<CustomError | null>(null);
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

        if (updateTopicReq.error != null) {
            setError(updateTopicReq.error);
        }
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

        if (createTopicReq.error != null) {
            setError(createTopicReq.error);
        }
    };

    const deleteTopic = async (topic: ITopic) => {
        await deleteTopicReq.requestHandler(
            `${BASE_URL}${TOPIC_URL}/${topic.id}`,
            {
                method: "DELETE",
            },
        );
        await fetchTeacherSubjects();

        if (deleteTopicReq.error != null) {
            setError(deleteTopicReq.error);
        }
    };

    const updateSelectedSubject = (subject: ISubject) => {
        if (selectedSubject?.id != subject.id) {
            setQuestions([]);
        }
        setSelectedSubject(subject);
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
            updateSelectedSubject,
            updateSubjects: setSubjects,
            updateQuestions: setQuestions,
            fetchQuestionDetails,
            fetchTeacherSubjects,
            isLoading,
        };
    };

    return (
        <TeacherDashboardContext.Provider value={getContext()}>
            {
                <ErrorModal
                    error={error}
                    onClose={() => {
                        setError(null);
                    }}
                />
            }
            {children}
        </TeacherDashboardContext.Provider>
    );
}
