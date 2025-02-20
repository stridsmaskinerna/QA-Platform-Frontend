import { QuestionCardDetails } from "../questionCard/questionCardDetails/QuestionCardDetails";
import { IDetailedQuestion } from "../../utils";
import styles from "./QuestionDetailsViewer.module.css";
import { AnswerCard } from "../answerCard";
import { RouteButton } from "../button";
import { useRoles } from "../../hooks";
import { GUEST_HOME_ROUTE, HOME_ROUTE } from "../../data";
import { useTranslation } from "react-i18next";

interface QuestionDetailsViewerProps {
    question: IDetailedQuestion;
}

export function QuestionDetailsViewer({
    question,
}: QuestionDetailsViewerProps) {
    const { isUser } = useRoles();
    const { t } = useTranslation();
    return (
        <div className={styles.container}>
            <div className={styles.backBtn}>
                <RouteButton
                    text={`${t("backToQA")}`}
                    routeTo={isUser ? HOME_ROUTE : GUEST_HOME_ROUTE}
                />
            </div>
            <QuestionCardDetails
                isHideable={question.isHideable}
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
