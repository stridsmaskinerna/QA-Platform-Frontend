import {
    CSSProperties,
    ReactElement,
    useEffect,
    useRef,
    useState
} from "react";

import styles from "./Tabs.module.css";
import { TabButtonsExpanded } from "./TabButtonsExpanded";

export interface ITab {
    title: string;
    content: ReactElement;
    index: number;
    contentContainerStyle?: CSSProperties;
}

interface ITabsProps {
    tabs: ITab[];
    tabBtnStyle?: CSSProperties;
    tabBtnsContainerStyle?: CSSProperties;
    containerStyle?: CSSProperties;
    collapseWidth?: number;
}

export function Tabs({
    tabs,
    tabBtnStyle,
    tabBtnsContainerStyle,
    containerStyle,
    collapseWidth
}: ITabsProps) {
    const [activeTab, setActiveTab] = useState(tabs[0].index);
    const [isMenuExpanded, setIsMenuExpanded] = useState(false);
    const [isViewportSmall, setIsViewportSmall] = useState(false);
    const [dropdownWidth, setDropdownWidth] = useState(0);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const sortedTabs = isViewportSmall
        ? tabs
              //To make sure that when tabs are in a menu, the selected tab is on top
              .sort(a => (a.index === activeTab ? -1 : 1))
        : tabs;

    const handleTabClick = (idx: number) => {
        setActiveTab(idx);
        if (!isMenuExpanded && idx === activeTab) {
            setIsMenuExpanded(true);
        } else {
            setIsMenuExpanded(false);
        }
    };

    // Listen for window resize events given a prop passed to this component
    useEffect(() => {
        const mediaQuery = window.matchMedia(`(max-width: ${collapseWidth}px)`);

        const handleResize = () => {
            if (collapseWidth !== undefined) {
                setIsViewportSmall(mediaQuery.matches);
            } // Update the state based on media query
        };

        handleResize(); // Set initial state
        mediaQuery.addEventListener("change", handleResize); // Add listener for future changes

        return () => {
            mediaQuery.removeEventListener("change", handleResize); // Cleanup on unmount
        };
    }, [collapseWidth]);

    useEffect(() => {
        if (dropdownRef.current) {
            // Determine the widest element among the inactive items
            const dropdownItems =
                dropdownRef.current.querySelectorAll<HTMLDivElement>(
                    `.${styles.dropdownItem}`
                );
            const maxWidth = Array.from(dropdownItems).reduce(
                (max, item) => Math.max(max, item.offsetWidth),
                0
            );
            setDropdownWidth(maxWidth);
            console.log(maxWidth);
        }
    }, []);

    return (
        <div
            style={containerStyle}
            className={styles.container}
        >
            <div
                style={tabBtnsContainerStyle}
                className={`${styles.btnsContainer} ${isViewportSmall ? styles.noBorder : ""}`}
            >
                <div
                    className={styles.dropdownContainer}
                    ref={dropdownRef}
                    style={{ width: dropdownWidth }}
                >
                    <div
                        className={`${styles.dropdownItem} ${styles.activeItem} ${isMenuExpanded ? styles.noBottomBorder : ""}`}
                        onClick={() => handleTabClick(sortedTabs[0].index)}
                    >
                        <button
                            style={tabBtnStyle}
                            className={`${styles.tabButton} ${styles.btnActive}`}
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
                            .filter(t => t.index !== activeTab)
                            .map(({ title, index }) => (
                                <div
                                    style={
                                        dropdownWidth
                                            ? { width: dropdownWidth }
                                            : {}
                                    }
                                    className={styles.dropdownItem}
                                    key={index}
                                >
                                    <button
                                        style={tabBtnStyle}
                                        className={`${styles.tabButton}`}
                                        onClick={() => handleTabClick(index)}
                                    >
                                        {title}
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
                {!isViewportSmall && (
                    <TabButtonsExpanded
                        tabBtns={tabs}
                        tabBtnStyle={tabBtnStyle}
                        activeTab={activeTab}
                        handleTabClick={handleTabClick}
                    />
                )}
            </div>

            {tabs.map(({ content, index, contentContainerStyle }) => (
                <div
                    style={contentContainerStyle}
                    key={index}
                    role="tabpanel"
                    id={`tabpanel-${index}`}
                    aria-labelledby={`tab-${index}`}
                    className={`${styles.tabContent} ${
                        activeTab === index ? styles.show : styles.hide
                    }`}
                >
                    {content}
                </div>
            ))}
        </div>
    );
}
