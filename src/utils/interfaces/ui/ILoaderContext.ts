import { Dispatch, SetStateAction } from "react";

export interface ILoaderContext {
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}
