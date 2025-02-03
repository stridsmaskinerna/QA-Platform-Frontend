import { QuestionFinder } from "../../../components";
import styles from "../HomeSharedStyle.module.css";

export function HomeLimited() {
    return (
        <section className={styles.container}>
            <QuestionFinder />
        </section>
    );
}
