import {
    ChangeEventHandler,
    CSSProperties,
    Dispatch,
    HTMLInputTypeAttribute,
    ReactElement,
    SetStateAction,
} from "react";
import { LoginErrorMessage, RegisterErrorMessage, Role } from ".";
import { IQuestion } from ".";

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
    tabBtnClickSideEffect?: () => void;
}

export interface IAuthErrorResponse {
    detail: string;
}

export interface ILoaderContext {
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
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
    shouldShowFilters: IShouldShowFilters;
}

export interface IQuestionCardProps {
    data: IQuestion;
}

export interface IQuestionCardListProps {
    data: IQuestionCardProps[];
}

export interface IShouldShowFilters {
    subject: boolean;
    topic: boolean;
}

export interface ITeacher {
    id: string;
    email: string;
    userName: string;
}

export interface ITopic {
    id: string;
    name: string;
    isActive: boolean;
    subjectId: string;
}

export interface ITopicForCreation {
    name: string;
    subjectId: string;
}

export interface ISubject {
    id: string;
    name: string;
    subjectCode?: string;
    teachers?: ITeacher[];
    topics: ITopic[];
}

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

export interface ISuggestion {
    name: string;
    id: string;
}

export interface IOption {
    id: string;
    name: string;
}

export interface ITag {
    id: string;
    value: string;
}
