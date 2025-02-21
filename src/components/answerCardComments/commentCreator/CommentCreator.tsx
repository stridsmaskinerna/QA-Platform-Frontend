import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";

import { TextArea } from "../../input";
import { ICommentForCreation } from "../../../utils";
import { CommentSubmitButton } from "../commentSubmitButton";
import styles from "./CommentCreator.module.css";

interface ICommentCreatorProps {
    answerId: string;
    createComment: (comment: ICommentForCreation) => Promise<void>;
}

export function CommentCreator({
    answerId,
    createComment,
}: ICommentCreatorProps) {
    const { t } = useTranslation();
    const [currentContent, setCurrentContent] = useState("");

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCurrentContent("");
        const comment: ICommentForCreation = {
            answerId,
            value: currentContent,
        };
        void createComment(comment);
    };

    const updateComment = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentContent(e.target.value);
    };

    return (
        <form
            className={styles.container}
            onSubmit={submit}
        >
            <div className={styles.textArea}>
                <TextArea
                    rows={4}
                    inputValue={currentContent}
                    minInputValueLength={2}
                    placeHolder={t(
                        "answerCardComments.createCommentPlaceholder",
                    )}
                    inputType="text"
                    onChange={updateComment}
                />
            </div>
            <CommentSubmitButton />
        </form>
    );
}
