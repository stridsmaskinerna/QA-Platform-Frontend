import styles from "./QuestionCardBottom.module.css";

interface QuestionCardBottomProps {
    tags: string[];
}

export default function QuestionCardBottom({ tags }: QuestionCardBottomProps) {
    return (
        <div className={styles.container}>
            {tags.map(tag => (
                <p
                    key={tag}
                    className={styles.tag_container}
                >
                    {tag}
                </p>
            ))}
        </div>
    );
}
