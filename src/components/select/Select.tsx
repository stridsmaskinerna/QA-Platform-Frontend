import { CSSProperties, useId } from "react";
import styles from "./Select.module.css";
import { IOption } from "../../utils";

interface ISelectProps {
    defaultOption?: string;
    placeholderValue: string;
    options: IOption[];
    label: string;
    selectName: string;
    labelStyle?: CSSProperties;
    required?: boolean;
}

export function Select({
    placeholderValue,
    options,
    label,
    labelStyle,
    selectName,
    required,
    defaultOption,
}: ISelectProps) {
    const id = useId();
    return (
        <div className={styles.container}>
            <label
                htmlFor={id}
                style={labelStyle}
                className={styles.label}
            >
                {label}
            </label>
            <select
                defaultValue={defaultOption}
                required={required ?? true}
                className={styles.select}
                name={selectName}
                id={id}
            >
                <option
                    value=""
                    className={`${styles.option} ${styles.defaultOption}`}
                >
                    {placeholderValue}
                </option>
                {options.map(o => (
                    <option
                        className={styles.option}
                        key={o.id}
                        value={o.id}
                    >
                        {o.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
