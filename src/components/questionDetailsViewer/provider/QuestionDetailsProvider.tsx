import { ReactNode, useRef, useState } from "react";

import { IQuestionDetailsContext, QuestionDetailsContext } from "../context";
import {
    useDELETE,
    useGET,
    usePOST,
    usePUT,
    useQAContext,
} from "../../../hooks";
import {
    IAnswer,
    IAnswerForCreation,
    IAnswerForPut,
    IDetailedQuestion,
} from "../../../utils";
import { ANSWER_URL, BASE_URL, QUESTION_URL } from "../../../data";
import { ErrorModal } from "../../modal";

interface IQuestionDetailsViewProviderProps {
    question: IDetailedQuestion;
    children: ReactNode;
}

export function QuestionDetailsProvider({
    question,
    children,
}: IQuestionDetailsViewProviderProps) {
    const qaContext = useQAContext();
    const deletAnswerReq = useDELETE<void>();
    const putAnswerReq = usePUT<void>();
    const postAnswerReq = usePOST<void>();
    const getQuestionReq = useGET<IDetailedQuestion>();
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [highlightedAnswerId, setHighlightedAnswerId] = useState<
        string | null
    >(null);
    const [currentAnswers, setCurrentAnswers] = useState(question.answers);
    const [editingAnswer, setEditingAnswer] = useState<IAnswer | null>(null);

    const createAnswer = async (answer: IAnswerForCreation) => {
        const postRes = await postAnswerReq.postRequestWithError(
            `${BASE_URL}${ANSWER_URL}`,
            answer,
        );

        if (postRes.error != null) {
            return;
        }

        const getQuestionRes = await getQuestionReq.getRequestWithError(
            `${BASE_URL}${QUESTION_URL}/${question.id}`,
        );

        if (getQuestionReq.error != null) {
            return;
        }

        const updatedAnswers = getQuestionRes.response?.answers ?? [];
        setCurrentAnswers(updatedAnswers);
        markNewComment(updatedAnswers, answer.value);
    };

    const markNewComment = (answers: IAnswer[], answerValue: string) => {
        const newAnswer = answers.find(
            a =>
                a.userName === qaContext.authContext.username &&
                a.value === answerValue,
        );

        if (newAnswer == null) {
            return;
        }

        setHighlightedAnswerId(newAnswer?.id);

        if (timerRef.current != null) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            setHighlightedAnswerId(null);
        }, 10000);
    };

    const deleteAnswer = async (answer: IAnswer) => {
        const { error } = await deletAnswerReq.deleteRequestWithError(
            `${BASE_URL}${ANSWER_URL}/${answer.id}`,
        );

        if (error) {
            return;
        }

        setCurrentAnswers(prev => prev.filter(a => a.id != answer.id));
    };

    const updateAnswer = async (answer: IAnswer) => {
        const answerForPut: IAnswerForPut = {
            value: answer.value,
            filePath: answer.filePath,
        };

        const { error } = await putAnswerReq.putRequestWithError(
            `${BASE_URL}${ANSWER_URL}/${answer.id}`,
            answerForPut,
        );

        if (error) {
            return;
        }

        const updatedAnswers = currentAnswers.map(a =>
            a.id == answer.id ? answer : a,
        );
        setCurrentAnswers(updatedAnswers);
        markNewComment(updatedAnswers, answer.value);
    };

    const updateEditingAnswer = (answer: IAnswer | null) => {
        setEditingAnswer(answer);
    };

    const toggleEditingAnswer = (answer: IAnswer) => {
        setEditingAnswer(prev => (prev?.id === answer.id ? null : answer));
    };

    const isLoading = () => {
        return (
            deletAnswerReq.isLoading ||
            postAnswerReq.isLoading ||
            putAnswerReq.isLoading
        );
    };

    const updateHighlightedAnswerId = (id: string | null) => {
        setHighlightedAnswerId(id);
    };

    const getContext = (): IQuestionDetailsContext => {
        return {
            question,
            currentAnswers,
            editingAnswer,
            highlightedAnswerId,
            updateHighlightedAnswerId,
            updateEditingAnswer,
            toggleEditingAnswer,
            isLoading,
            createAnswer,
            updateAnswer,
            deleteAnswer,
        };
    };

    const clearErrors = () => {
        deletAnswerReq.clearError();
        postAnswerReq.clearError();
        putAnswerReq.clearError();
    };

    return (
        <QuestionDetailsContext.Provider value={getContext()}>
            <ErrorModal
                errors={[
                    deletAnswerReq.error,
                    postAnswerReq.error,
                    putAnswerReq.error,
                ]}
                onClearErrors={clearErrors}
            />
            {children}
        </QuestionDetailsContext.Provider>
    );
}
