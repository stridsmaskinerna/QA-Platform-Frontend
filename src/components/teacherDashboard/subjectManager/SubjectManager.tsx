import { useTranslation } from "react-i18next";

import { ISubject } from "../../../utils";
import { CardContainer } from "../components";
import { SubjectList } from "../subjectList";

interface ISubjectManagerProps {
    subjects: ISubject[];
    selectedSubject: ISubject | null;
}

export function SubjectManager({
    subjects,
    selectedSubject
}: ISubjectManagerProps) {
    const { t } = useTranslation();

    return (
        <CardContainer>
            <h1>{t("teacherDashboard.yourCourses")}</h1>
            <div>
                <SubjectList
                    subjects={subjects}
                    selectedSubject={selectedSubject}
                />
            </div>
        </CardContainer>
    );
}
