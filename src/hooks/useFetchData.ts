import { useCallback, useState } from "react";
import { CustomError } from "../utils";

interface IUseFetchDataReturn<T> {
    error: CustomError | null;
    isLoading: boolean;
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
}

export function useFetchData<T>(): IUseFetchDataReturn<T> {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<CustomError | null>(null);

    async function requestHandler(
        url: RequestInfo | URL,
        options?: RequestInit,
    ) {
        setError(null);
        setIsLoading(true);

        try {
            const response: Response = await fetch(url, options);
            if (!response.ok) {
                throw new CustomError(
                    response.status,
                    `HTTP error! Status: ${response.status}`,
                );
            }

            return (await response.json()) as T;
        } catch (error) {
            setError(
                error instanceof CustomError
                    ? error
                    : new CustomError(0, "An unknown error occurred"),
            );
        } finally {
            setIsLoading(false);
        }
    }

    const requestHandlerWithHeaderReturn = useCallback(
        async <K extends Record<string, unknown>>(
            url: RequestInfo | URL,
            expectedHeaders: (keyof K)[],
            parser: { [U in keyof K]: (value: string | null) => K[U] },
            options?: RequestInit,
        ) => {
            setError(null);
            setIsLoading(true);
            try {
                const response: Response = await fetch(url, options);
                if (!response.ok) {
                    throw new CustomError(
                        response.status,
                        `HTTP error! Status: ${response.status}`,
                    );
                }
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
                setError(
                    error instanceof CustomError
                        ? error
                        : new CustomError(0, "An unknown error occurred"),
                );
                return { data: null, headers: null };
            } finally {
                setIsLoading(false);
            }
        },
        [],
    );

    return { isLoading, error, requestHandler, requestHandlerWithHeaderReturn };
}
