import { CSSProperties, useEffect, useState } from "react";

import styles from "./Tabs.module.css";
import { TabButtons, TabButtonsMobile } from ".";
import { ITab } from "../../utils";

//Used internally in the tabs component
export interface ITabButtonsProps {
    tabBtns: {
        title: string;
        index: number;
        btnStyle?: CSSProperties;
    }[];
    activeTab: number;
    handleTabClick: (idx: number) => void;
}

interface ITabsProps {
    tabs: ITab[];
    tabBtnsContainerStyle?: CSSProperties;
    containerStyle?: CSSProperties;
    collapseWidth?: number;
}

//You can optionally pass styles to most elements of this component. But most
// importantly you can pass a collapseWidth number prop to control at what viewport width
// (in px) the tab-buttons will collapse into a dropdown menu. If passing styles as prop
// remember to check that it looks good when tabButtons are in menu state also.
export function Tabs({
    tabs,
    //Style for the container holding the tab buttons
    tabBtnsContainerStyle,
    //Style for the outermost container of this component
    containerStyle,
    //The limit viewport width in px of which the tab buttons collapses into a menu
    collapseWidth
}: ITabsProps) {
    const [activeTab, setActiveTab] = useState(tabs[0].index);
    const [isViewportSmall, setIsViewportSmall] = useState(false);

    const handleTabClick = (idx: number) => {
        setActiveTab(idx);
    };

    // Listen for window resize events given a prop passed to this component
    useEffect(() => {
        const mediaQuery = window.matchMedia(`(max-width: ${collapseWidth}px)`);

        const handleResize = () => {
            if (collapseWidth !== undefined) {
                // Update the state based on media query
                setIsViewportSmall(mediaQuery.matches);
            }
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
            <div
                style={tabBtnsContainerStyle}
                className={`${styles.btnsContainer} ${isViewportSmall ? styles.noBorder : ""}`}
            >
                {isViewportSmall ? (
                    <TabButtonsMobile
                        tabBtns={tabs}
                        activeTab={activeTab}
                        handleTabClick={handleTabClick}
                    />
                ) : (
                    <TabButtons
                        tabBtns={tabs}
                        activeTab={activeTab}
                        handleTabClick={handleTabClick}
                    />
                )}
            </div>

            {tabs.map(({ content, index, contentContainerStyle }) => (
                <div
                    style={contentContainerStyle}
                    key={index}
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
