import deleteIcon from "../../../assets/icons/delete_white.svg";
import styles from "./DeleteButton.module.css";

interface IDeleteButtonProps {
    onClick?: () => void;
    text?: string;
    icon?: boolean;
    disabled?: boolean;
    className?: string;
}

export function DeleteButton({
    onClick = () => {
        return;
    },
    text = "Delete",
    icon = false,
    disabled = false,
    className = "",
}: IDeleteButtonProps) {
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
            {icon && (
                <img
                    src={deleteIcon}
                    alt={text}
                    title={text}
                />
            )}
            {text}
        </button>
    );
}
