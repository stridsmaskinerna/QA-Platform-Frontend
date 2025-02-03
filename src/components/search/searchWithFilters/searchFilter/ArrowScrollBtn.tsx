import styles from "./ArrowScrollBtn.module.css";
import arrowRight from "../../../../assets/icons/arrow_right.svg";
interface IArrowScrollBtnProps {
    show: boolean;
    onClick: () => void;
    pointingDirection: "right" | "left";
}

export function ArrowScrollBtn({
    show,
    onClick,
    pointingDirection
}: IArrowScrollBtnProps) {
    return (
        <div
            className={`${styles.container} ${show ? styles.show : ""} ${pointingDirection === "left" ? styles.left : styles.right}`}
        >
            <button
                className={`${styles.arrowContainer} `}
                onClick={onClick}
            >
                <img src={arrowRight} />
            </button>
        </div>
    );
}
