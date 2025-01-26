import { ReactElement } from "react";
import { Navigate } from "react-router";
import { Roles } from "../../utils";
import { useRoles } from "../../hooks/useRoles";
import { useAuthContext } from "../../hooks";

interface IRoleBasedRedirect {
    allowedRoles: Roles[];
    fallbackRoute: string;
}

interface IRequireAuthProps {
    children: ReactElement;
    roleBasedRedirect: IRoleBasedRedirect;
}

export function AuthGuard({
    children,
    roleBasedRedirect
}: IRequireAuthProps): ReactElement {
    const { isGuest } = useRoles();
    const { roles } = useAuthContext();

    //If guest, send to public route
    if (isGuest) {
        return (
            <Navigate
                to="/public"
                replace
            />
        );
    }

    //Otherwise check if the user lacks necessary roles and redirect to fallback route in that case
    if (
        roles &&
        !roles.some(role => roleBasedRedirect.allowedRoles.includes(role))
    ) {
        return (
            <Navigate
                to={roleBasedRedirect.fallbackRoute}
                replace
            />
        );
    }

    //Otherwise return the aimed for route
    return children;
}
