import { useState } from 'react'
import { CustomError } from '../utils';

interface IUseFetchDataReturn<T> {
    error: CustomError | null;
    isLoading: boolean;
    requestHandler: (url: RequestInfo | URL, options?: RequestInit) => Promise<T | void>;
}

export function useFetchData<T>(): IUseFetchDataReturn<T> {
	const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<CustomError | null>(null);

	async function requestHandler(url: RequestInfo | URL, options?: RequestInit) {
        setError(null);
        setIsLoading(true);

        try {
            const response: Response = await fetch(url, options);
            if (!response.ok) {
                throw new CustomError(response.status, `HTTP error! Status: ${response.status}`);
            }
            return await response.json() as T;
        } catch (error) {
            setError(error instanceof CustomError ? error : new CustomError(0, "An unknown error occurred"));
        } finally {
            setIsLoading(false);
        }
	}
	return { isLoading, error, requestHandler };
}
