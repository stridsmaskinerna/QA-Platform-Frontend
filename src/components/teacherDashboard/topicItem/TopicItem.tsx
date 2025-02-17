import { useTranslation } from "react-i18next";

import { ITopic } from "../../../utils";
import removeIcon from "../../../assets/icons/removeX.svg";
import editIcon from "../../../assets/icons/edit.svg";
import styles from "./TopicItem.module.css";
import { useState } from "react";
import { Input } from "../../input";
import { CancelButton, SaveButton } from "../../button";
import { useTeacherDashboardContext } from "../context";

interface ITopicItemProps {
    topic: ITopic;
}

export function TopicItem({ topic }: ITopicItemProps) {
    const context = useTeacherDashboardContext();
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [updatedTopic, setUpdatedTopic] = useState({ ...topic });

    const handleEdit = () => {
        void context.updateTopic(updatedTopic).then(() => {
            setIsUpdating(false);
        });
    };

    const handleCancelEdit = () => {
        setIsUpdating(false);
    };

    // const delete = () => {
    //     console.log(topic);
    //     setIsEditing(prev => !prev);
    //     setIsDeleting(false);
    // };

    const handleSetUpdatedTopic = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedTopic(prev => {
            return { ...prev, name: e.target.value };
        });
    };

    const selectManageEdit = () => {
        setIsUpdating(prev => !prev);
        setIsDeleting(false);
    };

    const selectManageDelete = () => {
        setIsDeleting(prev => !prev);
        setIsUpdating(false);
    };

    return (
        <div className={styles.topicContainer}>
            <div className={styles.topicItem}>
                <p className={isUpdating ? styles.editTopic : ""}>
                    {topic.name}
                </p>

                <TopicItemToolbar
                    topic={topic}
                    onUpdate={selectManageEdit}
                    onDelete={selectManageDelete}
                />
                {isDeleting}
            </div>
            {isUpdating && (
                <div className={styles.editContainer}>
                    <Input
                        inputType={"text"}
                        defaultValue={topic.name}
                        onChange={handleSetUpdatedTopic}
                    />
                    <div className={styles.toolbarEditContainer}>
                        <CancelButton
                            text={"Cancel"}
                            onClick={handleCancelEdit}
                        />
                        <SaveButton
                            text={"Save"}
                            onClick={handleEdit}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

interface ITopicItemToolbarProps {
    topic: ITopic;
    onUpdate: (topic: ITopic) => void;
    onDelete: (topic: ITopic) => void;
}

function TopicItemToolbar({
    topic,
    onUpdate,
    onDelete,
}: ITopicItemToolbarProps) {
    const { t } = useTranslation();

    const selectUpdate = (topic: ITopic) => {
        onUpdate(topic);
    };

    const selectDelete = (topic: ITopic) => {
        onDelete(topic);
    };

    return (
        <div className={styles.toolbarContainer}>
            <img
                onClick={() => {
                    selectUpdate(topic);
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
