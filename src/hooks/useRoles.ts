import { useAuthContext } from "./useAuthContext";

export function useRoles() {
    const { roles } = useAuthContext();

    const isOnlyAdmin = roles?.includes("Admin") && roles.length === 1;
    const isAdmin = roles?.includes("Admin");
    const isTeacher = roles?.includes("Teacher");
    const isGuest = !roles || roles.length === 0;
    const isUser = roles?.includes("User");

    return { isOnlyAdmin, isAdmin, isTeacher, isGuest, isUser };
}
