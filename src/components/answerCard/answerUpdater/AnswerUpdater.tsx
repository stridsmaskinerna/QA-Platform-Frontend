import { CSSProperties, useState } from "react";
import { useTranslation } from "react-i18next";

import { useQuestionDetailsContext } from "../../questionDetailsViewer/context";
import { RichTextEditor } from "../../richText";
import { IAnswer } from "../../../utils";
import { AnswerForm } from "../../forms";

interface IAnswerCreatorProps {
    answer: IAnswer;
}

const detailsContainerStyle: CSSProperties = {
    border: "2px solid var(--input-idle)",
};

export function AnswerUpdater({ answer }: IAnswerCreatorProps) {
    const { t } = useTranslation();
    const questionContext = useQuestionDetailsContext();
    const [value, setValue] = useState("");

    const submit = () => {
        void questionContext
            .updateAnswer({
                ...answer,
                value,
            })
            .then(() => {
                setValue("");
                questionContext.updateEditingAnswer(null);
            });
    };

    return (
        <AnswerForm
            onSubmit={submit}
            onCancel={() => {
                questionContext.updateEditingAnswer(null);
            }}
        >
            <RichTextEditor
                initialState={answer.value}
                placeholder={t("answerCard.updatePlaceHolder")}
                setEditorState={setValue}
                containerStyle={detailsContainerStyle}
            />
        </AnswerForm>
    );
}
