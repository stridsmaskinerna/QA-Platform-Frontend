import { CSSProperties, useState } from "react";
import { useTranslation } from "react-i18next";

import { useQuestionDetailsViewerContext } from "../../questionDetailsViewer/context";
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
    const questionContext = useQuestionDetailsViewerContext();
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
        <AnswerForm onSubmit={submit}>
            <RichTextEditor
                initialState={answer.value}
                placeholder={"Update you answer..."}
                setEditorState={setValue}
                containerStyle={detailsContainerStyle}
            />
        </AnswerForm>
    );
}
