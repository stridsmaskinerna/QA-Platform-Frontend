import { Role } from "../utils";
import { useQAContext } from ".";

export function useRoles() {
    const POSSIBLE_ROLES: Role[] = [Role.Admin, Role.Teacher, Role.User];
    const {
        authContext: { roles }
    } = useQAContext();
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
        isGuest,
        POSSIBLE_ROLES
    };
}
