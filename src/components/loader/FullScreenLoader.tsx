import styles from "./LoaderSharedStyles.module.css";

interface ILoaderProps {
    diameter?: number;
}

export function FullScreenLoader({ diameter }: ILoaderProps) {
    return (
        <div className={styles.container}>
            <span
                style={{
                    width: `${diameter}px`,
                    height: `${diameter}px`,
                }}
                className={styles.loader}
            ></span>
        </div>
    );
}
