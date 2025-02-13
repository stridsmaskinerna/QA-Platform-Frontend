import { useTranslation } from "react-i18next";

import { ISubject, ITopic } from "../../../utils";
import { CardContainer } from "../cardContainer";
import styles from "./TopicManagerCard.module.css";

interface SubjectManagerCardProps {
    subject: ISubject;
}

export function TopicManagerCard({ subject }: SubjectManagerCardProps) {
    const { t } = useTranslation();

    return (
        <CardContainer>
            <h1>
                {t("teacherDashboard.manageTopicsFor")} {`'${subject.name}'`}
            </h1>
            {subject.topics.map((topic, i) => (
                <div key={i}>
                    <TopicItem topic={topic} />
                </div>
            ))}
        </CardContainer>
    );
}

interface ITopicItemProps {
    topic: ITopic;
}

function TopicItem({ topic }: ITopicItemProps) {
    return (
        <div className={styles.subjectItem}>
            <p>{topic.name}</p>
        </div>
    );
}
