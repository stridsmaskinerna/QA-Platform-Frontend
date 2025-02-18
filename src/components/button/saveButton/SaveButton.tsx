import styles from "./SaveButton.module.css";

interface ISaveButtonProps {
    onClick?: () => void;
    text?: string;
    disabled?: boolean;
    className?: string;
}

export function SaveButton({
    onClick = () => {
        return;
    },
    text = "Save",
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
