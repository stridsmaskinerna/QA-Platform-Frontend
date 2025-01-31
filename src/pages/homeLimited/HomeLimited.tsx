import styles from "./HomeLimited.module.css";

import dummy_question_list from "../../data/json/dummy_question_list.json";
import { QuestionCardList } from "../../components/questionCardList";
import { IQuestionCardProps } from "../../utils";

export function HomeLimited() {
    const formattedData: IQuestionCardProps[] = dummy_question_list.map(q => ({
        data: q
    }));

    return (
        <div className={styles.card_container}>
            <QuestionCardList data={formattedData} />
        </div>
    );
}
