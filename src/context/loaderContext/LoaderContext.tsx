import { createContext, ReactElement, ReactNode, useState } from "react";
import { ILoaderContext } from "../../utils";

interface ILoaderProviderProps {
    children: ReactNode;
}

const LoaderContext = createContext<ILoaderContext>({} as ILoaderContext);

function LoaderProvider({ children }: ILoaderProviderProps): ReactElement {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoaderContext.Provider>
    );
}

export { LoaderContext, LoaderProvider };
