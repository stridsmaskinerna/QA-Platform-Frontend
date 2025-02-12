import styles from "./QuestionCard.module.css";
import { QuestionHeader } from ".";
import { QuestionCardMiddle } from "./questionCardMiddle/QuestionCardMiddle";
import QuestionCardBottom from "./questionCardBottom/QuestionCardBottom";
import { IQuestion } from "../../utils";
import {
    QUESTION_DETAILS_ROUTE,
    GUEST_QUESTION_DETAILS_ROUTE,
} from "../../data";
import { Link } from "react-router";
import { useRoles } from "../../hooks/useRoles";

interface IQuestionCardProps {
    data: IQuestion;
}

export function QuestionCard({ data }: IQuestionCardProps) {
    const { isUser, isTeacher } = useRoles();

    const questionLink =
        isUser || isTeacher
            ? `${QUESTION_DETAILS_ROUTE}${data.id}`
            : `${GUEST_QUESTION_DETAILS_ROUTE}${data.id}`;

    return (
        <div className={styles.container}>
            <QuestionHeader
                isHidden={data.isHidden}
                isProtected={data.isProtected}
                isResolved={data.isResolved}
                subjectCode={data.subjectCode}
                subjectName={data.subjectName}
            />
            <Link
                to={questionLink}
                className={styles.link}
            >
                <QuestionCardMiddle
                    title={data.title}
                    created={data.created}
                    username={data.userName}
                    answerCount={data.answerCount}
                    topicName={data.topicName}
                />
            </Link>
            <QuestionCardBottom tags={data.tags} />
        </div>
    );
}
