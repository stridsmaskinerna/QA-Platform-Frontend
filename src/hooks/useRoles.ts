import { Role } from "../utils";
import { useQAContext } from ".";

export function useRoles() {
    const {
        authContext: { roles }
    } = useQAContext();

    const POSSIBLE_ROLES: Role[] = [Role.Admin, Role.Teacher, Role.User];
    //check if roles include anything unexpected
    const isRolesCorrupt = roles?.some(r => !POSSIBLE_ROLES.includes(r));
    const isOnlyAdmin = roles?.includes(Role.Admin) && roles.length === 1;
    const isAdmin = roles?.includes(Role.Admin);
    const isTeacher = roles?.includes(Role.Teacher);
    const isUser = roles?.includes(Role.User);
    const isGuest =
        //Check if roles is not an array
        !Array.isArray(roles) ||
        //If array, check if it is empty
        roles.length === 0 ||
        //If not empty, check if roles doesn't include anything unexpected
        isRolesCorrupt;

    return {
        isOnlyAdmin,
        isAdmin,
        isTeacher,
        isUser,
        isGuest,
        POSSIBLE_ROLES,
        isRolesCorrupt
    };
}
