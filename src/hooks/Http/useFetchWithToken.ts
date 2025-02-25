import { useCallback, useState } from "react";
import {
    addTokenToRequestInit,
    CustomError,
    hasTokenExpired,
    IProblemDetail,
    ITokens,
} from "../../utils";
import { useLocalStorage } from "usehooks-ts";
import { LOCAL_STORAGE_TOKEN_KEY, LOGIN_REGISTER_ROUTE } from "../../data";
import { useNavigate } from "react-router";

interface IUseFetchWithTokenReturn<T> {
    error: CustomError | null;
    isLoading: boolean;
    clearError: () => void;
    requestHandler: (
        url: RequestInfo | URL,
        options?: RequestInit,
    ) => Promise<T | void>;
    requestHandlerWithHeaderReturn: <K extends Record<string, unknown>>(
        url: RequestInfo | URL,
        expectedHeaders: (keyof K)[],
        parser: { [U in keyof K]: (value: string | null) => K[U] },
        options?: RequestInit,
    ) => Promise<{ data: T | null; headers: K | null }>;
    requestHandlerWithError: (
        url: RequestInfo | URL,
        options?: RequestInit,
    ) => Promise<{ response: T | void; error: CustomError | null }>;
    requestHandlerWithHeaderAndError: <K extends Record<string, unknown>>(
        url: RequestInfo | URL,
        expectedHeaders: (keyof K)[],
        parser: { [U in keyof K]: (value: string | null) => K[U] },
        options?: RequestInit,
    ) => Promise<{
        data: T | null;
        headers: K | null;
        error: CustomError | null;
    }>;
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

            const response = await fetch(url, requestInit);
            if (response.ok === false) {
                const erroBody = (await response.json()) as IProblemDetail;

                throw new CustomError(
                    response.status,
                    response.statusText,
                    erroBody.detail,
                );
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

            let responseResult: T | void = undefined;
            let responseError: CustomError | null = null;

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
                        responseResult = (await response.json()) as T;
                    }
                } catch (error) {
                    if (error instanceof CustomError) {
                        responseError = error;
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
            return { response: responseResult, error: responseError };
        },
        [clearTokens, generatedFetch, navigate, tokens],
    );

    const requestHandlerWithHeaderAndError = useCallback(
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

            let data: T | null = null;
            let responseError: CustomError | null = null;
            let headers: K | null = null;

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
                        response?.headers.get(header as string),
                    ]),
                ) as Record<string, string | null>;

                headers = Object.fromEntries(
                    Object.entries(headersObject).map(([key, value]) => [
                        key,
                        parser[key as keyof K](value),
                    ]),
                ) as K;

                data = (await response.json()) as T;
            } catch (error) {
                if (error instanceof CustomError) {
                    responseError = error;
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
            return { data, headers, error: responseError };
        },
        [clearTokens, generatedFetch, navigate, tokens],
    );

    const requestHandler = useCallback(
        async (url: RequestInfo | URL, options?: RequestInit) => {
            const { response: result } = await requestHandlerWithError(
                url,
                options,
            );
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
            const { data, headers } = await requestHandlerWithHeaderAndError(
                url,
                expectedHeaders,
                parser,
                options,
            );
            return { data, headers };
        },
        [requestHandlerWithHeaderAndError],
    );

    return {
        isLoading,
        error,
        clearError,
        requestHandler,
        requestHandlerWithHeaderReturn,
        requestHandlerWithError,
        requestHandlerWithHeaderAndError,
    };
}
