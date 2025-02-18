import { useTranslation } from "react-i18next";

import { CardContainer } from "../components";
import { TopicCreator } from "../topicCreator";
import { TopicList } from "../topicList";
import { useTeacherDashboardContext } from "../context";
import { H1 } from "../../text";

export function TopicManager() {
    const context = useTeacherDashboardContext();
    const { t } = useTranslation();

    const getTitle = () => {
        return `${t("teacherDashboard.manageTopicsFor")} '${context.selectedSubject?.name}'`;
    };

    return (
        <CardContainer>
            <H1 text={getTitle()} />
            <TopicCreator />
            <TopicList />
        </CardContainer>
    );
}
