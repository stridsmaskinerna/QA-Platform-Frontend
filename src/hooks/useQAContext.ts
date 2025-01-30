import { useContext } from "react";
import { AuthContext } from "../context";
import { LoaderContext } from "../context/loaderContext/LoaderContext";

export function useQAContext() {
    const authContext = useContext(AuthContext);
    const loaderContext = useContext(LoaderContext);

    return { authContext, loaderContext };
}
