import styles from "./SharedStyle.module.css";
import { ITabButtonsProps } from ".";

export function TabButtons({
    tabBtns,
    activeTab,
    handleTabClick
}: ITabButtonsProps) {
    return (
        <>
            {tabBtns.map(({ title, index, btnStyle }) => (
                <button
                    onClick={() => handleTabClick(index)}
                    key={index}
                    style={btnStyle}
                    className={`${styles.tabButton} ${activeTab === index ? styles.btnActive : ""}`}
                >
                    {title}
                </button>
            ))}
        </>
    );
}
