import { useEffect } from "react";

import { ISubject } from "../../../utils";
import { useTeacherDashboardContext } from "../context";
import { SubjectItem } from "../subjectItem";

interface ISubjectListProps {
    subjects: ISubject[];
    selectedSubject: ISubject | null;
}

export function SubjectList({
    subjects,
    selectedSubject
}: ISubjectListProps) {
    const context = useTeacherDashboardContext();

    useEffect(() => {
        void context.fetchTeacherSubjects();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchQuestionDetails = (subject: ISubject) => {
        void context.fetchQuestionDetails(subject);
    };

    const isSubjectSelected = (subject: ISubject) => {
        return selectedSubject != null && selectedSubject.id == subject.id;
    };

    return (
        <>
            {subjects.map(s => (
                <div
                    key={s.id}
                    onClick={() => { context.updateSelectedSubject(s); }}
                >
                    <SubjectItem
                        subject={s}
                        isSelected={isSubjectSelected(s)}
                        onSelectSubjectQuestions={fetchQuestionDetails}
                    />
                </div>
            ))}
        </>
    );
}
