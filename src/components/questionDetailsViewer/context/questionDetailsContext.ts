import { createContext, useContext } from "react";
import { IAnswer, IAnswerForCreation, IDetailedQuestion } from "../../../utils";

export interface IQuestionDetailsContext {
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

export const QuestionDetailsContext =
    createContext<IQuestionDetailsContext | null>(null);

export const useQuestionDetailsContext = () => {
    const contextValue = useContext(QuestionDetailsContext);
    if (contextValue == null) {
        throw new Error(
            "useQuestionDetailsContext must be used within a Provider",
        );
    }
    return contextValue;
};
