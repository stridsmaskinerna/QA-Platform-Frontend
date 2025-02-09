import { ChangeEventHandler, useEffect, useState } from "react";
import { IInputProps, ISuggestion } from "../../utils";
import { Input } from ".";
import styles from "./InputWithPrefetchedSuggestions.module.css";

interface IInputWithPrefetchedSuggestionsProps
    extends Omit<IInputProps, "children"> {
    possibleSuggestions: ISuggestion[];
    onSuggestionClick: (arg: ISuggestion) => void;
}

let hideSuggestionsTimeout: NodeJS.Timeout;

export function InputWithPrefetchedSuggestions(
    props: IInputWithPrefetchedSuggestionsProps,
) {
    const [displayedSuggestions, setDisplayedSuggestions] = useState<
        typeof props.possibleSuggestions
    >([]);
    const [inputValue, setInputValue] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleSuggestionClick = ({ id, name }: ISuggestion) => {
        setInputValue(name);
        setDisplayedSuggestions([]);
        setShowSuggestions(false);
        props.onSuggestionClick({ id, name });
    };

    const handleOnChange: ChangeEventHandler<HTMLInputElement> = e => {
        const value = e.target.value;
        setInputValue(value);
        updateDisplayedSuggestions(value);
    };

    const updateDisplayedSuggestions = (value: string) => {
        const suggestions = !value
            ? []
            : props.possibleSuggestions
                  .filter(s =>
                      s.name.toLowerCase().includes(value.toLowerCase()),
                  )
                  .slice(0, 10);
        if (suggestions.length) {
            setDisplayedSuggestions(suggestions);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
            hideSuggestionsTimeout = setTimeout(() => {
                setDisplayedSuggestions([]);
            }, 500);
        }
    };

    useEffect(() => {
        return () => {
            clearTimeout(hideSuggestionsTimeout);
        };
    }, []);

    return (
        <Input
            inputValue={inputValue}
            inputName={props.inputName}
            inputType={props.inputType}
            defaultValue={props.defaultValue}
            minInputValueLength={props.minInputValueLength}
            label={props.label}
            labelStyle={props.labelStyle}
            onChange={handleOnChange}
            placeHolder={props.placeHolder}
        >
            <div
                className={`${styles.suggestionsContainer} ${showSuggestions ? styles.showSuggestions : ""}`}
            >
                {displayedSuggestions?.map(s => (
                    <button
                        type="button"
                        onClick={() => handleSuggestionClick(s)}
                        className={styles.suggestionBtn}
                        key={s.id}
                    >
                        {s.name}
                    </button>
                ))}
            </div>
        </Input>
    );
}
