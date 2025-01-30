import { IAuthErrorResponse } from "./interfaces";

export const isAuthErrorResponse = (
    value: unknown
): value is IAuthErrorResponse =>
    typeof value === "object" &&
    value !== null &&
    "detail" in value &&
    typeof value.detail === "string";
