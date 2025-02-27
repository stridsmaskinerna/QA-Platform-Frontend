import { CSSProperties, useState } from "react";
import { useTranslation } from "react-i18next";

import addAnswerIcon from "../../assets/icons/add_comment.svg";
import { RichTextEditor } from "../richText";
import { TabLabelContainer } from "../tabs";
import { useQuestionDetailsContext } from "../questionDetailsViewer";
import { AnswerForm } from "../forms";

interface IAnswerCreatorProps {
    questionId: string;
}

const detailsContainerStyle: CSSProperties = {
    border: "2px solid var(--input-idle)",
};

export function AnswerCreator({ questionId }: IAnswerCreatorProps) {
    const { t } = useTranslation();
    const questionContext = useQuestionDetailsContext();
    const [value, setValue] = useState("");
    const [isAnswerCreatorOpen, setIsAnswerCreatorOpen] = useState(false);

    const submit = () => {
        void questionContext
            .createAnswer({
                questionId,
                value,
            })
            .then(() => {
                setValue("");
                setIsAnswerCreatorOpen(prev => !prev);
            });
    };

    return (
        <TabLabelContainer
            label={t("answerCreator.tabTitle")}
            isOpen={isAnswerCreatorOpen}
            labelIcon={addAnswerIcon}
            toggleOpen={() => {
                setIsAnswerCreatorOpen(prev => !prev);
            }}
        >
            <AnswerForm
                onSubmit={submit}
                onCancel={() => {
                    setIsAnswerCreatorOpen(false);
                }}
            >
                <RichTextEditor
                    placeholder={t("answerCreator.createPlaceholder")}
                    setEditorState={setValue}
                    containerStyle={detailsContainerStyle}
                />
            </AnswerForm>
        </TabLabelContainer>
    );
}
