import { createContext, useContext } from "react";
import { IQuestion, ISubject, ITopic, ITopicForCreation } from "../../../utils";

export interface ITeacherDashboardContext {
    selectedSubject: ISubject | null;
    subjects: ISubject[];
    questions: IQuestion[];
    createTopic: (topic: ITopicForCreation) => Promise<void>;
    updateTopic: (topic: ITopic) => Promise<void>;
    deleteTopic: (topic: ITopic) => Promise<void>;
    updateSelectedSubject: (subject: ISubject) => void;
    updateSubjects: (subjects: ISubject[]) => void;
    fetchTeacherSubjects: () => Promise<void>;
    fetchQuestionDetails: (subject: ISubject) => Promise<void>;
    isLoading: () => boolean;
    loaderRef: (node?: Element | null) => void;
    hasMore: boolean;
    totalItemCount: number | undefined;
    handleDeleteQuestion: (id: string) => Promise<void>;
}

export const TeacherDashboardContext = createContext<ITeacherDashboardContext>(
    {} as ITeacherDashboardContext,
);

export const useTeacherDashboardContext = () => {
    const contextValue = useContext(TeacherDashboardContext);
    if (contextValue == null) {
        throw new Error(
            "useTeacherDashboardContext must be used within a Provider",
        );
    }
    return contextValue;
};
