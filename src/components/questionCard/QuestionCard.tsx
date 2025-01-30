import styles from "./QuestionCard.module.css";

import { QuestionHeader } from ".";
import { QuestionCardMiddle } from "./questionCardMiddle/QuestionCardMiddle";
import QuestionCardBottom from "./questionCardBottom/QuestionCardBottom";

interface QuestionCardProps {
    data: {
        id: string;
        topicId: string;
        topicName: string;
        courseName: string;
        courseCode: string;
        userId: string;
        username: string;
        title: string;
        description: string;
        filePath: string | null;
        created: string;
        isResolved: boolean;
        isProtected: boolean;
        isHidden: boolean;
        answerCount: number;
        tags: string[];
    };
}

export function QuestionCard({ data }: QuestionCardProps) {
    return (
        <div className={styles.container}>
            <QuestionHeader data={data} />
            <QuestionCardMiddle data={data} />
            <QuestionCardBottom data={data} />
        </div>
    );
}
