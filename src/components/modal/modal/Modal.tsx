import { ReactNode, useRef } from "react";
import { useTranslation } from "react-i18next";

import { H1 } from "../../text";
import { OkButton } from "../../button";
import styles from "./Modal.module.css";

interface IModalProps {
    title: string;
    message: ReactNode;
    type?: "info" | "warning";
    okClick: () => void;
    onBackdropClick: () => void;
}

export function Modal({
    title,
    message,
    type = "info",
    okClick,
    onBackdropClick,
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
                <OkButton
                    text={t("ok")}
                    onClick={okClick}
                />
            </div>
        </div>
    );
}
