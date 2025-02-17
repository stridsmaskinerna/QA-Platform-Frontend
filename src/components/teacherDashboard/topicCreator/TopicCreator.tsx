import { useTranslation } from "react-i18next";

import { Input } from "../../input";
import addIcon from "../../../assets/icons/add_white.svg";
import styles from "./TopicCreator.module.css";

interface ITopicCreatorProps {
    onCreate: () => void;
}

export function TopicCreator({ onCreate }: ITopicCreatorProps) {
    const { t } = useTranslation();

    const selectCreate = () => {
        onCreate();
    };

    return (
        <div className={styles.addContainer}>
            <Input
                inputType={"text"}
                placeHolder={t("teacherDashboard.newTopicPlacholder")}
            />
            <button
                className={styles.addBtn}
                onClick={selectCreate}
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
