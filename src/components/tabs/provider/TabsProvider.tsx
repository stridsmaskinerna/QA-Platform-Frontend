import { ReactNode, useState } from "react";
import { TabsContext } from "..";

export function TabsProvider({ children }: { children: ReactNode }) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            {children}
        </TabsContext.Provider>
    );
}
