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
    className = "",
}: ICancelButtonProps) {
    const getDerivedClass = () => {
        return className == "" ? styles.button : className;
    };

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={getDerivedClass()}
        >
            {text}
        </button>
    );
}
