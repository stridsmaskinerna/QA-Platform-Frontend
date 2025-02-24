import { CSSProperties, FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";

import chatIcon from "../../../assets/icons/chat_white.svg";
import { RichTextEditor } from "../../richText";
import styles from "./AnswerCreator.module.css";
import { TabLabelContainer } from "../../utility";
import { usePOST, useGET } from "../../../hooks";
import { ANSWER_URL, BASE_URL } from "../../../data";
import { IAnswerForCreation } from "../../../utils";

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
    const [value, setValue] = useState("");
    const [isAnswerCreatorOpen, setIsAnswerCreatorOpen] = useState(false);
    const postAnswerReq = usePOST<void>();

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const runSubmit = async () => {
            const answer: IAnswerForCreation = {
                questionId,
                value,
            };

            const postRes = await postAnswerReq.postRequestWithError(
                `${BASE_URL}${ANSWER_URL}`,
                answer,
            );

            if (postRes.error != null) {
                return;
            }

            setValue("");
            // TODO! Update to more clean solution;
            window.location.reload();
        };

        void runSubmit();
    };

    return (
        <TabLabelContainer
            label={"Create Answer"}
            isOpen={isAnswerCreatorOpen}
            toggleOpen={() => {
                setIsAnswerCreatorOpen(prev => !prev);
            }}
        >
            <form
                className={styles.container}
                onSubmit={submit}
            >
                <div className={styles.editor}>
                    <RichTextEditor
                        placeholder={"Create you answer..."}
                        setEditorState={setValue}
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
            {/* <EditorController setEditor={setEditor} /> */}
        </TabLabelContainer>
    );
}
