import { useTranslation } from "react-i18next";

import { ISubject } from "../../../utils";
import { CardContainer } from "../cardContainer";
import { SubjectItem } from "../subjectItem";

interface ISubjectListCardProps {
    subjects: ISubject[];
    selectedSubject: ISubject | null;
    onSelectSubject: (subject: ISubject) => void;
    onSelectSubjectQuestions: (subject: ISubject) => void;
}

export function SubjectListCard({
    subjects,
    selectedSubject,
    onSelectSubject,
    onSelectSubjectQuestions,
}: ISubjectListCardProps) {
    const { t } = useTranslation();

    const selectSubject = (subject: ISubject) => {
        onSelectSubject(subject);
    };

    const isSubjectSelected = (subject: ISubject) => {
        return selectedSubject != null && selectedSubject.id == subject.id;
    };

    return (
        <CardContainer>
            <h1>{t("teacherDashboard.yourCourses")}</h1>
            <div>
                {subjects.map((s, i) => (
                    <div
                        key={i}
                        onClick={() => {
                            selectSubject(s);
                        }}
                    >
                        <SubjectItem
                            subject={s}
                            isSelected={isSubjectSelected(s)}
                            onSelectSubjectQuestions={onSelectSubjectQuestions}
                        />
                    </div>
                ))}
            </div>
        </CardContainer>
    );
}
