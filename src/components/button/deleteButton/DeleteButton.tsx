import styles from "./DeleteButton.module.css";

interface ISaveButtonProps {
    onClick?: () => void;
    text?: string;
    disabled?: boolean;
    className?: string;
}

export function DeleteButton({
    onClick = () => {
        return;
    },
    text = "Delete",
    disabled = false,
    className = "",
}: ISaveButtonProps) {
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
