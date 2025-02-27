import { ChangeEventHandler } from "react";

export interface ISearchBarProps {
    onInputChange: ChangeEventHandler<HTMLInputElement>;
    defaultValue?: string;
    placeholder?: string;
}
