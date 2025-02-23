export function getOneDayOldTimestamp(): string {
    const now = new Date();
    now.setDate(now.getDate() - 1);

    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, "0");
    const day = String(now.getUTCDate()).padStart(2, "0");
    const hours = String(now.getUTCHours()).padStart(2, "0");
    const minutes = String(now.getUTCMinutes()).padStart(2, "0");
    const seconds = String(now.getUTCSeconds()).padStart(2, "0");
    const milliseconds = String(now.getUTCMilliseconds()).padStart(6, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}+00`;
}
