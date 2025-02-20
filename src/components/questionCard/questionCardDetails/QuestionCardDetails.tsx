import { useState } from "react";
import { QuestionHeader, QuestionCardMiddle, QuestionCardBottom } from "..";
import { IQuestion } from "../../../utils";
import styles from "../QuestionCard.module.css";

export function QuestionCardDetails(data: IQuestion) {
    const [isHiddenOptimistic, setIsHiddenOptimistic] = useState(data.isHidden);
    return (
        <div className={styles.container}>
            <QuestionHeader
                setIsHiddenOptimistic={setIsHiddenOptimistic}
                isHiddenOptimistic={isHiddenOptimistic}
                isHideable={data.isHideable}
                isProtected={data.isProtected}
                isResolved={data.isResolved}
                subjectCode={data.subjectCode}
                subjectName={data.subjectName}
                id={data.id}
            />
            <QuestionCardMiddle
                isHiddenOptimistic={isHiddenOptimistic}
                title={data.title}
                created={data.created}
                username={data.userName}
                topicName={data.topicName}
                description={data.description}
            />
            <QuestionCardBottom
                tags={data.tags}
                isHiddenOptimistic={isHiddenOptimistic}
            />
        </div>
    );
}
