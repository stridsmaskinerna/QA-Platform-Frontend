import React, { ReactElement, ReactNode, useState } from "react";

import { IQuestion, ISubject } from "../../../utils";
import { BASE_URL, SUBJECT_URL } from "../../../data";
import { ITeacherDashboardContext, TeacherDashboardContext } from "../context";
import { useFetchWithToken } from "../../../hooks";

interface Props {
    children: ReactNode;
}

// TODO! Handle error globaly in errorBoundary or in local context ???
// TODO! Add TOPIC CRUD functionality
// TODO! Add english swedish text where missing.
export const TeacherDashboardProvider: React.FC<Props> = ({
    children,
}): ReactElement => {
    const [subjects, setSubjects] = useState<ISubject[]>([]);
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<ISubject | null>(
        null,
    );
    const fetchSubjects = useFetchWithToken<ISubject[]>();
    const fetchSubjectQuestions = useFetchWithToken<IQuestion[]>();

    const fetchTeacherSubjects = async () => {
        const data = await fetchSubjects.requestHandler(
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
        const data = await fetchSubjectQuestions.requestHandler(
            `${BASE_URL}${SUBJECT_URL}/${subject.id}/questions`,
        );

        setQuestions(data ?? []);
    };

    const isLoading = () => {
        return fetchSubjects.isLoading || fetchSubjectQuestions.isLoading;
    };

    const getContext = (): ITeacherDashboardContext => {
        return {
            selectedSubject,
            subjects,
            questions,
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
};
