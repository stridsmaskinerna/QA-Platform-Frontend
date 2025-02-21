import { ChangeEventHandler } from "react";
import styles from "./Toggle.module.css";

interface IToggleProps {
    inputName?: string;
    onClick: ChangeEventHandler<HTMLInputElement>;
    defaultChecked?: boolean;
}

export function Toggle({ inputName, onClick, defaultChecked }: IToggleProps) {
    return (
        <label className={styles.switch}>
            <input
                checked={defaultChecked}
                onChange={onClick}
                value="false"
                name={inputName}
                type="checkbox"
            />
            <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
    );
}
