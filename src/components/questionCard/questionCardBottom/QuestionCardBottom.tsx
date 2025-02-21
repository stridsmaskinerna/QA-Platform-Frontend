import styles from "./QuestionCardBottom.module.css";
import sharedStyles from "../QuestionCardSharedStyles.module.css";

interface QuestionCardBottomProps {
    tags: string[];
    isHiddenOptimistic: boolean;
}

export function QuestionCardBottom({
    tags,
    isHiddenOptimistic,
}: QuestionCardBottomProps) {
    return (
        <div className={styles.container}>
            {isHiddenOptimistic && <div className={sharedStyles.isHidden} />}
            {tags.map(tag => (
                <p
                    key={tag}
                    className={styles.tagContainer}
                >
                    {tag}
                </p>
            ))}
        </div>
    );
}
