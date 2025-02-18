import { CustomError } from "../../../utils";
import { Modal } from "../modal";

interface IErrorModalProps {
    error: CustomError | null;
    onClose: () => void;
}

export function ErrorModal({ error, onClose }: IErrorModalProps) {
    return (
        <>
            {error != null && (
                <Modal
                    type="warning"
                    title={error.message}
                    message={error?.detail ?? ""}
                    okClick={() => {
                        onClose();
                    }}
                    onBackdropClick={() => {
                        onClose();
                    }}
                />
            )}
        </>
    );
}
