import { useState } from "react";

import { Modal } from "../..";
import { InfoModalBody } from "../infoModalBody";
import { questionCards } from "../data";

interface IInfoModalProps {
    open: boolean;
}

export function InfoModal({ open }: IInfoModalProps) {
    const [isOpen, setIsOpen] = useState(open);

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            {isOpen && (
                <Modal
                    title={"Fast Facts You Shouldn't Miss"}
                    message={<InfoModalBody questionCards={questionCards} />}
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
