import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useFetchData } from "../../../hooks/Http/useFetchData";
import { IDetailedQuestion } from "../../../utils";
import { BASE_URL, PUBLIC_URL, QUESTION_URL } from "../../../data";
import { QuestionDetailsViewer } from "../../../components";
import styles from "../questionDetailsShared.module.css";

export function QuestionDetailsLimited() {
    const { questionId } = useParams();
    const [question, setQuestion] = useState<IDetailedQuestion>();

    const { requestHandler, isLoading, error } =
        useFetchData<IDetailedQuestion>();

    useEffect(() => {
        console.log(`${BASE_URL}${QUESTION_URL}${PUBLIC_URL}/${questionId}`);
        const fetchQuestionDetails = async () => {
            const data = await requestHandler(
                `${BASE_URL}${QUESTION_URL}${PUBLIC_URL}/${questionId}`,
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
