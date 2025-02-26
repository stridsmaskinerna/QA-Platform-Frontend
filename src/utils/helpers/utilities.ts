import { TFunction } from "i18next";

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
    t: TFunction<"translation", undefined>,
): string => {
    const createdDate = new Date(created);
    const now = new Date();
    const diffInSeconds = Math.floor(
        (now.getTime() - createdDate.getTime()) / 1000,
    );
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 60) return t("utilities.lessThanMinuteAgo");
    if (diffInMinutes === 1) return t("utilities.oneMinuteAgo");
    if (diffInMinutes < 60)
        return t("utilities.minutesAgo", { minutes: diffInMinutes });
    if (diffInHours === 1) return t("utilities.oneHourAgo");
    if (diffInHours < 24)
        return t("utilities.hoursAgo", { hours: diffInHours });
    if (diffInDays === 1) return t("utilities.oneDayAgo");
    return t("utilities.daysAgo", { days: diffInDays });
};
