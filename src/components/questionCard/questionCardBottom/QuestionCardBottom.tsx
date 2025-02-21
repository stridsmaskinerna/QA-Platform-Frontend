import styles from "./QuestionCardBottom.module.css";
import sharedStyles from "../QuestionCardSharedStyles.module.css";
import { DeleteButton, Modal } from "../..";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface QuestionCardBottomProps {
    tags: string[];
    isPostedByUser: boolean;
    isHiddenOptimistic: boolean;
    handleDeleteClick: () => void;
}

export function QuestionCardBottom({
    tags,
    isHiddenOptimistic,
    isPostedByUser,
    handleDeleteClick,
}: QuestionCardBottomProps) {
    const { t } = useTranslation();
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const closeModal = () => setShowConfirmDeleteModal(false);

    const handleConfirmDelete = () => {
        closeModal();
        handleDeleteClick();
    };

    return (
        <>
            <div className={styles.container}>
                {isHiddenOptimistic && (
                    <div className={sharedStyles.isHidden} />
                )}
                <div className={styles.tagsWrapper}>
                    {tags.map(tag => (
                        <p
                            key={tag}
                            className={styles.tagContainer}
                        >
                            {tag}
                        </p>
                    ))}
                </div>
                {isPostedByUser && (
                    <div className={styles.btnsContainer}>
                        <DeleteButton
                            onClick={() => setShowConfirmDeleteModal(true)}
                        />
                    </div>
                )}
            </div>
            {showConfirmDeleteModal && (
                <Modal
                    title={t("deleteQuestion")}
                    message={t("deleteQuestionPrompt")}
                    onBackdropClick={closeModal}
                    cancelClick={closeModal}
                    okClick={handleConfirmDelete}
                />
            )}
        </>
    );
}
