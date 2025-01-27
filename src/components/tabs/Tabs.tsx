import { CSSProperties, ReactElement, useEffect, useState } from "react";

import styles from "./Tabs.module.css";

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

    return (
        <div
            style={containerStyle}
            className={styles.container}
        >
            <div className={styles.tabsContainer}>
                <div
                    style={tabBtnsContainerStyle}
                    role="tablist"
                    aria-label="Tab Selection"
                    className={`${styles.btnsContainer} ${isViewportSmall ? styles.menu : ""}`}
                >
                    {sortedTabs.map(({ title, index }) => (
                        <div
                            className={styles.tabWrapper}
                            key={index}
                            onClick={() => handleTabClick(index)}
                        >
                            {isViewportSmall && activeTab === index && (
                                <div className={styles.arrowContainer}>
                                    <span
                                        className={`${styles.downArrow} ${isMenuExpanded ? styles.upsideDown : ""}`}
                                    />
                                </div>
                            )}
                            <button
                                style={tabBtnStyle}
                                className={`${styles.tabButton} ${isMenuExpanded ? styles.show : styles.hide} ${activeTab === index ? styles.btnActive : ""}`}
                                role="tab"
                                id={`tab-${index}`}
                                aria-controls={`tab-panel-${index}`}
                                aria-selected={activeTab === index}
                            >
                                {title}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {/* Tab Content */}
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
