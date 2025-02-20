import { RichTextReader } from "../../richText";
import styles from "./AnswerCardBody.module.css";

interface IAnswerCardBody {
    answer: string;
}

export function AnswerCardBody({ answer }: IAnswerCardBody) {
    return (
        <div className={styles.container}>
            <RichTextReader initialState={answer} />
        </div>
    );
}
