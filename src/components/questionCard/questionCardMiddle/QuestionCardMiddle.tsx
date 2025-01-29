import React from "react";

import styles from "./QuestionCardMiddle.module.css";

export function QuestionCardMiddle() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>Academic Procedures</div>
                <div>Time ago: 2 days</div>
            </div>
            <section className={styles.question_section}>
                <section>
                    <h2>How do I register to a course?</h2>
                    <p>Asked by: student123</p>
                </section>
                <p>3 answers</p>
            </section>
        </div>
    );
}
