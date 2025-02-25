import { QuestionCardDetails } from "../questionCard/questionCardDetails/QuestionCardDetails";
import { IAnswer, IDetailedQuestion } from "../../utils";
import styles from "./QuestionDetailsViewer.module.css";
import { AnswerCard } from "../answerCard";

import { useQAContext } from "../../hooks";
import { GoBackButton } from "..";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ANSWER_URL, BASE_URL } from "../../data";
import { usePUT } from "../../hooks";

interface QuestionDetailsViewerProps {
    question: IDetailedQuestion;
}

export function QuestionDetailsViewer({
    question,
}: QuestionDetailsViewerProps) {
    const { t } = useTranslation();
    const { putRequest, isLoading, error } = usePUT<void>();

    const {
        authContext: { username },
    } = useQAContext() || { authContext: { username: null } };

    const [answers, setAnswers] = useState<IAnswer[]>(question.answers);

    const handleMarkAsSolved = async (answerId: string) => {
        try {
            await putRequest(
                `${BASE_URL}${ANSWER_URL}/${answerId}/toggle-accepted`,
            );

            setAnswers(prevAnswers =>
                prevAnswers.map(answer =>
                    answer.id === answerId
                        ? { ...answer, isAccepted: !answer.isAccepted }
                        : { ...answer, isAccepted: false },
                ),
            );
        } catch (error) {
            console.error("Failed to update answer status:", error);
        }
    };

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
            <ul className={styles.container}>
                {answers.map(answer => (
                    <AnswerCard
                        key={answer.id}
                        data={answer}
                        isOwner={!!username && username === question.userName}
                        questionId={question.id}
                        onMarkAsSolved={() => {
                            void handleMarkAsSolved(answer.id);
                        }}
                    />
                ))}
            </ul>
        </div>
    );
}
