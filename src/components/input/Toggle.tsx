import styles from "./Toggle.module.css";

interface IToggleProps {
    inputName?: string;
}

export function Toggle({ inputName }: IToggleProps) {
    return (
        <label className={styles.switch}>
            <input
                value="false"
                name={inputName}
                type="checkbox"
            />
            <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
    );
}
