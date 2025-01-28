import styles from "./SharedStyle.module.css";
import { ITabButtonsProps } from ".";

export function TabButtons({
    tabBtns,
    activeTab,
    handleTabClick
}: ITabButtonsProps) {
    return (
        <>
            {tabBtns.map(({ title, idx, btnStyle }) => (
                <button
                    onClick={() => handleTabClick(idx)}
                    key={idx}
                    style={btnStyle}
                    className={`${styles.tabButton} ${activeTab === idx ? styles.btnActive : ""}`}
                >
                    {title}
                </button>
            ))}
        </>
    );
}
