import styles from "./Headers.module.css";

interface IHeaderProps {
    text: string;
    color?: "white" | "black";
}

export function H2({ text, color = "black" }: IHeaderProps) {
    const getDerivedClass = () => {
        if (color == "white") {
            return `${styles.colorWhite} ${styles.h2}`;
        } else {
            return `${styles.colorBlack} ${styles.h2}`;
        }
    };

    return <h2 className={getDerivedClass()}>{text}</h2>;
}
