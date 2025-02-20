import styles from "./Headers.module.css";

interface IH1Props {
    text: string;
    color?: "white" | "black";
}

export function H1({ text, color = "black" }: IH1Props) {
    const getDerivedClass = () => {
        if (color == "white") {
            return `${styles.colorWhite} ${styles.title}`;
        } else {
            return `${styles.colorBlack} ${styles.title}`;
        }
    };

    return <h1 className={getDerivedClass()}>{text}</h1>;
}
