import { useEffect, useRef, useState } from "react";
import { ITabButtonsProps } from ".";
import styles from "./TabButtonsMobile.module.css";
import sharedStyles from "./SharedStyle.module.css";
import { useOnClickOutside } from "usehooks-ts";

export function TabButtonsMobile({
    tabBtns,
    handleTabClick,
    activeTab
}: ITabButtonsProps) {
    const [dropdownWidth, setDropdownWidth] = useState(0);
    const [isMenuExpanded, setIsMenuExpanded] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(dropdownRef, () =>
        setIsMenuExpanded(prev => (prev ? false : prev))
    );
    //To make sure that when tabs are in a menu, the selected tab is on top
    const sortedTabs = [...tabBtns].sort(a => (a.idx === activeTab ? -1 : 1));

    const handleDropdownClick = (idx: number) => {
        handleTabClick(idx);
        if (!isMenuExpanded && idx === activeTab) {
            setIsMenuExpanded(true);
        } else {
            setIsMenuExpanded(false);
        }
    };

    useEffect(() => {
        if (dropdownRef.current) {
            const dropdownItems =
                dropdownRef.current.querySelectorAll<HTMLDivElement>(
                    `.${styles.dropdownItem}`
                );
            // Determine the widest element among the items
            const maxWidth = Array.from(dropdownItems).reduce(
                (max, item) => Math.max(max, item.offsetWidth),
                0
            );
            setDropdownWidth(maxWidth);
        }
    }, []);

    return (
        <div
            className={styles.dropdownContainer}
            ref={dropdownRef}
            style={dropdownWidth ? { width: dropdownWidth } : {}}
        >
            <div
                style={dropdownWidth ? { width: dropdownWidth } : {}}
                className={`${styles.dropdownItem} ${styles.activeItem}`}
                onClick={() => handleDropdownClick(sortedTabs[0].idx)}
            >
                <button
                    style={sortedTabs[0].btnStyle}
                    className={`${sharedStyles.tabButton} ${styles.btnActive} ${sharedStyles.btnActive}`}
                >
                    {sortedTabs[0].title}
                </button>
                <span
                    className={`${styles.downArrow} ${isMenuExpanded ? styles.upsideDown : ""}`}
                />
            </div>

            <div
                className={`${styles.inactiveItems} ${isMenuExpanded ? styles.show : ""}`}
            >
                {sortedTabs
                    .filter(t => t.idx !== activeTab)
                    .map(({ title, idx, btnStyle }) => (
                        <div
                            onClick={() => handleDropdownClick(idx)}
                            style={
                                dropdownWidth ? { width: dropdownWidth } : {}
                            }
                            className={styles.dropdownItem}
                            key={idx}
                        >
                            <button
                                style={btnStyle}
                                className={`${sharedStyles.tabButton}`}
                            >
                                {title}
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
}
