import styles from "./Headers.module.css";

interface IH1Props {
    text: string;
}

export function H1({ text }: IH1Props) {
    return <h1 className={styles.title}>{text}</h1>;
}
