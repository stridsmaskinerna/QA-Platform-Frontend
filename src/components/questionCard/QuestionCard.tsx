import styles from "./QuestionCard.module.css";
import { QuestionHeader, QuestionCardMiddle, QuestionCardBottom } from ".";
import { IQuestion } from "../../utils";
import {
    QUESTION_DETAILS_ROUTE,
    GUEST_QUESTION_DETAILS_ROUTE,
} from "../../data";
import { Link } from "react-router";
import { useRoles } from "../../hooks/useRoles";
import { useState } from "react";

interface IQuestionCardProps {
    data: IQuestion;
    isPostedByUser: boolean;
    handleDeleteClick: () => void;
}

export function QuestionCard({
    data,
    isPostedByUser,
    handleDeleteClick,
}: IQuestionCardProps) {
    const { isUser, isTeacher } = useRoles();
    const [isHiddenOptimistic, setIsHiddenOptimistic] = useState(data.isHidden);
    const questionLink =
        isUser || isTeacher
            ? `${QUESTION_DETAILS_ROUTE}${data.id}`
            : `${GUEST_QUESTION_DETAILS_ROUTE}${data.id}`;

    return (
        <div className={styles.container}>
            <QuestionHeader
                isProtected={data.isProtected}
                isResolved={data.isResolved}
                subjectCode={data.subjectCode}
                subjectName={data.subjectName}
                isHideable={data.isHideable}
                id={data.id}
                isHiddenOptimistic={isHiddenOptimistic}
                setIsHiddenOptimistic={setIsHiddenOptimistic}
            />
            <Link
                to={questionLink}
                className={styles.link}
            >
                <QuestionCardMiddle
                    isHiddenOptimistic={isHiddenOptimistic}
                    title={data.title}
                    created={data.created}
                    username={data.userName}
                    answerCount={data.answerCount}
                    topicName={data.topicName}
                />
            </Link>
            <QuestionCardBottom
                questionId={data.id}
                handleDeleteClick={handleDeleteClick}
                isPostedByUser={isPostedByUser}
                isHiddenOptimistic={isHiddenOptimistic}
                tags={data.tags}
            />
        </div>
    );
}
