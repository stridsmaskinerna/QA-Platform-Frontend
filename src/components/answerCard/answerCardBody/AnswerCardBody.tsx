import { useQuestionDetailsContext } from "../../questionDetailsViewer/context";
import { RichTextReader } from "../../richText";
import styles from "./AnswerCardBody.module.css";
import { AnswerUpdater } from "../answerUpdater";
import { IAnswer } from "../../../utils";

interface IAnswerCardBody {
    answer: IAnswer;
}

export function AnswerCardBody({ answer }: IAnswerCardBody) {
    const { editingAnswer } = useQuestionDetailsContext();

    return (
        <div className={styles.container}>
            {answer.id !== editingAnswer?.id ? (
                <RichTextReader initialState={answer.value} />
            ) : (
                <AnswerUpdater answer={answer} />
            )}
        </div>
    );
}
