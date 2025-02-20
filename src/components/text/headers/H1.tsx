import styles from "./Headers.module.css";

interface IHeaderProps {
    text: string;
    color?: "white" | "black";
}

export function H1({ text, color = "black" }: IHeaderProps) {
    const getDerivedClass = () => {
        if (color == "white") {
            return `${styles.colorWhite} ${styles.h1}`;
        } else {
            return `${styles.colorBlack} ${styles.h1}`;
        }
    };

    return <h1 className={getDerivedClass()}>{text}</h1>;
}
