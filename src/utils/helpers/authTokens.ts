import { jwtDecode } from "jwt-decode";
import { IUserDetails, Role } from "..";

export function addTokenToRequestInit(
    accessToken?: string,
    options?: RequestInit,
): RequestInit {
    const requestObject: RequestInit = { ...options };

    if (accessToken) {
        requestObject.headers = {
            ...options?.headers,
            Authorization: `Bearer ${accessToken}`,
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

export function getValuesFromToken(token?: string): IUserDetails | undefined {
    if (!token) {
        //This will cause the useEffect in AuthContext to set all userdetails to undefined
        return undefined;
    }

    const rolesClaimKey =
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    const decoded = jwtDecode<
        Omit<IUserDetails, "roles"> & { [rolesClaimKey]: string | string[] }
    >(token);

    const roles = Array.isArray(decoded[rolesClaimKey])
        ? (decoded[rolesClaimKey] as Role[])
        : ([decoded[rolesClaimKey]] as Role[]);

    return {
        roles,
        userId: decoded.userId,
        username: decoded.username,
    };
}
