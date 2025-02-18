import { useEffect, useRef, useState } from "react";
import { useRoles } from "./useRoles";
import { useIntersectionObserver } from "usehooks-ts";
import { useFetchData } from "./useFetchData";
import { useFetchWithToken } from "./useFetchWithToken";

interface IUseInfiniteScrollingProps {
    url: string;
    limit: number;
}

export function useInfiniteScrolling<T>({
    url,
    data,
    totalItemCount,
    limit,
}: IUseInfiniteScrollingProps) {
    const { isGuest } = useRoles();
    const {
        requestHandler: unAuthRequestHandler,
        isLoading: unAuthIsLoading,
        error: unAuthError,
    } = useFetchData<T[]>();
    const {
        requestHandler: authRequestHandler,
        isLoading: authIsLoading,
        error: authError,
    } = useFetchWithToken<T[]>();
    const { isIntersecting, ref: loaderRef } = useIntersectionObserver();
    const [pageNr, setPageNr] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [paginatedData, setPaginatedData] = useState<T[]>([]);

    const preparedUrl = url.includes("?")
        ? `${url}&limit=${limit}&pageNr=${pageNr}`
        : `${url}?limit=${limit}&pageNr=${pageNr}`;

    const fetchMore = async () => {
        const data = isGuest
            ? await unAuthRequestHandler(preparedUrl)
            : await authRequestHandler(preparedUrl);

        if (data) {
        }
    };

    useEffect(() => {
        if (page * limit < totalItemCount) {
        } else {
            setHasMore(false);
        }
    }, [isIntersecting]);

    return {
        loaderRef,
        paginatedData,
        hasMore,
        isLoading: authIsLoading || unAuthIsLoading,
    };
}
