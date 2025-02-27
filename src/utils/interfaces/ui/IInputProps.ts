import {
    ChangeEventHandler,
    CSSProperties,
    HTMLInputTypeAttribute,
    ReactElement,
} from "react";

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
