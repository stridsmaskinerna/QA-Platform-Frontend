import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { IInputProps, ISuggestion } from "../../utils";
import { Input } from ".";
import styles from "./InputWithSuggestionsShared.module.css";

interface IInputWithPrefetchedSuggestionsProps
    extends Omit<IInputProps, "children"> {
    possibleSuggestions: ISuggestion[];
    onSuggestionClick?: (arg: ISuggestion) => void;
}

export function InputWithPrefetchedSuggestions(
    props: IInputWithPrefetchedSuggestionsProps,
) {
    const [displayedSuggestions, setDisplayedSuggestions] = useState<
        typeof props.possibleSuggestions
    >([]);
    const [inputValue, setInputValue] = useState(props.defaultValue ?? "");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const blurTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const hideSuggestionsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const handleSuggestionClick = ({ id, name }: ISuggestion) => {
        setInputValue(name);
        hideSuggestions();
        if (props.onSuggestionClick) {
            props.onSuggestionClick({ id, name });
        }
    };

    const handleOnChange: ChangeEventHandler<HTMLInputElement> = e => {
        const value = e.target.value;
        setInputValue(value);
        updateDisplayedSuggestions(value);
        if (props.onChange) {
            props.onChange(e);
        }
    };

    const updateDisplayedSuggestions = (value: string) => {
        const suggestions = !value
            ? []
            : props.possibleSuggestions
                  .filter(s =>
                      s.name.toLowerCase().includes(value.toLowerCase()),
                  )
                  .slice(0, 10);
        //If user has typed in an exact match on one course, then handle it as a suggestionClick
        //i.e set the input and send course info to parent component
        if (
            suggestions.length === 1 &&
            suggestions[0].name.toLowerCase() === value.toLowerCase()
        ) {
            handleSuggestionClick(suggestions[0]);
            return;
        }
        if (suggestions.length) {
            clearTimeout(hideSuggestionsTimeoutRef.current ?? undefined);
            setDisplayedSuggestions(suggestions);
            setShowSuggestions(true);
        } else {
            hideSuggestions();
        }
    };

    const onBlur = () => {
        blurTimeoutRef.current = setTimeout(() => {
            setShowSuggestions(false);
        }, 100);
    };

    const hideSuggestions = () => {
        setShowSuggestions(false);
        hideSuggestionsTimeoutRef.current = setTimeout(() => {
            setDisplayedSuggestions([]);
        }, 500);
    };

    useEffect(() => {
        return () => {
            clearTimeout(hideSuggestionsTimeoutRef.current ?? undefined);
            clearTimeout(blurTimeoutRef.current ?? undefined);
        };
    }, []);

    return (
        <Input
            required={props.required}
            inputValue={inputValue}
            inputName={props.inputName}
            inputType={props.inputType}
            minInputValueLength={props.minInputValueLength}
            label={props.label}
            labelStyle={props.labelStyle}
            onChange={handleOnChange}
            placeHolder={props.placeHolder}
            onBlur={onBlur}
            onFocus={() => updateDisplayedSuggestions(inputValue)}
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
