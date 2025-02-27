// UI
import {
    ChangeEventHandler,
    CSSProperties,
    Dispatch,
    HTMLInputTypeAttribute,
    ReactElement,
    SetStateAction,
} from "react";

export type UserInteractionFilter = "created" | "answered" | "commented";

export interface ITab {
    title: string;
    content: ReactElement;
    contentContainerStyle?: CSSProperties;
    btnStyle?: CSSProperties;
    tabBtnClickSideEffect?: () => void;
}

export interface ILoaderContext {
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export interface ISearchWithFiltersProps extends ISearchBarProps {
    subjectFilter: ISearchFilter;
    topicFilter: ISearchFilter;
    isLoadingQuestions: boolean;
    shouldShowFilters: IShouldShowFilters;
}

export interface ISearchFilter {
    displayedFilters: { title: string; id: string }[];
    onFilterClick: (id: string) => void;
    activeFilter: string;
    title?: string;
}

export interface ISearchBarProps {
    onInputChange: ChangeEventHandler<HTMLInputElement>;
    defaultValue?: string;
    placeholder?: string;
}

export interface IShouldShowFilters {
    subject: boolean;
    topic: boolean;
}

export interface ISuggestion {
    name: string;
    id: string;
}

export interface IOption {
    id: string;
    name: string;
}

export interface IInputProps {
    inputType: HTMLInputTypeAttribute;
    required?: boolean;
    inputName?: string;
    label?: string;
    minInputValueLength?: number;
    placeHolder?: string;
    defaultValue?: string;
    labelStyle?: CSSProperties;
    children?: ReactElement;
    inputValue?: string;
    onBlur?: () => void;
    onFocus?: () => void;
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}
