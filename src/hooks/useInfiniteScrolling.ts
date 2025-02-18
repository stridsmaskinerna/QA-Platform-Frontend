import { useEffect, useRef, useState } from "react";
import { useRoles } from "./useRoles";
import { useIntersectionObserver } from "usehooks-ts";
import { useFetchData } from "./useFetchData";
import { useFetchWithToken } from "./useFetchWithToken";
import { IPaginationMeta } from "../utils";

interface IUseInfiniteScrollingProps {
    url: string;
    limit: number;
}

const paginationHeader = "X-Pagination";

const headerParser = {
    [paginationHeader]: (value: string | null) =>
        value ? (JSON.parse(value) as IPaginationMeta) : null,
};

export function useInfiniteScrolling<T>({
    url,
    limit,
}: IUseInfiniteScrollingProps) {
    const { isGuest } = useRoles();
    const {
        requestHandlerWithHeaderReturn: unAuthRequestHandler,
        isLoading: unAuthIsLoading,
        error: unAuthError,
    } = useFetchData<T[]>();
    const {
        requestHandlerWithHeaderReturn: authRequestHandler,
        isLoading: authIsLoading,
        error: authError,
    } = useFetchWithToken<T[]>();
    const { isIntersecting, ref: loaderRef } = useIntersectionObserver();
    const pageNrRef = useRef<number>(1);
    const [hasMore, setHasMore] = useState(true);
    const [paginatedData, setPaginatedData] = useState<T[]>([]);

    const preparedUrl = url.includes("?")
        ? `${url}&limit=${limit}`
        : `${url}?limit=${limit}`;

    const fetchMore = async (pageNr: number) => {
        const { data, headers } = isGuest
            ? await unAuthRequestHandler(
                  `${preparedUrl}&pageNr=${pageNr}`,
                  [paginationHeader],
                  headerParser,
              )
            : await authRequestHandler(
                  `${preparedUrl}&pageNr=${pageNr}`,
                  [paginationHeader],
                  headerParser,
              );

        if (data && headers?.[paginationHeader]) {
            const { totalPageCount } = headers[paginationHeader];
            setHasMore(totalPageCount > pageNr);
            setPaginatedData(prev => (pageNr > 1 ? [...prev, ...data] : data));
        } else {
            console.error(unAuthError ?? authError);
        }
    };

    const fetchFromStart = async () => {
        pageNrRef.current = 1;
        await fetchMore(pageNrRef.current);
    };

    useEffect(() => {
        pageNrRef.current++;
        void fetchMore(pageNrRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isIntersecting]);

    return {
        loaderRef,
        paginatedData,
        hasMore,
        fetchFromStart,
        isLoading: authIsLoading || unAuthIsLoading,
    };
}
