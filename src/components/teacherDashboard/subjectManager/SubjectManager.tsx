import { useTranslation } from "react-i18next";

import { CardContainer } from "../components";
import { SubjectList } from "../subjectList";

export function SubjectManager() {
    const { t } = useTranslation();

    return (
        <CardContainer>
            <h1>{t("teacherDashboard.yourCourses")}</h1>
            <div>
                <SubjectList />
            </div>
        </CardContainer>
    );
}
