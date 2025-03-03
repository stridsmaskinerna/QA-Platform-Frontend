import { BASE_URL } from "..";
import {
    CustomError,
    IAuthErrorResponse,
    ILoginCredentials,
    IRegisterFormData,
    ITokens,
} from "../../utils";

export async function loginReq({
    email,
    password,
}: ILoginCredentials): Promise<ITokens> {
    const url = `${BASE_URL}/authentication/login`;

    const response: Response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (response.ok === false) {
        throw new CustomError(response.status, "Could not login");
    }

    return (await response.json()) as ITokens;
}

export async function refreshTokens({
    accessToken,
    refreshToken,
}: ITokens): Promise<ITokens> {
    if (!accessToken || !refreshToken) {
        throw new Error(
            "Refresh request failed because accessToken or refreshToken was undefined",
        );
    }

    const url = `${BASE_URL}/authentication/refresh`;

    const response: Response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            accessToken,
            refreshToken,
        }),
    });

    if (!response.ok) {
        throw new CustomError(
            response.status,
            "Seomthing went wrong with refreshToken request",
        );
    }

    return (await response.json()) as ITokens;
}

export async function registerReq({
    email,
    password,
    username,
}: Omit<IRegisterFormData, "confirmPassword">): Promise<void> {
    const url = `${BASE_URL}/authentication/register`;

    const response: Response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
    });

    if (response.ok === false) {
        const data = (await response.json()) as IAuthErrorResponse;
        throw new CustomError(
            response.status,
            "Could not register",
            data?.detail,
        );
    }
}
