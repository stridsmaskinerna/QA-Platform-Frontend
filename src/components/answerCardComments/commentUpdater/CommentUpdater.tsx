import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";

import { TextArea } from "../../input";
import { IComment } from "../../../utils";
import { CommentSubmitButton } from "../commentSubmitButton";
import styles from "./CommentUpdater.module.css";

interface ICommentUpdaterProps {
    comment: IComment
    onUpdateComment: (comment: IComment) => Promise<void>;
}

export function CommentUpdater({
    comment,
    onUpdateComment
}: ICommentUpdaterProps) {
    const { t } = useTranslation();
    const [currentContent, setCurrentContent] = useState(comment.value);

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
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
                    onChange={updateContent}
                />
            </div>
            <CommentSubmitButton />
        </form>
    );
}
