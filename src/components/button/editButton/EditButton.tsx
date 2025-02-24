import styles from "./EditButton.module.css";
interface IEditButtonProps {
    onClick?: () => void;
    text?: string;
    disabled?: boolean;
    className?: string;
}

export function EditButton({
    onClick = () => {
        return;
    },
    text = "Edit",
    disabled = false,
    className = "",
}: IEditButtonProps) {
    const getDerivedClass = () => {
        return className == "" ? styles.button : className;
    };
    return (
        <button
            onClick={onClick}
            className={getDerivedClass()}
            disabled={disabled}
        >
            {text}
        </button>
    );
}
