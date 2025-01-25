import { jwtDecode } from "jwt-decode";
import { Roles } from "../types";
import { POSSIBLE_ROLES } from "../../data";

export function addTokenToRequestInit(
    accessToken?: string,
    options?: RequestInit
): RequestInit {
    const requestObject: RequestInit = { ...options };

    if (accessToken) {
        requestObject.headers = {
            ...options?.headers,
            Authorization: `Bearer ${accessToken}`
        };
    }

    return requestObject;
}

export function hasTokenExpired(token: string): boolean {
    if (!token) return true;

    const decoded = jwtDecode(token);
    //TODO Check that backend sends the exp-field as seconds, otherwise adjust next line accordingly
    const expire = decoded.exp! * 1000; // * 1000 to get time in milliseconds.
    const currentTimestamp = Date.now();

    return expire < currentTimestamp;
}

export function getRolesFromToken(
    token: string | undefined
): Roles[] | undefined {
    if (!token) {
        return undefined;
    }

    const decoded = jwtDecode<{ roles: string[] }>(token);
    const validRoles = decoded.roles.filter(r =>
        POSSIBLE_ROLES.includes(r as Roles)
    ) as Roles[];

    if (validRoles.length === 0) {
        return undefined;
    }

    return validRoles;
}
