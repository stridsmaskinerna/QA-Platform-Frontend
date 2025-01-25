import { ReactElement } from "react";
import { useAuthContext } from "../../hooks";
import { Navigate } from "react-router";
import { POSSIBLE_ROLES } from "../../data";
import { Roles } from "../../utils";

interface IRoleBasedRedirect {
    allowedRoles: Roles[];
    fallbackRoute: string;
}

interface IRequireAuthProps {
    children: ReactElement;
    roleBasedRedirect?: IRoleBasedRedirect;
}

export function AuthGuard({
    children,
    roleBasedRedirect
}: IRequireAuthProps): ReactElement {
    const { roles } = useAuthContext();

    //Check if no roles or if there is an unexpected role and in that case redirect to /public
    if (
        !roles ||
        roles.length === 0 ||
        roles.some(r => !POSSIBLE_ROLES.includes(r))
    ) {
        return (
            <Navigate
                to="/public"
                replace
            />
        );
    }

    // If allowedRoles is provided, check if the user does not have any allowed role
    //and redirect to fallback route in that case
    if (
        roleBasedRedirect &&
        !roles.some(role => roleBasedRedirect.allowedRoles.includes(role))
    ) {
        return (
            <Navigate
                to={roleBasedRedirect.fallbackRoute}
                replace
            />
        );
    }

    return children;
}
