import { IQuestion } from "../../utils";
import { Loader } from "..";
import { QuestionCard } from "../questionCard/QuestionCard";
import styles from "./QuestionCardList.module.css";

interface IQuestionCardListProps {
    data: IQuestion[];
    isLoadingQuestions: boolean;
}

export function QuestionCardList({
    data,
    isLoadingQuestions
}: IQuestionCardListProps) {
    if (isLoadingQuestions) {
        return (
            <div className={styles.container}>
                <div className={styles.loader}>
                    <Loader />
                </div>
            </div>
        );
    }

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
