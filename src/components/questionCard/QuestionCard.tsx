import styles from "./QuestionCard.module.css";

import { QuestionHeader } from ".";
import { QuestionCardMiddle } from "./questionCardMiddle/QuestionCardMiddle";
import QuestionCardBottom from "./questionCardBottom/QuestionCardBottom";
import { IQuestionCardProps } from "../../utils";

export function QuestionCard({ data }: IQuestionCardProps) {
    return (
        <div className={styles.container}>
            <QuestionHeader data={data} />
            <QuestionCardMiddle data={data} />
            <QuestionCardBottom data={data} />
        </div>
    );
}
