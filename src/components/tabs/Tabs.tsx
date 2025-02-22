import { CSSProperties, useEffect, useRef, useState } from "react";
import styles from "./Tabs.module.css";
import { TabButtons, TabButtonsMobile, useTabs } from ".";
import { ITab } from "../../utils";
import { useMediaQuery } from "usehooks-ts";

//Used internally in the tabs component
export interface ITabButtonsProps {
    tabBtns: {
        title: string;
        idx: number;
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
    startingTabIdx?: number;
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
    collapseWidth,
}: ITabsProps) {
    if (!tabs.length) {
        throw new Error("Must supply at least on element in tabs prop");
    }
    const tabsContext = useTabs();
    //We use btnsContainerRef to read the height of the buttonsContainer and apply it as
    //top attribute to the content to ensure the content is rendered UNDERNEATH the tab buttons.
    const btnsContainerRef = useRef<HTMLDivElement>(null);
    const tabsWithIdx = tabs.map((t, idx) => ({ ...t, idx }));
    const [activeTabLocal, setActiveTabLocal] = useState<number>(
        tabsContext?.activeTab ?? 0,
    );
    const activeTab = tabsContext?.activeTab ?? activeTabLocal;
    const [contentTopAttribute, setContentTopAttribute] = useState(0);
    const isViewportSmall = useMediaQuery(`(max-width: ${collapseWidth}px`);
    const tab = tabsWithIdx.find(t => t.idx === activeTab);
    if (!tab) {
        throw new Error("Tabs components cant find the tab index");
    }
    const { content, contentContainerStyle } = tab;

    const handleTabClick = (idx: number) => {
        if (tabsContext) {
            tabsContext.setActiveTab(idx);
        } else {
            setActiveTabLocal(idx);
        }
        if (tabsWithIdx[idx].tabBtnClickSideEffect) {
            tabsWithIdx[idx].tabBtnClickSideEffect();
        }
    };

    useEffect(() => {
        setContentTopAttribute(btnsContainerRef.current?.offsetHeight ?? 0);
    }, []);

    return (
        <div
            style={containerStyle}
            className={styles.container}
        >
            <div
                ref={btnsContainerRef}
                style={tabBtnsContainerStyle}
                className={`${styles.btnsContainer} ${isViewportSmall ? styles.noBorder : ""}`}
            >
                {isViewportSmall ? (
                    <TabButtonsMobile
                        tabBtns={tabsWithIdx}
                        activeTab={activeTab}
                        handleTabClick={handleTabClick}
                    />
                ) : (
                    <TabButtons
                        tabBtns={tabsWithIdx}
                        activeTab={activeTab}
                        handleTabClick={handleTabClick}
                    />
                )}
            </div>

            <div
                style={{
                    ...contentContainerStyle,
                    top: contentTopAttribute,
                }}
                className={styles.tabContent}
            >
                {content}
            </div>
        </div>
    );
}
