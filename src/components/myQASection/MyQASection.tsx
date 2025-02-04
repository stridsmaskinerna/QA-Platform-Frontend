import { ReactElement } from "react";
import { UserInteractionFilter } from "../../utils";
import styles from "./MyQASection.module.css";

interface MyQASectionProps {
    activeFilter: UserInteractionFilter;
    setActiveFilter: (filter: UserInteractionFilter) => void;
    children: ReactElement;
}

export function MyQASection({
    activeFilter,
    setActiveFilter,
    children,
}: MyQASectionProps) {
    return <div className={styles.container}>{children}</div>;
}
