import styles from "./CancelButton.module.css";

interface ICancelButtonProps {
    onClick?: () => void;
    text?: string;
    disabled?: boolean;
    className?: string;
}

export function CancelButton({
    onClick = () => {
        return;
    },
    text = "Cancel",
    disabled = false,
}: ICancelButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={styles.button}
        >
            {text}
        </button>
    );
}
