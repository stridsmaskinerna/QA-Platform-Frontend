import { ReactNode, useState } from "react";

import {
    IQuestionDetailsViewerContext,
    QuestionDetailsViewerContext,
} from "../context";
import { useDELETE, usePOST, usePUT } from "../../../hooks";
import {
    IAnswer,
    IAnswerForCreation,
    IAnswerForPut,
    IDetailedQuestion,
} from "../../../utils";
import { ANSWER_URL, BASE_URL } from "../../../data";
import { ErrorModal } from "../../modal";

interface IQuestionDetailsViewProviderProps {
    question: IDetailedQuestion;
    children: ReactNode;
}

export function QuestionDetailsViewProvider({
    question,
    children,
}: IQuestionDetailsViewProviderProps) {
    const [currentAnswers, setCurrentAnswers] = useState(question.answers);
    const [editingAnswer, setEditingAnswer] = useState<IAnswer | null>(null);
    const deletAnswerReq = useDELETE<void>();
    const putAnswerReq = usePUT<void>();
    const postAnswerReq = usePOST<void>();

    const createAnswer = async (answer: IAnswerForCreation) => {
        const { error } = await postAnswerReq.postRequestWithError(
            `${BASE_URL}${ANSWER_URL}`,
            answer,
        );

        if (error) {
            return;
        }

        // TODO! Update to more clean solution;
        window.location.reload();
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
        console.log("answer", answer);

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

        setCurrentAnswers(prev =>
            prev.map(a => (a.id == answer.id ? answer : a)),
        );
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

    const getContext = (): IQuestionDetailsViewerContext => {
        return {
            question,
            currentAnswers,
            editingAnswer,
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
        <QuestionDetailsViewerContext.Provider value={getContext()}>
            <ErrorModal
                errors={[
                    deletAnswerReq.error,
                    postAnswerReq.error,
                    putAnswerReq.error,
                ]}
                onClearErrors={clearErrors}
            />
            {children}
        </QuestionDetailsViewerContext.Provider>
    );
}
