import { jwtDecode } from "jwt-decode";
import { IUserDetails } from "../interfaces";
import { Roles } from "..";

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

export function getValuesFromToken(
    token: string | undefined
): IUserDetails | undefined {
    if (!token) {
        return undefined;
    }

    const decoded = jwtDecode<Omit<IUserDetails, "roles"> & { roles: string }>(
        token
    );

    return {
        ...decoded,
        roles: decoded.roles.split(",").filter(s => s) as Roles[]
    };
}

export function removePropertiesFromObject<T, K extends keyof T>(
    obj: T,
    ...properties: K[]
) {
    const result = { ...obj };
    for (const prop of properties) {
        delete result[prop];
    }
    return result as Omit<T, K>;
}
