import { useEffect, useRef, useState } from "react";
import { Input } from ".";
import { IInputProps, ISuggestion } from "../../utils";
import styles from "./InputWithSuggestionsShared.module.css";

interface IInputWithDynamicSuggestionsProps
    extends Omit<IInputProps, "children"> {
    onSuggestionClick: (arg: ISuggestion) => void;
    displayedSuggestions: ISuggestion[];
}

export function InputWithDynamicSuggestions(
    props: IInputWithDynamicSuggestionsProps,
) {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const blurTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const handleSuggestionClick = ({ id, name }: ISuggestion) => {
        setShowSuggestions(false);
        props.onSuggestionClick({ id, name });
    };

    const onBlur = () => {
        blurTimeoutRef.current = setTimeout(() => {
            setShowSuggestions(false);
        }, 100);
    };

    const handleOnFocus = () => {
        if (props.displayedSuggestions.length) {
            setShowSuggestions(true);
        }
        if (props.onFocus) {
            props.onFocus();
        }
    };

    useEffect(() => {
        if (!props.inputValue?.trim()) {
            setShowSuggestions(false);
        } else if (!showSuggestions && props.displayedSuggestions.length) {
            setShowSuggestions(true);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.displayedSuggestions.length, props.inputValue]);

    useEffect(() => {
        return () => {
            clearTimeout(blurTimeoutRef.current ?? undefined);
        };
    }, []);

    return (
        <Input
            required={props.required}
            inputValue={props.inputValue}
            inputName={props.inputName}
            inputType={props.inputType}
            defaultValue={props.defaultValue}
            minInputValueLength={props.minInputValueLength}
            label={props.label}
            labelStyle={props.labelStyle}
            onChange={props.onChange}
            placeHolder={props.placeHolder}
            onBlur={onBlur}
            onFocus={handleOnFocus}
        >
            <div
                className={`${styles.suggestionsContainer} ${showSuggestions ? styles.showSuggestions : ""}`}
            >
                {props.displayedSuggestions?.map(s => (
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
