import { useState } from "react";
import { useFetchWithToken } from "../../../hooks";
import { useParams } from "react-router";
import { IDetailedQuestion } from "../../../utils";
import { useEffect } from "react";
import { BASE_URL, QUESTION_DETAILS_ROUTE } from "../../../data";
import styles from "../questionDetailsShared.module.css";
import { QuestionDetailsViewer } from "../../../components";

export function QuestionDetailsExtended() {
    const { questionId } = useParams();
    const [question, setQuestion] = useState<IDetailedQuestion>();

    const { requestHandler, isLoading, error } =
        useFetchWithToken<IDetailedQuestion>();

    useEffect(() => {
        const fetchQuestionDetails = async () => {
            const data = await requestHandler(
                `${BASE_URL}${QUESTION_DETAILS_ROUTE}${questionId}`,
            );

            if (data) setQuestion(data);
        };
        void fetchQuestionDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questionId]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!question) return <div>No question found.</div>;

    return (
        <div className={styles.container}>
            <QuestionDetailsViewer question={question} />
        </div>
    );
}
