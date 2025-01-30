import { POSSIBLE_ROLES } from "../data";
import { Role } from "../utils/enums";
import { useAuthContext } from "./useAuthContext";

export function useRoles() {
    const { roles } = useAuthContext();
    const isOnlyAdmin = roles?.includes(Role.Admin) && roles.length === 1;
    const isAdmin = roles?.includes(Role.Admin);
    const isTeacher = roles?.includes(Role.Teacher);
    const isUser = roles?.includes(Role.User);
    const isGuest =
        //Check if roles is not an array
        !Array.isArray(roles) ||
        //If array, check if it is empty
        roles.length === 0 ||
        //If not empty, check that roles doesn't include anything unexpected
        roles.some(r => !POSSIBLE_ROLES.includes(r));

    return {
        isOnlyAdmin,
        isAdmin,
        isTeacher,
        isUser,
        isGuest
    };
}
