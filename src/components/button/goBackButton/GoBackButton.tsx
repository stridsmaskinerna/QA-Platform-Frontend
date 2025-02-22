import styles from "./RouteButton.module.css";
import arrowRight from "../../../assets/icons/arrow_right.svg";
import { useNavigate } from "react-router";
interface IGoBackButtonProps {
    text: string;
}

export function GoBackButton({ text }: IGoBackButtonProps) {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => void navigate(-1)}
            className={styles.btn}
        >
            <img
                className={styles.flip}
                src={arrowRight}
            />
            {text}
        </button>
    );
}
