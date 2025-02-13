import { useTranslation } from "react-i18next";

import { ISubject } from "../../../utils";
import { CardContainer } from "../cardContainer";
import { AddTopic } from "../addTopic";
import { TopicList } from "../topicList";

interface SubjectManagerCardProps {
    subject: ISubject;
}

export function TopicManagerCard({ subject }: SubjectManagerCardProps) {
    const { t } = useTranslation();

    const handleCreate = () => {
        console.log("Create new topic...");
    };

    return (
        <CardContainer>
            <h1>
                {t("teacherDashboard.manageTopicsFor")} {`'${subject.name}'`}
            </h1>
            <AddTopic onCreate={handleCreate}/>
            <TopicList topics={subject.topics}/>
        </CardContainer>
    );
}
