import { useEffect, useState } from "react";

import { CustomError } from "../../../utils";
import { Modal } from "../modal";

interface IErrorModalProps {
    errors: (CustomError | null)[];
    onClearErrors: () => void;
}

export function ErrorModal({ errors, onClearErrors }: IErrorModalProps) {
    const [error, setError] = useState<CustomError | null>(null);

    useEffect(() => {
        const firstError = errors.find(err => err != null) ?? null;
        setError(firstError);
    }, [errors]);

    const closeModal = () => {
        setError(null);
        onClearErrors();
    };

    return (
        <>
            {error != null && (
                <Modal
                    type="warning"
                    title={error.message}
                    message={error?.detail ?? ""}
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
