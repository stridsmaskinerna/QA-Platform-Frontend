import { useTranslation } from "react-i18next";

import { CardContainer } from "../components";
import { SubjectList } from "../subjectList";
import { H1 } from "../../text";

export function SubjectManager() {
    const { t } = useTranslation();

    return (
        <CardContainer>
            <H1 text={t("teacherDashboard.yourCourses")} />
            <SubjectList />
        </CardContainer>
    );
}
