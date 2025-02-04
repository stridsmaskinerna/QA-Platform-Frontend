import { Input } from "../..";
import { ISearchBarProps } from "../../../utils";

export function SearchBar({
    onInputChange,
    defaultValue,
    placeholder,
}: ISearchBarProps) {
    return (
        <Input
            onChange={onInputChange}
            defaultValue={defaultValue}
            inputName="searchBar"
            inputType="search"
            placeHolder={placeholder}
        />
    );
}
