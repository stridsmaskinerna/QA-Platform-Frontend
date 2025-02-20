import { useFetchWithToken } from "./useFetchWithToken";
import { CustomError } from "../../utils";

interface IUseDeleteReturn<T> {
    error: CustomError | null;
    isLoading: boolean;
    clearError: () => void;
    deleteRequest: (
        url: RequestInfo | URL,
        options?: RequestInit,
    ) => Promise<T | void>;
    deleteRequestWithHeaderReturn: <K extends Record<string, unknown>>(
        url: RequestInfo | URL,
        expectedHeaders: (keyof K)[],
        parser: { [U in keyof K]: (value: string | null) => K[U] },
        options?: RequestInit,
    ) => Promise<{ data: T | null; headers: K | null }>;
}

/**
 * A custom hook to send DELETE requests with authentication tokens.
 */
export function useDelete<T>(): IUseDeleteReturn<T> {
    const fetchWithToken = useFetchWithToken<T>();

    /**
     * Wrapper for making a DELETE request.
     */
    const deleteRequest = (url: RequestInfo | URL, options?: RequestInit) => {
        return fetchWithToken.requestHandler(url, {
            ...options,
            method: "DELETE",
        });
    };

    /**
     * Wrapper for making a DELETE request that also extracts response headers.
     */
    const deleteRequestWithHeaderReturn = <K extends Record<string, unknown>>(
        url: RequestInfo | URL,
        expectedHeaders: (keyof K)[],
        parser: { [U in keyof K]: (value: string | null) => K[U] },
        options?: RequestInit,
    ) => {
        return fetchWithToken.requestHandlerWithHeaderReturn<K>(
            url,
            expectedHeaders,
            parser,
            { ...options, method: "DELETE" },
        );
    };

    return {
        isLoading: fetchWithToken.isLoading,
        error: fetchWithToken.error,
        clearError: fetchWithToken.clearError,
        deleteRequest,
        deleteRequestWithHeaderReturn,
    };
}
