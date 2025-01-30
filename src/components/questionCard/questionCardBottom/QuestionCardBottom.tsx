import React from "react";
import styles from "./QuestionCardBottom.module.css";

interface QuestionCardBottomProps {
    data: {
        tags: string[];
    };
}

export default function QuestionCardBottom({ data }: QuestionCardBottomProps) {
    return (
        <div className={styles.container}>
            {data.tags.map(tag => (
                <p className={styles.tag_container}>{tag}</p>
            ))}
        </div>
    );
}
