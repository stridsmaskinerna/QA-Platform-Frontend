import styles from "./Loader.module.css";
export function Loader() {
    return (
        <div className={styles.container}>
            <span className={styles.loader}></span>
        </div>
    );
}
