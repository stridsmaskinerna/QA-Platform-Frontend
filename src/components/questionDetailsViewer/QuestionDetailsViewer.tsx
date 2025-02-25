import { useTranslation } from "react-i18next";

import { QuestionDetailsProvider } from "./provider";
import { QuestionCardDetails } from "../questionCard/questionCardDetails/QuestionCardDetails";
import { IDetailedQuestion } from "../../utils";
import { AnswerCard } from "../answerCard";
import { GoBackButton } from "..";
import { AnswerCreator } from "./answerCreator";
import styles from "./QuestionDetailsViewer.module.css";
import { ReactNode } from "react";
import { useQuestionDetailsContext } from "./context";

interface QuestionDetailsViewerProps {
    question: IDetailedQuestion;
    children?: ReactNode;
}

export function QuestionDetailsViewer({
    question,
}: QuestionDetailsViewerProps) {
    return (
        <QuestionDetailsProvider question={question}>
            <QuestionDetailsViewerInner />
        </QuestionDetailsProvider>
    );
}

export function QuestionDetailsViewerInner() {
    const { t } = useTranslation();
    const { question, currentAnswers } = useQuestionDetailsContext();

    return (
        <div className={styles.container}>
            <div className={styles.backBtn}>
                <GoBackButton text={`${t("backToQA")}`} />
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
            <AnswerCreator questionId={question.id} />
            <ul className={styles.container}>
                {currentAnswers.map(answer => (
                    <AnswerCard
                        key={answer.id}
                        data={answer}
                    />
                ))}
            </ul>
        </div>
    );
}
