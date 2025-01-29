import { POSSIBLE_ROLES } from "../data";
import { Role } from "../utils/enums";
import { useAuthContext } from "./useAuthContext";

export function useRoles() {
    const { roles } = useAuthContext();

    const isOnlyAdmin = roles?.includes(Role.Admin) && roles.length === 1;
    const isAdmin = roles?.includes(Role.Admin);
    const isTeacher = roles?.includes(Role.Teacher);
    const isGuest =
        !roles ||
        roles.length === 0 ||
        roles.some(r => !POSSIBLE_ROLES.includes(r));
    const isUser = roles?.includes(Role.User);

    return { isOnlyAdmin, isAdmin, isTeacher, isGuest, isUser };
}
