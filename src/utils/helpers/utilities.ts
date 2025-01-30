import { jwtDecode } from "jwt-decode";
import { IUserDetails } from "../interfaces";
import { Roles } from "..";
import { TFunction } from "i18next";

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

export function getValuesFromToken(token: string): IUserDetails {
    const rolesClaimKey =
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    const decoded = jwtDecode<
        Omit<IUserDetails, "roles"> & { [rolesClaimKey]: string | string[] }
    >(token);

    const roles = Array.isArray(decoded[rolesClaimKey])
        ? (decoded[rolesClaimKey] as Roles[])
        : ([decoded[rolesClaimKey]] as Roles[]);

    return {
        roles,
        userId: decoded.userId,
        username: decoded.username
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
export const getTimeAgo = (
    created: string,
    t: TFunction<"translation", undefined>
): string => {
    const createdDate = new Date(created);
    const now = new Date();
    const diffInSeconds = Math.floor(
        (now.getTime() - createdDate.getTime()) / 1000
    );
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 60) return t("lessThanMinuteAgo");
    if (diffInMinutes === 1) return t("oneMinuteAgo");
    if (diffInMinutes < 60) return t("minutesAgo", { minutes: diffInMinutes });
    if (diffInHours === 1) return t("oneHourAgo");
    if (diffInHours < 24) return t("hoursAgo", { hours: diffInHours });
    if (diffInDays === 1) return t("oneDayAgo");
    return t("daysAgo", { days: diffInDays });
};
