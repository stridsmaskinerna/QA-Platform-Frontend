import React from "react";

import styles from "./QuestionCard.module.css";

import { QuestionHeader } from ".";
import { QuestionCardMiddle } from "./questionCardMiddle/QuestionCardMiddle";
import QuestionCardBottom from "./questionCardBottom/QuestionCardBottom";

export function QuestionCard() {
    return (
        <div className={styles.container}>
            <QuestionHeader />
            <QuestionCardMiddle />
            <QuestionCardBottom />
        </div>
    );
}
