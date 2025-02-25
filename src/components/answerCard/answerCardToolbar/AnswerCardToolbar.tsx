import { useQAContext } from "../../../hooks";
import { IAnswer } from "../../../utils";
import { DeleteButton, EditButton } from "../../button";
import { useQuestionDetailsContext } from "../../questionDetailsViewer/context";
import { AnswerAccept } from "../AnswerCardAccept";
import styles from "./AnswerCardToolbar.module.css";

interface IAnswerCardToolbarProps {
    answer: IAnswer;
    isOwner: boolean;
}

export function AnswerCardToolbar({
    answer,
    isOwner,
}: IAnswerCardToolbarProps) {
    const qaContext = useQAContext();
    const {
        editingAnswer,
        deleteAnswer,
        toggleEditingAnswer,
        handleMarkAsSolved,
    } = useQuestionDetailsContext();

    const isMyAnswer = () => {
        return qaContext.authContext.username === answer.userName;
    };

    const getDisableStatus = () => {
        return editingAnswer?.id == answer.id;
    };

    return (
        <>
            <div className={styles.container}>
                <AnswerAccept
                    answerId={answer.id}
                    isAccepted={answer.isAccepted}
                    isOwner={isOwner}
                    onMarkAsSolved={() => void handleMarkAsSolved(answer.id)}
                />
                {isMyAnswer() && (
                    <>
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
                    </>
                )}
            </div>
        </>
    );
}
