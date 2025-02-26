import { useTranslation } from "react-i18next";

import { useQAContext } from "../../../hooks";
import { IAnswer } from "../../../utils";
import { DeleteButton, EditButton } from "../../button";
import { useQuestionDetailsContext } from "../../questionDetailsViewer/context";
import styles from "./AnswerCardToolbar.module.css";

interface IAnswerCardToolbarProps {
    answer: IAnswer;
}

export function AnswerCardToolbar({ answer }: IAnswerCardToolbarProps) {
    const { t } = useTranslation();
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
                        text={t("answerCard.editButton")}
                        icon={true}
                    />
                    <DeleteButton
                        disabled={getDisableStatus()}
                        onClick={() => {
                            void deleteAnswer(answer);
                        }}
                        text={t("answerCard.deleteButton")}
                        icon={true}
                    />
                </div>
            )}
        </>
    );
}
