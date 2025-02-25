import { createContext, useContext } from "react";
import { IAnswer, IAnswerForCreation, IDetailedQuestion } from "../../../utils";

export interface IQuestionDetailsViewerContext {
    question: IDetailedQuestion;
    currentAnswers: IAnswer[];
    editingAnswer: IAnswer | null;
    updateEditingAnswer: (answer: IAnswer | null) => void;
    toggleEditingAnswer: (answer: IAnswer) => void;
    isLoading: () => boolean;
    createAnswer: (answer: IAnswerForCreation) => Promise<void>;
    updateAnswer: (topic: IAnswer) => Promise<void>;
    deleteAnswer: (topic: IAnswer) => Promise<void>;
}

export const QuestionDetailsViewerContext =
    createContext<IQuestionDetailsViewerContext | null>(null);

export const useQuestionDetailsViewerContext = () => {
    const contextValue = useContext(QuestionDetailsViewerContext);
    if (contextValue == null) {
        throw new Error(
            "useQuestionDetailsViewerContext must be used within a Provider",
        );
    }
    return contextValue;
};
