import { useState } from "react";

import { Modal } from "../..";
import { InfoModalBody } from "../infoModalBody";
import { useQuestionCards } from "../hooks";

interface IInfoModalProps {
    open: boolean;
}

export function InfoModal({ open }: IInfoModalProps) {
    const [isOpen, setIsOpen] = useState(open);
    const questionCards = useQuestionCards();

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            {isOpen && (
                <Modal
                    title={"Fast Facts You Shouldn't Miss"}
                    message={
                        <InfoModalBody questionCards={questionCards.all} />
                    }
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
