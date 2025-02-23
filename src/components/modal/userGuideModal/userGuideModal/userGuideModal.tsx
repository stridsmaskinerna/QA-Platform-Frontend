import { useState } from "react";

import { Modal } from "../..";
import { UserGuide } from "../userGuide";
import { useQuestionCards } from "../hooks";

interface IInfoModalProps {
    open: boolean;
}

export function UserGuideModal({ open }: IInfoModalProps) {
    const [isOpen, setIsOpen] = useState(open);
    const questionCards = useQuestionCards();

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            {isOpen && (
                <Modal
                    title={""}
                    message={<UserGuide questionCards={questionCards.all} />}
                    okClick={() => {
                        closeModal();
                    }}
                    onBackdropClick={() => {
                        closeModal();
                    }}
                />
            )}
        </>
    );
}
