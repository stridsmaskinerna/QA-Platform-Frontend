import styles from "./SaveButton.module.css";

interface ISaveButtonProps {
    onClick?: () => void;
    text?: string;
    isSaving?: boolean;
    disabled?: boolean;
}

export function SaveButton({
    onClick = () => {
        return;
    },
    text = "Save",
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
            {isSaving ? "Saving..." : text}
        </button>
    );
}
