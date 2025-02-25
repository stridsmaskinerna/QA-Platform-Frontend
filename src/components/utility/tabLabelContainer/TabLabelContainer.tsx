import { ReactNode, useEffect, useRef } from "react";

import openIcon from "../../../assets/icons/arrow_right.svg";
import { H2 } from "../../text";
import styles from "./TabLabelContainer.module.css";

interface ITabLabelContainerProps {
    label: string;
    children: ReactNode;
    isOpen: boolean;
    labelIcon: string;
    toggleOpen: () => void;
}

export function TabLabelContainer({
    label,
    children,
    isOpen,
    labelIcon,
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
                <div className={styles.headerLabelContainer}>
                    <img
                        src={labelIcon}
                        alt={label}
                        title={label}
                        className={styles.headerLabelIcon}
                    />
                    <div className={styles.headerLabel}>
                        <H2 text={label} />
                    </div>
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
