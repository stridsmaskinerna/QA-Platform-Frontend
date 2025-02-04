import {
    ChangeEventHandler,
    HTMLInputTypeAttribute,
    useId,
    useRef,
    useState,
} from "react";
import styles from "./Input.module.css";
import { useOnClickOutside } from "usehooks-ts";

interface IInputProps {
    inputType: HTMLInputTypeAttribute;
    label?: string;
    inputName: string;
    minInputValueLength?: number;
    placeHolder?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    defaultValue?: string;
}

export function Input({
    inputType,
    label,
    inputName,
    minInputValueLength,
    placeHolder,
    onChange,
    defaultValue,
}: IInputProps) {
    const [isActive, setIsActive] = useState(false);
    const id = useId();
    const inputRef = useRef(null);
    useOnClickOutside(inputRef, () => setIsActive(false));
    return (
        <div className={styles.container}>
            {label && (
                <label
                    className={styles.label}
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <div
                onClick={() => setIsActive(true)}
                className={`${styles.inputWrapper} ${isActive ? styles.highlight : ""}`}
            >
                <input
                    defaultValue={defaultValue}
                    onChange={onChange}
                    placeholder={placeHolder}
                    minLength={minInputValueLength}
                    ref={inputRef}
                    required
                    id={id}
                    name={inputName}
                    type={inputType}
                    className={styles.input}
                />
            </div>
        </div>
    );
}
