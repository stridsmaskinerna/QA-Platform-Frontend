import { useState } from "react";
import { useFetchWithToken } from "../../../hooks";
import { useParams } from "react-router";
import { IDetailedQuestion } from "../../../utils";
import { useEffect } from "react";
import { BASE_URL, QUESTION_DETAILS_ROUTE } from "../../../data";

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
        <div>
            <h1>{question.title}</h1>
            <p>{question.description}</p>
            <h2>Answers</h2>
            <ul>
                {question.answers.map(answer => (
                    <li key={answer.id}>
                        <strong>{answer.userName}:</strong> {answer.value}
                    </li>
                ))}
            </ul>
        </div>
    );
}
