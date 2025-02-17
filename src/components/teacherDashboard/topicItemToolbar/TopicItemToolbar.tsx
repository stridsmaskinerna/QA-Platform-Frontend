import { useTranslation } from "react-i18next";

import { ITopic } from "../../../utils";
import removeIcon from "../../../assets/icons/removeX.svg";
import editIcon from "../../../assets/icons/edit.svg";
import checkBlack from "../../../assets/icons/check_black.svg";
import deleteIcon from "../../../assets/icons/delete.svg";
import styles from "./TopicItemToolbar.module.css";

interface ITopicItemToolbarProps {
    topic: ITopic;
    onUpdate: (topic: ITopic) => void;
    onActivate: (topic: ITopic) => void;
    onDeactivate: (topic: ITopic) => void;
    onDelete: (topic: ITopic) => void;
}

export function TopicItemToolbar({
    topic,
    onUpdate,
    onActivate,
    onDeactivate,
    onDelete,
}: ITopicItemToolbarProps) {
    const { t } = useTranslation();

    return (
        <div className={styles.toolbarContainer}>
            <img
                onClick={() => {
                    onUpdate(topic);
                }}
                src={editIcon}
                alt={t("teacherDashboard.edit")}
                title={t("teacherDashboard.edit")}
                className={styles.toolbarIcon}
            />
            {topic.isActive ? (
                <img
                    onClick={() => {
                        onDeactivate(topic);
                    }}
                    src={removeIcon}
                    alt={t("teacherDashboard.deactivate")}
                    title={t("teacherDashboard.deactivate")}
                    className={styles.toolbarIcon}
                />
            ) : (
                <img
                    onClick={() => {
                        onActivate(topic);
                    }}
                    src={checkBlack}
                    alt={t("teacherDashboard.activate")}
                    title={t("teacherDashboard.activate")}
                    className={styles.toolbarIcon}
                />
            )}
            <img
                onClick={() => {
                    onDelete(topic);
                }}
                src={deleteIcon}
                alt={t("teacherDashboard.delete")}
                title={t("teacherDashboard.delete")}
                className={styles.toolbarIcon}
            />
        </div>
    );
}
