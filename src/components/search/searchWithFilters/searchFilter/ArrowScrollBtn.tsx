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
    pointingDirection,
}: IArrowScrollBtnProps) {
    return (
        <button
            onClick={onClick}
            className={`${styles.container} ${show ? styles.show : ""} ${pointingDirection === "left" ? styles.left : styles.right}`}
        >
            <div className={`${styles.arrowContainer} `}>
                <img src={arrowRight} />
            </div>
        </button>
    );
}
