import styles from "./FilterButton.module.css";

interface IFilterButtonProps {
    title: string;
    onClick: () => void;
    isActive: boolean;
}

export function FilterButton({ title, onClick, isActive }: IFilterButtonProps) {
    return (
        <button
            className={`${styles.btn} ${isActive ? styles.active : ""}`}
            onClick={onClick}
        >
            {title}
        </button>
    );
}
