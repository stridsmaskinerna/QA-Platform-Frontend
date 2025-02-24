import styles from "./QuestionCardBottom.module.css";
import sharedStyles from "../QuestionCardSharedStyles.module.css";
import { DeleteButton, EditButton, Modal } from "../..";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { EDIT_QUESTION_ROUTE } from "../../../data";
import { highlights } from "../constants";

interface QuestionCardBottomProps {
    tags: string[];
    isPostedByUser: boolean;
    isHiddenOptimistic: boolean;
    handleDeleteClick: () => void;
    questionId: string;
}

export function QuestionCardBottom({
    tags,
    isHiddenOptimistic,
    isPostedByUser,
    handleDeleteClick,
    questionId,
}: QuestionCardBottomProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const closeModal = () => setShowConfirmDeleteModal(false);

    const handleConfirmDelete = () => {
        closeModal();
        handleDeleteClick();
    };

    const onEditClick = async () =>
        await navigate(`${EDIT_QUESTION_ROUTE}${questionId}`);

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
                            data-hl={highlights.tags}
                        >
                            {tag}
                        </p>
                    ))}
                </div>
                {isPostedByUser && (
                    <div className={styles.btnsContainer}>
                        <EditButton
                            onClick={() => void onEditClick()}
                            text={t("edit")}
                        />
                        <DeleteButton
                            text={t("delete")}
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
