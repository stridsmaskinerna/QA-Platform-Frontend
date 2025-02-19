import { ChangeEvent, useId, useState } from "react";
import styles from "./TextArea.module.css";
import { IInputProps } from "../../../utils";

interface ITextAreaProps extends IInputProps {
    inputType: "text";
    rows?: number;
}

export function TextArea({
    label,
    inputName,
    minInputValueLength,
    placeHolder,
    onChange,
    defaultValue,
    labelStyle,
    children,
    onBlur,
    onFocus,
    inputValue,
    required,
    rows = 5,
}: ITextAreaProps) {
    const [isActive, setIsActive] = useState(false);
    const [localInputValue, setLocalInputValue] = useState<string>(
        defaultValue ?? "",
    );
    const id = useId();

    const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        if (!inputValue) {
            setLocalInputValue(e.target.value);
        }

        if (onChange) {
            onChange(e);
        }
    };

    const handleBlur = () => {
        setIsActive(false);
        if (onBlur) {
            onBlur();
        }
    };

    const handleFocus = () => {
        setIsActive(true);
        if (onFocus) {
            onFocus();
        }
    };

    return (
        <div className={styles.container}>
            {label && (
                <label
                    style={labelStyle}
                    className={styles.label}
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <div
                className={`${styles.textareaWrapper} ${isActive ? styles.highlight : ""}`}
            >
                <textarea
                    rows={rows}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={inputValue ?? localInputValue}
                    onChange={handleOnChange}
                    placeholder={placeHolder}
                    minLength={minInputValueLength}
                    required={required ?? true}
                    id={id}
                    name={inputName}
                    className={styles.textarea}
                />
            </div>
            {children}
        </div>
    );
}
