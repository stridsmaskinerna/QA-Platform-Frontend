import { ReactNode, useEffect, useRef } from "react";

import addCommentIcon from "../../../assets/icons/add_comment.svg";
import openIcon from "../../../assets/icons/arrow_right.svg";
import { H2 } from "../../text";
import styles from "./TabLabelContainer.module.css";

interface ITabLabelContainerProps {
    label: string;
    children: ReactNode;
    isOpen: boolean;
    toggleOpen: () => void;
}

export function TabLabelContainer({
    label,
    children,
    isOpen,
    toggleOpen,
}: ITabLabelContainerProps) {
    const viewBodyRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        if (viewBodyRef.current == null) {
            return;
        }

        if (isOpen) {
            viewBodyRef.current.classList.add(styles.openIconHide);
        } else {
            viewBodyRef.current.classList.remove(styles.openIconHide);
        }
    }, [isOpen]);

    return (
        <div className={styles.container}>
            <div
                className={styles.header}
                onClick={() => {
                    toggleOpen();
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
            <div className={styles.body}>{isOpen && <>{children}</>}</div>
        </div>
    );
}
