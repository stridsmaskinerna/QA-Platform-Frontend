import { useTranslation } from "react-i18next";

import { ISubject } from "../../../utils";
import { CardContainer } from "../cardContainer";
import { SubjectList } from "../subjectList";

interface ISubjectManagerProps {
    subjects: ISubject[];
    selectedSubject: ISubject | null;
    onSelectSubject: (subject: ISubject) => void;
    onSelectSubjectQuestions: (subject: ISubject) => void;
}

export function SubjectManager({
    subjects,
    selectedSubject,
    onSelectSubject,
    onSelectSubjectQuestions,
}: ISubjectManagerProps) {
    const { t } = useTranslation();

    return (
        <CardContainer>
            <h1>{t("teacherDashboard.yourCourses")}</h1>
            <div>
                <SubjectList
                    subjects={subjects}
                    selectedSubject={selectedSubject}
                    onSelectSubject={onSelectSubject}
                    onSelectSubjectQuestions={onSelectSubjectQuestions} />
            </div>
        </CardContainer>
    );
}
