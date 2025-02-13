import { useTranslation } from "react-i18next";

import { ISubject } from "../../../utils";
import { CardContainer } from "../components";
import { TopicCreator } from "../topicCreator";
import { TopicList } from "../topicList";

interface SubjectManagerProps {
    subject: ISubject;
}

export function TopicManager({ subject }: SubjectManagerProps) {
    const { t } = useTranslation();

    const handleCreate = () => {
        console.log("Create new topic...");
    };

    return (
        <CardContainer>
            <h1>
                {t("teacherDashboard.manageTopicsFor")} {`'${subject.name}'`}
            </h1>
            <TopicCreator onCreate={handleCreate} />
            <TopicList topics={subject.topics} />
        </CardContainer>
    );
}
