import {
    ChangeEventHandler,
    CSSProperties,
    Dispatch,
    HTMLInputTypeAttribute,
    ReactElement,
    SetStateAction,
} from "react";
import { LoginErrorMessage, RegisterErrorMessage } from "./types";
import { Role } from "../enums";

// TODO! Move to AuthContext
export interface IAuthContext {
    userId: string | undefined;
    username: string | undefined;
    roles: Role[] | undefined;
    login: (
        credentials: ILoginCredentials,
    ) => Promise<LoginErrorMessage | void>;
    logout: () => void;
    register: (
        formData: Omit<IRegisterFormData, "confirmPassword">,
    ) => Promise<RegisterErrorMessage | void>;
    isLoading: boolean;
    isLoggedIn: boolean;
}

// TODO! DTO
export interface IProblemDetail {
    status: number;
    title: string;
    detail: string | undefined;
}

// TODO! Move to AUTH; Part of Token payload
export interface IUserDetails {
    username: string;
    userId: string;
    roles: Role[];
}

// Token! Move to AUTH
export interface ITokens {
    accessToken: string;
    refreshToken: string;
}

// Move to AUTH
export interface ILoginCredentials {
    email: string;
    password: string;
}

// Move to AUTH
export interface IRegisterFormData {
    email: string;
    password: string;
    confirmPassword: string;
    username: string;
}

// TODO! Move to AUTH or AuthGuard component
export interface IRoleBasedRedirect {
    allowedRoles: Role[];
    fallbackRoute: string;
}

// TODO! UI
export interface ITab {
    title: string;
    content: ReactElement;
    contentContainerStyle?: CSSProperties;
    btnStyle?: CSSProperties;
    tabBtnClickSideEffect?: () => void;
}

// TODO! Move to AUTH
export interface IAuthErrorResponse {
    detail: string;
}

// TODO! Move to I Loader context
export interface ILoaderContext {
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

// TODO! Move to component
export interface ISearchBarProps {
    onInputChange: ChangeEventHandler<HTMLInputElement>;
    defaultValue?: string;
    placeholder?: string;
}

// TODO! Move to component
export interface ISearchFilter {
    displayedFilters: { title: string; id: string }[];
    onFilterClick: (id: string) => void;
    activeFilter: string;
    title?: string;
}

// TODO! Move to component
export interface ISearchWithFiltersProps extends ISearchBarProps {
    subjectFilter: ISearchFilter;
    topicFilter: ISearchFilter;
    isLoadingQuestions: boolean;
    shouldShowFilters: IShouldShowFilters;
}

// TODO! Not used ???
// export interface IQuestionCardProps {
//     data: IQuestion;
// }

// // TODO! Not used ???
// export interface IQuestionCardListProps {
//     data: IQuestionCardProps[];
// }

// TODO! MOve to hook
export interface IShouldShowFilters {
    subject: boolean;
    topic: boolean;
}

// TODO! Not used ???
export interface ITeacher {
    id: string;
    email: string;
    userName: string;
}

// Todo DTO
export interface ITopic {
    id: string;
    name: string;
    isActive: boolean;
    subjectId: string;
}

// TODO! DTO
export interface ITopicForCreation {
    name: string;
    subjectId: string;
}

// TODO! DTO
export interface ISubject {
    id: string;
    name: string;
    subjectCode?: string;
    teachers?: ITeacher[];
    topics: ITopic[];
}

// TODO! DTO
export interface ISubjectForPut {
    id: string;
    name: string;
    subjectCode?: string;
    teachers: string[];
}

// TODO! UI
export interface IInputProps {
    required?: boolean;
    inputType: HTMLInputTypeAttribute;
    inputName?: string;
    label?: string;
    minInputValueLength?: number;
    placeHolder?: string;
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    defaultValue?: string;
    labelStyle?: CSSProperties;
    children?: ReactElement;
    onBlur?: () => void;
    onFocus?: () => void;
    inputValue?: string;
}

// TODO! UI
export interface ISuggestion {
    name: string;
    id: string;
}

// TODO! UI
export interface IOption {
    id: string;
    name: string;
}

// TODO! DTO
export interface ITag {
    id: string;
    value: string;
}

// TODO! Not used ???
export interface IRichTextEditorHandle {
    clearEditor: () => void;
}
