import { useFetchWithToken } from "./useFetchWithToken";
import { CustomError } from "../../utils";

interface IUsePutReturn<T> {
    error: CustomError | null;
    isLoading: boolean;
    clearError: () => void;
    putRequest: (
        url: RequestInfo | URL,
        body?: unknown,
        options?: RequestInit,
    ) => Promise<T | void>;
    putRequestWithHeaderReturn: <K extends Record<string, unknown>>(
        url: RequestInfo | URL,
        expectedHeaders: (keyof K)[],
        parser: { [U in keyof K]: (value: string | null) => K[U] },
        body?: unknown,
        options?: RequestInit,
    ) => Promise<{ data: T | null; headers: K | null }>;
}

/**
 * A custom hook to send PUT requests with authentication tokens.
 */
export function usePUT<T>(): IUsePutReturn<T> {
    const fetchWithToken = useFetchWithToken<T>();

    /**
     * Wrapper for making a PUT request.
     */
    const putRequest = (
        url: RequestInfo | URL,
        body?: unknown,
        options?: RequestInit,
    ) => {
        return fetchWithToken.requestHandler(url, {
            ...options,
            method: "PUT",
            body: body ? JSON.stringify(body) : undefined,
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
        });
    };

    /**
     * Wrapper for making a PUT request that also extracts response headers.
     */
    const putRequestWithHeaderReturn = <K extends Record<string, unknown>>(
        url: RequestInfo | URL,
        expectedHeaders: (keyof K)[],
        parser: { [U in keyof K]: (value: string | null) => K[U] },
        body?: unknown,
        options?: RequestInit,
    ) => {
        return fetchWithToken.requestHandlerWithHeaderReturn<K>(
            url,
            expectedHeaders,
            parser,
            {
                ...options,
                method: "PUT",
                body: body ? JSON.stringify(body) : undefined,
                headers: {
                    "Content-Type": "application/json",
                    ...options?.headers,
                },
            },
        );
    };

    return {
        isLoading: fetchWithToken.isLoading,
        error: fetchWithToken.error,
        clearError: fetchWithToken.clearError,
        putRequest,
        putRequestWithHeaderReturn,
    };
}
