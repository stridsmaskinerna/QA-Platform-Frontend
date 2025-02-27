import { useState } from "react";
import { useTranslation } from "react-i18next";

import { TextArea } from "../../input";
import { ICommentForCreation } from "../../../utils";
import styles from "./CommentCreator.module.css";
import { CommentForm } from "../../forms";

interface ICommentCreatorProps {
    answerId: string;
    onCreateComment: (comment: ICommentForCreation) => Promise<void>;
    onCancel: () => void;
}

export function CommentCreator({
    answerId,
    onCreateComment,
    onCancel,
}: ICommentCreatorProps) {
    const { t } = useTranslation();
    const [currentContent, setCurrentContent] = useState("");

    const submit = () => {
        setCurrentContent("");
        const comment: ICommentForCreation = {
            answerId,
            value: currentContent,
        };
        void onCreateComment(comment);
    };

    const updateComment = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentContent(e.target.value);
    };

    return (
        <CommentForm
            onCancel={onCancel}
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
        </CommentForm>
    );
}
