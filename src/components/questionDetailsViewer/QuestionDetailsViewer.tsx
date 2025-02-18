import { QuestionCardDetails } from "../questionCard/questionCardDetails/QuestionCardDetails";
import { IDetailedQuestion } from "../../utils";
import styles from "./QuestionDetailsViewer.module.css";
import { AnswerCard } from "../answerCard";

interface QuestionDetailsViewerProps {
    question: IDetailedQuestion;
}

export function QuestionDetailsViewer({
    question,
}: QuestionDetailsViewerProps) {
    return (
        <div className={styles.container}>
            <QuestionCardDetails
                id={question.id}
                title={question.title}
                description={question.description}
                topicName={question.topicName}
                topicId={question.topicId}
                subjectId={question.subjectId}
                subjectName={question.subjectName}
                subjectCode={question.subjectCode}
                userName={question.userName}
                created={question.created}
                isResolved={question.isResolved}
                isProtected={question.isProtected}
                isHidden={question.isHidden}
                answerCount={question.answerCount}
                tags={question.tags}
                userId={question.userId}
            />
            <h2>Answers</h2>
            <ul className={styles.container}>
                {question.answers.map(answer => (
                    <AnswerCard
                        key={answer.id}
                        data={answer}
                    />
                ))}
            </ul>
        </div>
    );
}
