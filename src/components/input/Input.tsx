import { ChangeEvent, useId, useState } from "react";
import styles from "./Input.module.css";
import { IInputProps } from "../../utils";

export function Input({
    inputType,
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
}: IInputProps) {
    const [isActive, setIsActive] = useState(false);

    const [localInputValue, setLocalInputValue] = useState<string>(
        inputValue ?? "",
    );
    const id = useId();

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (!inputValue) {
            setLocalInputValue(e.target.value);
        }
        if (onChange) {
            onChange(e);
        } else if (inputValue) {
            console.error(
                "You are providing an inputValue to Input component but not a onChange handler",
            );
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
                className={`${styles.inputWrapper} ${isActive ? styles.highlight : ""}`}
            >
                <input
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={inputValue ?? localInputValue}
                    defaultValue={defaultValue}
                    onChange={handleOnChange}
                    placeholder={placeHolder}
                    minLength={minInputValueLength}
                    required
                    id={id}
                    name={inputName}
                    type={inputType}
                    className={styles.input}
                />
            </div>
            {children}
        </div>
    );
}
