import { useTranslation } from "react-i18next";
import styles from "./Modal.module.css";

interface IModalProps {
    message: string;
    okClick: () => void;
}

export function Modal({ message, okClick }: IModalProps) {
    const { t } = useTranslation();
    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <span className={styles.text}>{message}</span>
                <button
                    onClick={okClick}
                    className={styles.btn}
                >
                    {t("ok")}
                </button>
            </div>
        </div>
    );
}
