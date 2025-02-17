import { useTranslation } from "react-i18next";

import { CardContainer } from "../components";
import { TopicCreator } from "../topicCreator";
import { TopicList } from "../topicList";
import { useTeacherDashboardContext } from "../context";

export function TopicManager() {
    const context = useTeacherDashboardContext();
    const { t } = useTranslation();

    return (
        <CardContainer>
            <h1>
                {t("teacherDashboard.manageTopicsFor")} {`'${context.selectedSubject?.name}'`}
            </h1>
            <TopicCreator />
            <TopicList />
        </CardContainer>
    );
}
