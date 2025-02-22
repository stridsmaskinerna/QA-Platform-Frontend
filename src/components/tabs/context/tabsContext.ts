import { createContext, useContext } from "react";

// Define context type
interface TabsContextType {
    activeTab: number;
    setActiveTab: (tabIdx: number) => void;
}

// Create the context (no default value, ensures it's used inside a provider)
export const TabsContext = createContext<TabsContextType | undefined>(
    undefined,
);

// Custom hook for consuming the context
export const useTabs = () => {
    const context = useContext(TabsContext);
    return context;
};
