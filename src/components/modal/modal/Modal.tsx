import { useRef } from "react";
import { useTranslation } from "react-i18next";

import { H1 } from "../../text";
import { CancelButton, OkButton } from "../../button";
import styles from "./Modal.module.css";

interface IModalProps {
    title: string;
    message: string;
    type?: "info" | "warning";
    okDisabled?: boolean;
    okClick: () => void;
    onBackdropClick: () => void;
    cancelClick?: () => void;
}

export function Modal({
    title,
    message,
    type = "info",
    okDisabled = false,
    okClick,
    onBackdropClick,
    cancelClick,
}: IModalProps) {
    const { t } = useTranslation();
    const modalRef = useRef<HTMLDivElement | null>(null);

    const getDerivedModalClass = () => {
        if (type === "warning") {
            return `${styles.warning} ${styles.modal}`;
        } else {
            return `${styles.info} ${styles.modal}`;
        }
    };

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current?.contains(event.target as Node)) {
            return;
        }

        onBackdropClick();
    };

    return (
        <div
            className={styles.modalBackdrop}
            onClick={event => {
                handleBackdropClick(event);
            }}
        >
            <div
                ref={modalRef}
                className={getDerivedModalClass()}
            >
                <H1
                    text={title}
                    color="white"
                />
                <p className={styles.text}>{message}</p>
                <div className={styles.btnsContainer}>
                    {cancelClick !== undefined && (
                        <CancelButton
                            onClick={cancelClick}
                            className={styles.cancelButton}
                        />
                    )}
                    <OkButton
                        disabled={okDisabled}
                        text={t("ok")}
                        onClick={okClick}
                    />
                </div>
            </div>
        </div>
    );
}
