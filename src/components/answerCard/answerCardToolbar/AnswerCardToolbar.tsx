import { useQAContext } from "../../../hooks";
import { IAnswer } from "../../../utils";
import { DeleteButton, EditButton } from "../../button";
import { useQuestionDetailsContext } from "../../questionDetailsViewer/context";
import styles from "./AnswerCardToolbar.module.css";

interface IAnswerCardToolbarProps {
    answer: IAnswer;
}

export function AnswerCardToolbar({ answer }: IAnswerCardToolbarProps) {
    const qaContext = useQAContext();
    const { editingAnswer, deleteAnswer, toggleEditingAnswer } =
        useQuestionDetailsContext();

    const isMyAnswer = () => {
        return qaContext.authContext.username === answer.userName;
    };

    const getDisableStatus = () => {
        return editingAnswer?.id == answer.id;
    };

    return (
        <>
            {isMyAnswer() && (
                <div className={styles.container}>
                    <EditButton
                        disabled={getDisableStatus()}
                        onClick={() => {
                            toggleEditingAnswer(answer);
                        }}
                        text={"Edit"}
                        icon={true}
                    />
                    <DeleteButton
                        disabled={getDisableStatus()}
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
