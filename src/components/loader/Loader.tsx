import styles from "./LoaderSharedStyles.module.css";
interface ILoaderProps {
    diameter?: number;
}

export function Loader({ diameter }: ILoaderProps) {
    return (
        <span
            style={{
                width: `${diameter}px`,
                height: `${diameter}px`,
            }}
            className={styles.loader}
        ></span>
    );
}
