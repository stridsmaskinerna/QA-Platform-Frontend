import { jwtDecode } from "jwt-decode";
import { Roles } from "../types";

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

export function hasTokenExpired(token: string | undefined): boolean {
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

    const decoded = jwtDecode<{ roles: Roles[] }>(token);

    return decoded.roles;
}
