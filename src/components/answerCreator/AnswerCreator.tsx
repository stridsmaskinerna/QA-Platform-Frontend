import { CSSProperties, FormEvent, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import chatIcon from "../../assets/icons/chat_white.svg";
import addCommentIcon from "../../assets/icons/add_comment.svg";
import openIcon from "../../assets/icons/arrow_right.svg";
import { H2 } from "../text";
import { RichTextEditor } from "../richText";
import styles from "./AnswerCreator.module.css";

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
    const viewAnswerCreatorRef = useRef<HTMLImageElement | null>(null);
    const [hideAnswerCreator, setHideCommentCreator] = useState(true);
    const [description, setDescription] = useState("");

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("currentContent", description);
        console.log("questionId", questionId);
        setDescription("");
    };

    const toggleCommentsCreator = () => {
        setHideCommentCreator(prev => !prev);
        viewAnswerCreatorRef.current?.classList.toggle(styles.openIconHide);
    };

    return (
        <div className={styles.container}>
            <div
                className={styles.header}
                onClick={() => {
                    toggleCommentsCreator();
                }}
            >
                <div className={styles.headerLabel}>
                    <img
                        src={addCommentIcon}
                        alt={"Create Answer"}
                        title={"Create Answer"}
                        className={styles.labelIcon}
                    />
                    <H2 text={"Create answer"} />
                </div>
                <img
                    ref={viewAnswerCreatorRef}
                    src={openIcon}
                    alt={"Create Answer"}
                    title={"Create Answer"}
                    className={styles.openIcon}
                />
            </div>
            {!hideAnswerCreator && (
                <form
                    className={styles.innerContainer}
                    onSubmit={submit}
                >
                    <div className={styles.textArea}>
                        <RichTextEditor
                            placeholder={"Create you answer..."}
                            setEditorState={setDescription}
                            containerStyle={detailsContainerStyle}
                        />
                    </div>
                    <div className={styles.answerBtnCtr}>
                        <button
                            title={"Submit"}
                            type="submit"
                            className={styles.answerBtn}
                        >
                            <img
                                src={chatIcon}
                                alt="Add"
                            />
                            <span className={styles.answerBtnText}>
                                {"Submit"}
                            </span>
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
