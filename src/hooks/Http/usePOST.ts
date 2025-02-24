import { useFetchWithToken } from "./useFetchWithToken";
import { CustomError } from "../../utils";

interface IUsePostReturn<T> {
    error: CustomError | null;
    isLoading: boolean;
    clearError: () => void;
    postRequest: (
        url: RequestInfo | URL,
        body?: unknown,
        options?: RequestInit,
    ) => Promise<T | void>;
    postRequestWithHeaderReturn: <K extends Record<string, unknown>>(
        url: RequestInfo | URL,
        expectedHeaders: (keyof K)[],
        parser: { [U in keyof K]: (value: string | null) => K[U] },
        body?: unknown,
        options?: RequestInit,
    ) => Promise<{ data: T | null; headers: K | null }>;
}

/**
 * A custom hook to send POST requests with authentication tokens.
 */
export function usePOST<T>(): IUsePostReturn<T> {
    const fetchWithToken = useFetchWithToken<T>();

    /**
     * Wrapper for making a POST request.
     */
    const postRequest = (
        url: RequestInfo | URL,
        body?: unknown,
        options?: RequestInit,
    ) => {
        return fetchWithToken.requestHandler(url, {
            ...options,
            method: "POST",
            body: body ? JSON.stringify(body) : undefined,
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
        });
    };

    /**
     * Wrapper for making a POST request that also extracts response headers.
     */
    const postRequestWithHeaderReturn = <K extends Record<string, unknown>>(
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
                method: "POST",
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
        postRequest,
        postRequestWithHeaderReturn,
    };
}
