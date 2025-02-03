import { IQuestion } from "../../utils";
import { QuestionCard } from "../questionCard/QuestionCard";
import styles from "./QuestionCardList.module.css";

interface IQuestionCardListProps {
    data: IQuestion[];
}

export function QuestionCardList({ data }: IQuestionCardListProps) {
    return (
        <div className={styles.container}>
            {data.map(question => (
                <QuestionCard
                    key={question.id}
                    {...question}
                />
            ))}
        </div>
    );
}
