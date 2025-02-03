import {
    ChangeEventHandler,
    CSSProperties,
    Dispatch,
    ReactElement,
    SetStateAction
} from "react";
import { LoginErrorMessage, RegisterErrorMessage, Role } from ".";

export interface IAuthContext {
    userId: string | undefined;
    username: string | undefined;
    roles: Role[] | undefined;
    login: (
        credentials: ILoginCredentials
    ) => Promise<LoginErrorMessage | void>;
    logout: () => void;
    register: (
        formData: Omit<IRegisterFormData, "confirmPassword">
    ) => Promise<RegisterErrorMessage | void>;
}

export interface IUserDetails {
    username: string;
    userId: string;
    roles: Role[];
}

export interface ITokens {
    accessToken: string;
    refreshToken: string;
}

export interface ILoginCredentials {
    email: string;
    password: string;
}

export interface IRegisterFormData {
    email: string;
    password: string;
    confirmPassword: string;
    username: string;
}

export interface IRoleBasedRedirect {
    allowedRoles: Role[];
    fallbackRoute: string;
}

export interface ITab {
    title: string;
    content: ReactElement;
    contentContainerStyle?: CSSProperties;
    btnStyle?: CSSProperties;
}

export interface IAuthErrorResponse {
    detail: string;
}

export interface ILoaderContext {
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export interface IQuestion {
    id: string;
    topicName: string;
    topicId: string;
    subjectId: string;
    subjectName: string;
    subjectCode: string;
    userName: string;
    title: string;
    created: string;
    isResolved: boolean;
    isProtected: boolean;
    isHidden: boolean;
    answerCount: number;
    tags: string[];
    userId: string;
}

export interface ISearchBarProps {
    onInputChange: ChangeEventHandler<HTMLInputElement>;
    defaultValue?: string;
    placeholder?: string;
}

export interface ISearchFilter {
    displayedFilters: { title: string; id: string }[];
    onFilterClick: (id: string) => void;
    activeFilter: string;
    title?: string;
}

export interface ISearchWithFiltersProps extends ISearchBarProps {
    subjectFilter: ISearchFilter;
    topicFilter: ISearchFilter;
    isLoadingQuestions: boolean;
}

export interface IQuestionCardProps {
    data: IQuestion;
}

export interface IQuestionCardListProps {
    data: IQuestionCardProps[];
}
