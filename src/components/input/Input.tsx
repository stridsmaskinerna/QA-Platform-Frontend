import { HTMLInputTypeAttribute, useId, useRef, useState } from "react";
import styles from "./Input.module.css";
import { useOnClickOutside } from "usehooks-ts";

interface IInputProps {
    parentWidth?: number;
    inputType: HTMLInputTypeAttribute;
    label?: string;
    inputName: string;
}

export function Input({
    parentWidth,
    inputType,
    label,
    inputName
}: IInputProps) {
    const [isActive, setIsActive] = useState(false);
    const id = useId();
    const inputRef = useRef(null);
    useOnClickOutside(inputRef, () => setIsActive(false));
    return (
        <div style={{ width: parentWidth }}>
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
