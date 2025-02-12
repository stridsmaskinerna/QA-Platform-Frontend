import { ChangeEventHandler } from "react";
import styles from "./Toggle.module.css";

interface IToggleProps {
    inputName?: string;
    onClick: ChangeEventHandler<HTMLInputElement>;
}

export function Toggle({ inputName, onClick }: IToggleProps) {
    return (
        <label className={styles.switch}>
            <input
                onChange={onClick}
                value="false"
                name={inputName}
                type="checkbox"
            />
            <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
    );
}
