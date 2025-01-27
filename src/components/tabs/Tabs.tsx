import { useState } from "react";

interface ITabsProps {
    titles: string[];
}

export function Tabs({ titles }: ITabsProps) {
    const [selectedTab, setSelectedTab] = useState<string>(titles[0] + "0");
    if (titles.length) {
        return (
            <>
                <div
                    role="tablist"
                    aria-label="Tab Selection"
                >
                    {titles.map((title, idx) => {
                        const tabId = title + idx;

                        return (
                            <button
                                key={tabId}
                                role="tab"
                                id={`tab-${idx + 1}`}
                                aria-controls={`tab-panel-${idx + 1}`}
                                aria-selected={
                                    selectedTab === tabId ? "true" : "false"
                                }
                            >
                                {title}
                            </button>
                        );
                    })}
                </div>
                <div
                    id="tab-panel-1"
                    role="tabpanel"
                    aria-labelledby="tab-1"
                    hidden
                >
                    Content for Tab 1
                </div>
            </>
        );
    }

    console.error("titles cant be an empty array");
}
