import { useTranslation } from "react-i18next";

import { ITopic } from "../../../utils";
import removeIcon from "../../../assets/icons/removeX.svg";
import editIcon from "../../../assets/icons/edit.svg";
import styles from "./TopicItem.module.css";

interface ITopicItemProps {
    topic: ITopic;
}

export function TopicItem({ topic }: ITopicItemProps) {
    const handleEdit = (topic: ITopic) => {
        console.log(topic);
    };

    const handleDelete = (topic: ITopic) => {
        console.log(topic);
    };

    return (
        <div className={styles.subjectItem}>
            <p>{topic.name}</p>
            <TopicItemToolbar
                topic={topic}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
}

interface ITopicItemToolbarProps {
    topic: ITopic;
    onEdit: (topic: ITopic) => void;
    onDelete: (topic: ITopic) => void;
}

function TopicItemToolbar({ topic, onEdit, onDelete }: ITopicItemToolbarProps) {
    const { t } = useTranslation();

    const selectEdit = (topic: ITopic) => {
        onEdit(topic);
    };

    const selectDelete = (topic: ITopic) => {
        onDelete(topic);
    };

    return (
        <div className={styles.toolContainer}>
            <img
                onClick={() => {
                    selectEdit(topic);
                }}
                src={editIcon}
                alt={t("teacherDashboard.edit")}
                title={t("teacherDashboard.edit")}
                className={styles.icon}
            />
            <img
                onClick={() => {
                    selectDelete(topic);
                }}
                src={removeIcon}
                alt={t("teacherDashboard.delete")}
                title={t("teacherDashboard.delete")}
                className={styles.icon}
            />
        </div>
    );
}
