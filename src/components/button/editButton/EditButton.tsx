import updateIcon from "../../../assets/icons/edit.svg";
import styles from "./EditButton.module.css";

interface IEditButtonProps {
    onClick?: () => void;
    text?: string;
    disabled?: boolean;
    icon?: boolean;
    className?: string;
}

export function EditButton({
    onClick = () => {
        return;
    },
    text = "Edit",
    icon = false,
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
            {icon && (
                <img
                    src={updateIcon}
                    alt={text}
                    title={text}
                />
            )}
            {text}
        </button>
    );
}
