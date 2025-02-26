import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";

import { TextArea } from "../../input";
import { IComment } from "../../../utils";
import { CommentSubmitButton } from "../commentSubmitButton";
import styles from "./CommentUpdater.module.css";
import { CommentForm } from "../../forms";

interface ICommentUpdaterProps {
    comment: IComment;
    onCancel: () => void;
    onUpdateComment: (comment: IComment) => Promise<void>;
}

export function CommentUpdater({
    comment,
    onCancel,
    onUpdateComment,
}: ICommentUpdaterProps) {
    const { t } = useTranslation();
    const [currentContent, setCurrentContent] = useState(comment.value);

    const submit = () => {
        const commentForUpdate: IComment = {
            ...comment,
            value: currentContent,
        };
        void onUpdateComment(commentForUpdate);
    };

    const updateContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentContent(e.target.value);
    };

    return (
        <CommentForm
            onSubmit={submit}
            onCancel={onCancel}
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
                    onChange={updateContent}
                />
            </div>
        </CommentForm>
    );
}
