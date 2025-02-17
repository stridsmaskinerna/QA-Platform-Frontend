import { useState } from "react";
import { useTranslation } from "react-i18next";

import { ITopic } from "../../../utils";
import { Input } from "../../input";
import { CancelButton, SaveButton } from "../../button";
import { useTeacherDashboardContext } from "../context";
import { TopicItemToolbar } from "../topicItemToolbar";
import styles from "./TopicItem.module.css";

interface ITopicItemProps {
    topic: ITopic;
}

export function TopicItem({ topic }: ITopicItemProps) {
    const { t } = useTranslation();
    const context = useTeacherDashboardContext();
    const [isUpdating, setIsUpdating] = useState(false);
    const [updatedTopic, setUpdatedTopic] = useState({ ...topic });

    const handleEdit = () => {
        void context.updateTopic(updatedTopic).then(() => {
            setIsUpdating(false);
        });
    };

    const handleCancelEdit = () => {
        setIsUpdating(false);
    };

    const handleSetUpdatedTopic = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedTopic(prev => {
            return { ...prev, name: e.target.value };
        });
    };

    const selectManageEdit = () => {
        setIsUpdating(prev => !prev);
    };

    const toggleActive = () => {
        const topic = { ...updatedTopic, isActive: !updatedTopic.isActive };
        setUpdatedTopic(topic);
        void context.updateTopic(topic);
    };

    return (
        <div className={styles.topicContainer}>
            <div className={styles.topicItem}>
                <p className={!topic.isActive ? styles.isDeactivated : ""}>
                    {topic.name}
                </p>
                <TopicItemToolbar
                    topic={topic}
                    onUpdate={selectManageEdit}
                    onActivate={toggleActive}
                    onDeactivate={toggleActive}
                />
            </div>
            {isUpdating && (
                <div className={styles.editContainer}>
                    <Input
                        inputType={"text"}
                        defaultValue={topic.name}
                        onChange={handleSetUpdatedTopic}
                    />
                    <div className={styles.topicEditContainer}>
                        <CancelButton
                            text={t("teacherDashboard.cancelUpdate")}
                            onClick={handleCancelEdit}
                        />
                        <SaveButton
                            text={t("teacherDashboard.saveUpdate")}
                            onClick={handleEdit}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
