import { useFetchWithToken } from "./useFetchWithToken";
import { CustomError } from "../../utils";

interface IUseGetReturn<T> {
    error: CustomError | null;
    isLoading: boolean;
    clearError: () => void;
    getRequest: (
        url: RequestInfo | URL,
        options?: RequestInit,
    ) => Promise<T | void>;
    getRequestWithHeaderReturn: <K extends Record<string, unknown>>(
        url: RequestInfo | URL,
        expectedHeaders: (keyof K)[],
        parser: { [U in keyof K]: (value: string | null) => K[U] },
        options?: RequestInit,
    ) => Promise<{ data: T | null; headers: K | null }>;
    getRequestWithError: (
        url: RequestInfo | URL,
        options?: RequestInit,
    ) => Promise<{ response: T | void; error: CustomError | null }>;

    getRequestWithHeaderAndError: <K extends Record<string, unknown>>(
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

/**
 * A custom hook to send GET requests with authentication tokens.
 */
export function useGet<T>(): IUseGetReturn<T> {
    const fetchWithToken = useFetchWithToken<T>();

    /**
     * Wrapper for making a GET request.
     */
    const getRequest = (url: RequestInfo | URL, options?: RequestInit) => {
        return fetchWithToken.requestHandler(url, {
            ...options,
            method: "GET",
        });
    };

    /**
     * Wrapper for making a GET request that also extracts response headers.
     */
    const getRequestWithHeaderReturn = <K extends Record<string, unknown>>(
        url: RequestInfo | URL,
        expectedHeaders: (keyof K)[],
        parser: { [U in keyof K]: (value: string | null) => K[U] },
        options?: RequestInit,
    ) => {
        return fetchWithToken.requestHandlerWithHeaderReturn<K>(
            url,
            expectedHeaders,
            parser,
            {
                ...options,
                method: "GET",
            },
        );
    };

    /**
     * Wrapper for making a GET request with error.
     */
    const getRequestWithError = (
        url: RequestInfo | URL,
        options?: RequestInit,
    ) => {
        return fetchWithToken.requestHandlerWithError(url, {
            ...options,
            method: "GET",
        });
    };

    /**
     * Wrapper for making a GET request with error that also extracts response headers.
     */
    const getRequestWithHeaderAndError = <K extends Record<string, unknown>>(
        url: RequestInfo | URL,
        expectedHeaders: (keyof K)[],
        parser: { [U in keyof K]: (value: string | null) => K[U] },
        options?: RequestInit,
    ) => {
        return fetchWithToken.requestHandlerWithHeaderAndError<K>(
            url,
            expectedHeaders,
            parser,
            { ...options, method: "GET" },
        );
    };

    return {
        isLoading: fetchWithToken.isLoading,
        error: fetchWithToken.error,
        clearError: fetchWithToken.clearError,
        getRequest,
        getRequestWithHeaderReturn,
        getRequestWithError,
        getRequestWithHeaderAndError,
    };
}
