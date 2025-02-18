import { Link } from "react-router";
import styles from "./RouteButton.module.css";
import arrowRight from "../../../assets/icons/arrow_right.svg";
interface IRouteButtonProps {
    text: string;
    routeTo: string;
}

export function RouteButton({ text, routeTo }: IRouteButtonProps) {
    return (
        <Link
            className={styles.link}
            to={routeTo}
        >
            <button className={styles.btn}>
                <img
                    className={styles.flip}
                    src={arrowRight}
                />
                {text}
            </button>
        </Link>
    );
}
