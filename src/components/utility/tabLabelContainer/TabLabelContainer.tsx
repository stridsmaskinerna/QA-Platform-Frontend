import { ReactNode, useRef, useState } from "react";

import addCommentIcon from "../../../assets/icons/add_comment.svg";
import openIcon from "../../../assets/icons/arrow_right.svg";
import { H2 } from "../../text";
import styles from "./TabLabelContainer.module.css";

interface ITabLabelContainerProps {
    label: string;
    children: ReactNode;
}

export function TabLabelContainer({
    label,
    children,
}: ITabLabelContainerProps) {
    const viewBodyRef = useRef<HTMLImageElement | null>(null);
    const [hideBody, setHideBody] = useState(true);

    const toggleBody = () => {
        setHideBody(prev => !prev);
        viewBodyRef.current?.classList.toggle(styles.openIconHide);
    };
    return (
        <div className={styles.container}>
            <div
                className={styles.header}
                onClick={() => {
                    toggleBody();
                }}
            >
                <div className={styles.headerLabel}>
                    <img
                        src={addCommentIcon}
                        alt={label}
                        title={label}
                        className={styles.labelIcon}
                    />
                    <H2 text={label} />
                </div>
                <img
                    ref={viewBodyRef}
                    src={openIcon}
                    alt={label}
                    title={label}
                    className={styles.openIcon}
                />
            </div>
            <div className={styles.body}>{!hideBody && <>{children}</>}</div>
        </div>
    );
}
