import { useCallback, useState } from "react";
import {
    addTokenToRequestInit,
    CustomError,
    hasTokenExpired,
    ITokens,
} from "../utils";
import { useLocalStorage } from "usehooks-ts";
import {
    LOCAL_STORAGE_TOKEN_KEY,
    LOGIN_REGISTER_ROUTE,
    refreshTokens,
} from "../data";
import { useNavigate } from "react-router";

interface IUseFetchWithTokenReturn<T> {
    error: CustomError | null;
    isLoading: boolean;
    requestHandler: (url: RequestInfo | URL) => Promise<T | void>;
}

export function useFetchWithToken<T>(
    options?: RequestInit,
    checkIfTokenNeedsRefresh = false,
): IUseFetchWithTokenReturn<T> {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [tokens, setTokens, clearTokens] = useLocalStorage<ITokens | null>(
        LOCAL_STORAGE_TOKEN_KEY,
        null,
    );
    const [error, setError] = useState<CustomError | null>(null);
    const navigate = useNavigate();

    // This function is generated based on the parameters to the useFetchWithToken and it's used internally by the requestFunc.
    const generatedFetch = useCallback(
        async <T>(
            accessToken: string | undefined,
            url: RequestInfo | URL,
        ): Promise<T> => {
            if (!accessToken) {
                throw new Error("There is no accessToken in the tokens field");
            }
            const requestInit: RequestInit = addTokenToRequestInit(
                accessToken,
                options,
            );
            const response: Response = await fetch(url, requestInit);

            if (response.ok === false) {
                throw new CustomError(response.status, response.statusText);
            }

            return (await response.json()) as T;
        },
        [options],
    );

    const requestHandler = useCallback(
        async (url: RequestInfo | URL) => {
            if (!tokens) {
                throw new Error("There is no tokens to make this request");
            }

            setError(null);
            setIsLoading(true);

            const tokenIsExpired: boolean = hasTokenExpired(tokens.accessToken);
            // Ask api to refresh accesstoken before fetching the data if accesstoken has expired.
            if (checkIfTokenNeedsRefresh && tokenIsExpired) {
                try {
                    const refreshedTokens = await refreshTokens(tokens);
                    setTokens(refreshedTokens);
                    const data = await generatedFetch<T>(
                        refreshedTokens.accessToken,
                        url,
                    );
                    return data;
                } catch (error) {
                    if (error instanceof CustomError) {
                        setError(error);
                        //If the attempt to refresh token fails with 401 unauthorized, then probably
                        //the refreshtoken has expired, so we clear the tokens in localStorage
                        //and send the user to the login screen
                        if (error.errorCode === 401) {
                            await navigate(LOGIN_REGISTER_ROUTE, {
                                replace: true,
                            });
                            clearTokens();
                        }
                    } else {
                        throw error;
                    }
                } finally {
                    setIsLoading(false);
                }
                // Else just fetch the data right away
            } else {
                try {
                    const data = await generatedFetch<T>(
                        tokens.accessToken,
                        url,
                    );
                    return data;
                } catch (error) {
                    if (error instanceof CustomError) {
                        //THIS CAN BE REMOVED AFTER REFRESH-TOKEN FUNCTIONALITY IS IMPLEMENTED
                        if (error.errorCode === 401) {
                            await navigate(LOGIN_REGISTER_ROUTE, {
                                replace: true,
                            });
                            clearTokens();
                        }
                        //-------------------------------------------------------------------
                        setError(error);
                    } else {
                        throw error;
                    }
                } finally {
                    setIsLoading(false);
                }
            }
        },
        [
            checkIfTokenNeedsRefresh,
            clearTokens,
            generatedFetch,
            navigate,
            setTokens,
            tokens,
        ],
    );

    return { isLoading, error, requestHandler };
}
