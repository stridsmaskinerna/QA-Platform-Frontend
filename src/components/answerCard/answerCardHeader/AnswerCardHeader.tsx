import styles from "./AnswerCardHeader.module.css";

interface IAnswerCardHeaderProps {
    username: string;
    answeredByTeacher: boolean;
}

export function AnswerCardHeader({
    username,
    answeredByTeacher,
}: IAnswerCardHeaderProps) {
    return <div className={styles.container}>{username} {answeredByTeacher}</div>;
}
