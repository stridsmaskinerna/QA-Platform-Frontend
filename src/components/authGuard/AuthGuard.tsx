import { ReactElement } from "react";
import { Navigate, Params, useParams } from "react-router";
import { IRoleBasedRedirect } from "../../utils";
import { useQAContext, useRoles } from "../../hooks";
import { GUEST_QUESTION_DETAILS_ROUTE } from "../../data";

interface IRequireAuthProps {
    children: ReactElement;
    roleBasedRedirect: IRoleBasedRedirect;
}

//The idea behind this is that if a logged in user shares a link of a question and
//a guest user uses that link, the guest should be taken to the corresponding question
//as a guest, and we need to append the questionId to the guest route here.
const createRedirectUrl = (
    params: Readonly<Params<string>>,
    fallbackRoute: string,
): string => {
    if (fallbackRoute === GUEST_QUESTION_DETAILS_ROUTE) {
        return fallbackRoute + (params?.questionId ?? "");
    }

    return fallbackRoute;
};

export function AuthGuard({
    children,
    roleBasedRedirect,
}: IRequireAuthProps): ReactElement {
    const { isRolesCorrupt } = useRoles();
    const {
        authContext: { roles, isLoading },
    } = useQAContext();
    const params = useParams();
    const redirectUrl = createRedirectUrl(
        params,
        roleBasedRedirect.fallbackRoute,
    );

    //We wait for the AuthContext to load and decode a possible token into a roles before running validation logic
    if (isLoading) {
        return <></>;
    }

    // //Check if roles include anything unexpected or lacks necessary roles for the route and redirect to fallback route in that case
    if (
        isRolesCorrupt ||
        !roles?.some(role => roleBasedRedirect.allowedRoles.includes(role))
    ) {
        return (
            <Navigate
                to={redirectUrl}
                replace
            />
        );
    }
    //Otherwise return the aimed for route
    return children;
}
