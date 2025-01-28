import { CSSProperties } from "react";
import styles from "./SharedStyle.module.css";
interface ITabButtonsExpandedProps {
    tabBtns: { title: string; index: number }[];
    activeTab: number;
    handleTabClick: (idx: number) => void;
    tabBtnStyle?: CSSProperties;
}

export function TabButtonsExpanded({
    tabBtns,
    activeTab,
    handleTabClick,
    tabBtnStyle
}: ITabButtonsExpandedProps) {
    return (
        <>
            {tabBtns.map(({ title, index }) => (
                <button
                    key={index}
                    style={tabBtnStyle}
                    className={`${styles.tabButton} ${activeTab === index ? styles.btnActive : ""}`}
                    onClick={() => handleTabClick(index)}
                >
                    {title}
                </button>
            ))}
        </>
    );
}
