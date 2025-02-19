import { useCallback, useRef, useState } from "react";
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
    const { ref: loaderRef } = useIntersectionObserver({
        threshold: 0.8,
        onChange(isIntersecting) {
            if (isIntersecting) {
                pageNrRef.current++;
                void fetchMore(pageNrRef.current);
            }
        },
    });
    const pageNrRef = useRef<number>(1);
    const [hasMore, setHasMore] = useState(false);
    const [paginatedData, setPaginatedData] = useState<T[]>([]);
    //If loading additional questions (i.e pageNr.current > 1) we dont want to set
    //loading state since that will be indicated by the loader at the bottom of
    // the items list
    const isLoading =
        pageNrRef.current === 1 && (unAuthIsLoading || authIsLoading);

    const preparedUrl = url.includes("?")
        ? `${url}&Limit=${limit}`
        : `${url}?Limit=${limit}`;

    const fetchMore = useCallback(
        async (pageNr: number) => {
            const { data, headers } = isGuest
                ? await unAuthRequestHandler(
                      `${preparedUrl}&PageNr=${pageNr}`,
                      [paginationHeader],
                      headerParser,
                  )
                : await authRequestHandler(
                      `${preparedUrl}&PageNr=${pageNr}`,
                      [paginationHeader],
                      headerParser,
                  );

            if (data && headers?.[paginationHeader]) {
                const { TotalPageCount } = headers[paginationHeader];
                setHasMore(TotalPageCount > pageNr);
                setPaginatedData(prev =>
                    pageNr > 1 ? [...prev, ...data] : data,
                );
                if (pageNr === 1) {
                    return data;
                }
            } else {
                console.error(unAuthError ?? authError);
            }
        },
        [
            authError,
            authRequestHandler,
            isGuest,
            preparedUrl,
            unAuthError,
            unAuthRequestHandler,
        ],
    );

    const fetchFromStart = async () => {
        pageNrRef.current = 1;
        const data = await fetchMore(pageNrRef.current);
        return data;
    };

    return {
        loaderRef,
        paginatedData,
        hasMore,
        fetchFromStart,
        isLoading,
    };
}
