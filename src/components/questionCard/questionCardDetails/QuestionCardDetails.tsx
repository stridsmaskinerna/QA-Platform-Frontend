import { QuestionHeader, QuestionCardMiddle, QuestionCardBottom } from "..";
import { IQuestion } from "../../../utils";
import styles from "../QuestionCard.module.css";

export function QuestionCardDetails(data: IQuestion) {
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
                topicName={data.topicName}
                description={data.description}
            />
            <QuestionCardBottom tags={data.tags} />
        </div>
    );
}
