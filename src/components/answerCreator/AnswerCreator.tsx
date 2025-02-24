import { FormEvent, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import chatIcon from "../../assets/icons/chat_white.svg";
import addCommentIcon from "../../assets/icons/add_comment.svg";
import openIcon from "../../assets/icons/arrow_right.svg";
import styles from "./AnswerCreator.module.css";
import { TextArea } from "../input";
import { H2 } from "../text";

interface IAnswerCreatorProps {
    questionId: string;
}

// TODO! Switch Form to rich text editor.
export function AnswerCreator({ questionId }: IAnswerCreatorProps) {
    const { t } = useTranslation();
    const viewAnswerCreatorRef = useRef<HTMLImageElement | null>(null);
    const [currentContent, setCurrentContent] = useState("");
    const [hideAnswerCreator, setHideCommentCreator] = useState(true);

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("currentContent", currentContent);
        console.log("questionId", questionId);
        setCurrentContent("");
    };

    const updateAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentContent(e.target.value);
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
                        <TextArea
                            rows={4}
                            inputValue={currentContent}
                            minInputValueLength={2}
                            placeHolder={"Create you answer..."}
                            inputType="text"
                            onChange={updateAnswer}
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
