import { CSSProperties, FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";

import chatIcon from "../../../assets/icons/chat_white.svg";
import { RichTextEditor } from "../../richText";
import styles from "./AnswerCreator.module.css";
import { TabLabelContainer } from "../../utility";

interface IAnswerCreatorProps {
    questionId: string;
}

const detailsContainerStyle: CSSProperties = {
    border: "2px solid var(--input-idle)",
};

// TODO! Switch Form to rich text editor.
// See AskAQuestion, EditAQuestion, and RichTextEditor
export function AnswerCreator({ questionId }: IAnswerCreatorProps) {
    const { t } = useTranslation();
    const [description, setDescription] = useState("");

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("currentContent", description);
        console.log("questionId", questionId);
        setDescription("");
    };

    return (
        <TabLabelContainer label={"Create Answer"}>
            <form
                className={styles.container}
                onSubmit={submit}
            >
                <div className={styles.editor}>
                    <RichTextEditor
                        placeholder={"Create you answer..."}
                        setEditorState={setDescription}
                        containerStyle={detailsContainerStyle}
                    />
                </div>
                <div className={styles.answerBtnCtr}>
                    <button
                        type="submit"
                        className={styles.answerBtn}
                        title={"Submit Answer"}
                    >
                        <img
                            src={chatIcon}
                            alt={"Submit Answer"}
                        />
                        <span className={styles.answerBtnText}>{"Submit"}</span>
                    </button>
                </div>
            </form>
        </TabLabelContainer>
    );
}
