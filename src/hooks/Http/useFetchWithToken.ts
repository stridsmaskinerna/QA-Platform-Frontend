import { useCallback, useState } from "react";
import {
    addTokenToRequestInit,
    CustomError,
    hasTokenExpired,
    ITokens,
} from "../../utils";
import { useLocalStorage } from "usehooks-ts";
import {
    LOCAL_STORAGE_TOKEN_KEY,
    LOGIN_REGISTER_ROUTE,
    refreshTokens,
} from "../../data";
import { useNavigate } from "react-router";

interface IUseFetchWithTokenReturn<T> {
    error: CustomError | null;
    isLoading: boolean;
    clearError: () => void;
    requestHandler: (
        url: RequestInfo | URL,
        options?: RequestInit,
    ) => Promise<T | void>;
    requestHandlerWithError: (
        url: RequestInfo | URL,
        options?: RequestInit,
    ) => Promise<{ result: T | void, error: CustomError | null}>;
    requestHandlerWithHeaderReturn: <K extends Record<string, unknown>>(
        url: RequestInfo | URL,
        expectedHeaders: (keyof K)[],
        parser: { [U in keyof K]: (value: string | null) => K[U] },
        options?: RequestInit,
    ) => Promise<{ data: T | null; headers: K | null }>;
}

export function useFetchWithToken<T>(): IUseFetchWithTokenReturn<T> {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [tokens, setTokens, clearTokens] = useLocalStorage<ITokens | null>(
        LOCAL_STORAGE_TOKEN_KEY,
        null,
    );
    const [error, setError] = useState<CustomError | null>(null);
    const navigate = useNavigate();

    const clearError = () => {
        setError(null);
    };

    // This function is generated based on the parameters to the useFetchWithToken and it's used internally by the requestFunc.
    const generatedFetch = useCallback(
        async (
            accessToken: string | undefined,
            url: RequestInfo | URL,
            options?: RequestInit,
        ): Promise<Response> => {
            if (!accessToken) {
                throw new Error("There is no accessToken in the tokens field");
            }
            const requestInit: RequestInit = addTokenToRequestInit(
                accessToken,
                options,
            );

            setIsLoading(true);       
            let response: Response;
            
            try {
                response = await fetch(url, requestInit);

                if (response.ok === false) {
                    throw new CustomError(response.status, response.statusText);
                }

            } finally {
                setIsLoading(false)
            }
            
            return response;
        },
        [],
    );

    const requestHandlerWithError = useCallback(
        async (url: RequestInfo | URL, options?: RequestInit) => {
            if (!tokens) {
                throw new Error("There is no tokens to make this request");
            }

            setError(null);
            setIsLoading(true);

            let result: T | void = undefined;
            let resultError: CustomError | null = null;

            const tokenIsExpired: boolean = hasTokenExpired(tokens.accessToken);
            
            if (tokenIsExpired) {
                await navigate(LOGIN_REGISTER_ROUTE, {
                    replace: true,
                });
                clearTokens();
            } else {
                try {
                    const response = await generatedFetch(
                        tokens.accessToken,
                        url,
                        options,
                    );
                    
                    const contentType = response.headers.get("content-type");
                    
                    if (contentType?.includes("application/json")) {
                        result = (await response.json()) as T;
                    }
                } catch (error) {
                    if (error instanceof CustomError) {
                        resultError = error;
                        if (error.errorCode === 401) {
                            await navigate(LOGIN_REGISTER_ROUTE, {
                                replace: true,
                            });
                            clearTokens();
                        }
                        setError(error);
                    } else {
                        throw error;
                    }
                } finally {
                    setIsLoading(false);
                }
            }
            return { result, error: resultError }
        },
        [
            clearTokens,
            generatedFetch,
            navigate,
            tokens,
        ],
    );

    const requestHandler = useCallback(
        async (url: RequestInfo | URL, options?: RequestInit) => {
            const { result } = await requestHandlerWithError(url, options);
            return result;
        },
        [requestHandlerWithError],
    );

    const requestHandlerWithHeaderReturn = useCallback(
        async <K extends Record<string, unknown>>(
            url: RequestInfo | URL,
            expectedHeaders: (keyof K)[],
            parser: { [U in keyof K]: (value: string | null) => K[U] },
            options?: RequestInit,
        ) => {
            if (!tokens) {
                throw new Error("There is no tokens to make this request");
            }
            setError(null);
            setIsLoading(true);
            try {
                const response = await generatedFetch(
                    tokens.accessToken,
                    url,
                    options,
                );
                // Extract headers
                const headersObject = Object.fromEntries(
                    expectedHeaders.map(header => [
                        header,
                        response.headers.get(header as string),
                    ]),
                ) as Record<string, string | null>;

                const typedHeaders = Object.fromEntries(
                    Object.entries(headersObject).map(([key, value]) => [
                        key,
                        parser[key as keyof K](value),
                    ]),
                ) as K;

                const data = (await response.json()) as T;
                return { data, headers: typedHeaders };
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
                return { data: null, headers: null };
            } finally {
                setIsLoading(false);
            }
        },
        [clearTokens, generatedFetch, navigate, tokens],
    );

    return {
        isLoading,
        error,
        clearError,
        requestHandler,
        requestHandlerWithError,
        requestHandlerWithHeaderReturn,
    };
}
