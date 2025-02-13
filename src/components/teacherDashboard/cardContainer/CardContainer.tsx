import { ReactNode } from "react";

import styles from "./CardContainer.module.css";

interface CardContainerProps {
    children: ReactNode;
}

export function CardContainer({
    children
}: CardContainerProps) {

    return (
        <div className={styles.container}>
            {children}
        </div>
    );
}
