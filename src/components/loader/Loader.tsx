import styles from "./Loader.module.css";

interface ILoaderProps {
    diameter?: number;
}

export function Loader({ diameter }: ILoaderProps) {
    return (
        <div className={styles.container}>
            <span
                style={{
                    width: `${diameter}px`,
                    height: `${diameter}px`
                }}
                className={styles.loader}
            ></span>
        </div>
    );
}
