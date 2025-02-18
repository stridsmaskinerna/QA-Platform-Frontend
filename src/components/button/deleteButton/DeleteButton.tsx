import styles from "./DeleteButton.module.css";

interface ISaveButtonProps {
    onClick?: () => void;
    text?: string;
    isSaving?: boolean;
    disabled?: boolean;
}

export function DeleteButton({
    onClick = () => {
        return;
    },
    text = "Delete",
    isSaving = false,
    disabled = false,
}: ISaveButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled || isSaving}
            className={styles.button}
        >
            {isSaving ? "Deleting..." : text}
        </button>
    );
}
