import { Input } from "../../input";
import addIcon from "../../../assets/icons/add_white.svg";
import styles from "./AddTopic.module.css";

interface IAddTopicProps {
    onCreate: () => void;
}

export function AddTopic({ onCreate }: IAddTopicProps) {

    const selectCreate = () => {
        onCreate();
    };

    return (
        <div className={styles.addContainer}>
            <Input
                inputType={"text"}
                placeHolder="New topic name..." />
            <button
                className={styles.addBtn}
                onClick={selectCreate}>
                <img
                    src={addIcon}
                    alt="Edit"
                    title="Edit"
			    />
                Add Topic
            </button>
        </div>
    );
}
