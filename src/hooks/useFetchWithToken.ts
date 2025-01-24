import { useState } from "react";
import {
    addTokenToRequestInit,
    CustomError,
    hasTokenExpired,
    ITokens,
    refreshTokens
} from "../utils";
import { useLocalStorage } from "usehooks-ts";
import { LOCAL_STORAGE_TOKEN_KEY } from "../data";

interface IUseFetchWithTokenReturn<T> {
    error: CustomError | null;
    isLoading: boolean;
    requestFunc: () => Promise<T | void>;
}

export function useFetchWithToken<T>(
    url: RequestInfo | URL,
    options?: RequestInit
): IUseFetchWithTokenReturn<T> {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [tokens, setTokens, clearTokens] = useLocalStorage<ITokens | null>(
        LOCAL_STORAGE_TOKEN_KEY,
        null
    );
    const [error, setError] = useState<CustomError | null>(null);

    // This function is generated based on the parameters to the useFetchWithToken and it's used internally by the requestFunc.
    async function generatedFetch<T>(accessToken: string): Promise<T> {
        const requestInit: RequestInit = addTokenToRequestInit(
            accessToken,
            options
        );
        const response: Response = await fetch(url, requestInit);

        if (response.ok === false) {
            throw new CustomError(response.status, response.statusText);
        }

        return (await response.json()) as T;
    }

    async function requestFunc() {
        setError(null);
        setIsLoading(true);

        const tokenIsExpired: boolean = hasTokenExpired(tokens!.accessToken);
        // Ask api to refresh accesstoken before fetching the data if accesstoken has expired.
        if (tokenIsExpired) {
            try {
                const refreshedTokens = await refreshTokens(tokens!);
                setTokens(refreshedTokens);
                const data = await generatedFetch<T>(
                    refreshedTokens.accessToken
                );
                return data;
            } catch (error) {
                if (error instanceof CustomError) {
                    setError(error);
                    //If the attempt to refresh token fails with 401 unauthorized, then probably
                    //the refreshtoken has expired, so we clear the tokens in localStorage
                    if (error.errorCode === 401) {
                        clearTokens();
                    }
                }
            } finally {
                setIsLoading(false);
            }
            // Else just fetch the data right away
        } else {
            try {
                const data = await generatedFetch<T>(tokens!.accessToken);
                return data;
            } catch (error) {
                if (error instanceof CustomError) {
                    setError(error);
                }
            } finally {
                setIsLoading(false);
            }
        }
    }

    return { isLoading, error, requestFunc };
}
