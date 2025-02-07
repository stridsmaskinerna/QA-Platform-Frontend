import { useContext } from "react";
import { AuthContext, LoaderContext } from "../context";

export function useQAContext() {
    const authContext = useContext(AuthContext);
    const loaderContext = useContext(LoaderContext);

    return { authContext, loaderContext };
}
