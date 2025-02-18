import { useState } from "react";
import { useTranslation } from "react-i18next";

import { ITopic } from "../../../utils";
import { Input } from "../../input";
import { CancelButton, SaveButton } from "../../button";
import { useTeacherDashboardContext } from "../context";
import { TopicItemToolbar } from "../topicItemToolbar";
import { DeleteButton } from "../../button/deleteButton";
import styles from "./TopicItem.module.css";

interface ITopicItemProps {
    topic: ITopic;
}

export function TopicItem({ topic }: ITopicItemProps) {
    const { t } = useTranslation();
    const context = useTeacherDashboardContext();
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentTopicValue, setCurrentTopicValue] = useState({ ...topic });

    const handleSetCurrentTopicValue = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCurrentTopicValue(prev => {
            return { ...prev, name: e.target.value };
        });
    };

    const selectOpenUpdateManager = () => {
        setIsDeleting(false);
        setIsUpdating(prev => !prev);
    };

    const selectOpenDeleteManager = () => {
        setIsUpdating(false);
        setIsDeleting(prev => !prev);
    };

    const handleUpdate = () => {
        void context.updateTopic(currentTopicValue).then(() => {
            setIsUpdating(false);
        });
    };

    const handleDelete = () => {
        void context.deleteTopic(topic);
    };

    const toggleActivateTopic = () => {
        const topic = {
            ...currentTopicValue,
            isActive: !currentTopicValue.isActive,
        };
        setCurrentTopicValue(topic);
        void context.updateTopic(topic);
    };

    const getDerivedStyleForName = () => {
        const active = !topic.isActive ? styles.isDeactivated : "";
        const manage = isDeleting || isUpdating ? styles.isManaging : "";
        return `${active} ${manage} ${styles.topicItemLabel}`;
    };

    return (
        <div className={styles.topicContainer}>
            <div className={styles.topicItem}>
                <p className={getDerivedStyleForName()}>{topic.name}</p>
                <TopicItemToolbar
                    topic={topic}
                    onUpdate={selectOpenUpdateManager}
                    onActivate={toggleActivateTopic}
                    onDeactivate={toggleActivateTopic}
                    onDelete={selectOpenDeleteManager}
                />
            </div>
            {isUpdating && (
                <div className={styles.updateContainer}>
                    <Input
                        inputType={"text"}
                        defaultValue={topic.name}
                        onChange={handleSetCurrentTopicValue}
                    />
                    <div className={styles.topicUpdateBtnContainer}>
                        <CancelButton
                            text={t("teacherDashboard.cancelUpdate")}
                            onClick={() => {
                                setIsUpdating(false);
                            }}
                        />
                        <SaveButton
                            text={t("teacherDashboard.saveUpdate")}
                            onClick={handleUpdate}
                        />
                    </div>
                </div>
            )}
            {isDeleting && (
                <div className={styles.deleteContainer}>
                    <p className={styles.topicItemLabel}>
                        {t("teacherDashboard.questionDelete")}{" "}
                        {`'${topic.name}'`} ?
                    </p>
                    <div className={styles.topicDeleteBtnContainer}>
                        <CancelButton
                            text={t("teacherDashboard.cancelDelete")}
                            onClick={() => {
                                setIsDeleting(false);
                            }}
                        />
                        <DeleteButton
                            text={t("teacherDashboard.confirmDelete")}
                            onClick={handleDelete}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
