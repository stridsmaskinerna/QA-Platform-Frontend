import { useQAContext } from "../../../hooks";
import { IAnswer } from "../../../utils";
import { DeleteButton, EditButton } from "../../button";
import { useQuestionDetailsViewerContext } from "../../questionDetailsViewer/context";
import styles from "./AnswerCardToolbar.module.css";

interface IAnswerCardToolbarProps {
    answer: IAnswer;
}

export function AnswerCardToolbar({ answer }: IAnswerCardToolbarProps) {
    const qaContext = useQAContext();
    const { deleteAnswer, toggleEditingAnswer: toggleIsEditingAnswer } =
        useQuestionDetailsViewerContext();

    const isMyAnswer = () => {
        return qaContext.authContext.username === answer.userName;
    };

    return (
        <>
            {isMyAnswer() && (
                <div className={styles.container}>
                    <EditButton
                        onClick={() => {
                            toggleIsEditingAnswer(answer);
                        }}
                        text={"Edit"}
                        icon={true}
                    />
                    <DeleteButton
                        onClick={() => {
                            void deleteAnswer(answer);
                        }}
                        text={"Delete"}
                        icon={true}
                    />
                </div>
            )}
        </>
    );
}
