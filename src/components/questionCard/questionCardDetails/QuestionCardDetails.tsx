import { useState } from "react";
import { QuestionHeader, QuestionCardMiddle, QuestionCardBottom } from "..";
import { IQuestion } from "../../../utils";
import styles from "../QuestionCard.module.css";
import { useDelete, useQAContext } from "../../../hooks";
import { BASE_URL, HOME_ROUTE, QUESTION_URL } from "../../../data";
import { useNavigate } from "react-router";

export function QuestionCardDetails(data: IQuestion) {
    const {
        authContext: { username },
    } = useQAContext();
    const { deleteRequest } = useDelete();
    const [isHiddenOptimistic, setIsHiddenOptimistic] = useState(data.isHidden);
    const navigate = useNavigate();
    const handleDeleteClick = async () => {
        //TODO handle error
        await deleteRequest(`${BASE_URL}${QUESTION_URL}/${data.id}`);
        await navigate(HOME_ROUTE);
    };

    return (
        <>
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
                    handleDeleteClick={() => void handleDeleteClick()}
                    questionId={data.id}
                    isPostedByUser={username === data.userName}
                    tags={data.tags}
                    isHiddenOptimistic={isHiddenOptimistic}
                />
            </div>
        </>
    );
}
