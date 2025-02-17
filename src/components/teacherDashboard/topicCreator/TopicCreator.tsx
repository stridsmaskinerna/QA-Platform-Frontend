import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Input } from "../../input";
import addIcon from "../../../assets/icons/add_white.svg";
import styles from "./TopicCreator.module.css";
import { useTeacherDashboardContext } from "../context";
import { ITopic } from "../../../utils";

export function TopicCreator() {
    const { t } = useTranslation();
    const context = useTeacherDashboardContext();
    const [topic, setTopic] = useState<ITopic>({
        id: "",
        isActive: true,
        subjectId: context.selectedSubject?.id ?? "",
        name: "",
    });

    const handleSelectCreate = () => {
        void context.createTopic(topic);
    };

    const handleSetTopic = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTopic(prev => {
            return { ...prev, name: e.target.value };
        });
    };

    return (
        <div className={styles.addContainer}>
            <Input
                inputType={"text"}
                placeHolder={t("teacherDashboard.newTopicPlacholder")}
                onChange={handleSetTopic}
            />
            <button
                className={styles.addBtn}
                onClick={handleSelectCreate}
            >
                <img
                    src={addIcon}
                    alt="Add"
                />
                {t("teacherDashboard.createNewTopic")}
            </button>
        </div>
    );
}
