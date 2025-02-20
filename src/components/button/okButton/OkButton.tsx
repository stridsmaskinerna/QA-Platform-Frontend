import styles from "./OkButton.module.css";

interface ICancelButtonProps {
    onClick?: () => void;
    text?: string;
    disabled?: boolean;
    className?: string;
}

export function OkButton({
    onClick = () => {
        return;
    },
    text = "Ok",
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
