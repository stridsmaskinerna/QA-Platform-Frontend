import { useContext } from "react";
import { AuthContext } from "../context";

export function useAuthContext() {
    return useContext(AuthContext);
}
