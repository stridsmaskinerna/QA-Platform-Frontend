import { QuestionCard } from "../../components";
import styles from "./HomeLimited.module.css";

import dummy_question from "../../data/json/dummy_question.json";

export function HomeLimited() {
    return (
        <div className={styles.card_container}>
            <QuestionCard data={dummy_question} />
        </div>
    );
}
