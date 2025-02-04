import styles from "./QuestionCard.module.css";

import { QuestionHeader } from ".";
import { QuestionCardMiddle } from "./questionCardMiddle/QuestionCardMiddle";
import QuestionCardBottom from "./questionCardBottom/QuestionCardBottom";
import { IQuestion } from "../../utils";

interface IQuestionCardProps {
    data: IQuestion;
}

export function QuestionCard({ data }: IQuestionCardProps) {
    return (
        <div className={styles.container}>
            <QuestionHeader
                isHidden={data.isHidden}
                isProtected={data.isProtected}
                isResolved={data.isResolved}
                subjectCode={data.subjectCode}
                subjectName={data.subjectName}
            />
            <QuestionCardMiddle
                title={data.title}
                created={data.created}
                username={data.userName}
                answerCount={data.answerCount}
                topicName={data.topicName}
            />
            <QuestionCardBottom tags={data.tags} />
        </div>
    );
}
