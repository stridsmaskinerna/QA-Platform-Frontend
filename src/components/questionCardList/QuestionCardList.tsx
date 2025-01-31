import { IQuestionCardListProps } from "../../utils";
import { QuestionCard } from "../questionCard/QuestionCard";
import styles from "./QuestionCardList.module.css";

export function QuestionCardList({ data }: IQuestionCardListProps) {
    return (
        <div className={styles.container}>
            {data.map(props => (
                <QuestionCard data={props.data} />
            ))}
        </div>
    );
}
