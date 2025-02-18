import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";

import { Input } from "../../input";
import addIcon from "../../../assets/icons/add_white.svg";
import { useTeacherDashboardContext } from "../context";
import { ITopicForCreation } from "../../../utils";
import styles from "./TopicCreator.module.css";

export function TopicCreator() {
    const { t } = useTranslation();
    const context = useTeacherDashboardContext();
    const [topic, setTopic] = useState<ITopicForCreation>({
        subjectId: context.selectedSubject?.id ?? "",
        name: "",
    });

    const handleSelectCreate = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        void context.createTopic(topic);
        setTopic(prev => {
            return { ...prev, name: "" };
        });
    };

    const handleSetTopic = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTopic(prev => {
            return { ...prev, name: e.target.value };
        });
    };

    return (
        <form
            className={styles.addContainer}
            onSubmit={handleSelectCreate}
        >
            <Input
                required
                minInputValueLength={2}
                inputType={"text"}
                inputValue={topic.name}
                placeHolder={t("teacherDashboard.newTopicPlacholder")}
                onChange={handleSetTopic}
            />
            <button
                type="submit"
                className={styles.addBtn}
            >
                <img
                    src={addIcon}
                    alt="Add"
                />
                <span className={styles.addBtnText}>
                    {t("teacherDashboard.createNewTopic")}
                </span>
            </button>
        </form>
    );
}
