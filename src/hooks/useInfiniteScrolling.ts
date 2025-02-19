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
    url: urlProp,
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
        threshold: 0.5,
        onChange,
    });

    const { ref: loaderRef2 } = useIntersectionObserver({
        threshold: 0.5,
        onChange,
    });

    const { ref: loaderRef3 } = useIntersectionObserver({
        threshold: 0.5,
        onChange,
    });

    function onChange(isIntersecting: boolean) {
        if (isIntersecting) {
            pageNrRef.current++;
            void fetchMore(pageNrRef.current);
        }
    }

    const pageNrRef = useRef<number>(1);
    const [hasMore, setHasMore] = useState(false);
    const [totalItemCount, setTotalItemCount] = useState<number>();
    const [paginatedData, setPaginatedData] = useState<T[]>([]);
    //If loading additional questions (i.e pageNr.current > 1) we dont want to set
    //loading state since that will be indicated by the loader at the bottom of
    // the items list
    const isLoading =
        pageNrRef.current === 1 && (unAuthIsLoading || authIsLoading);

    const fetchMore = useCallback(
        async (pageNr: number, urlArg?: string) => {
            if (!urlArg && !urlProp) {
                throw new Error(
                    "Used infinite scrolling hook without supplying url as neither prop nor argument",
                );
            }
            const baseUrl = urlArg ?? urlProp;

            const preparedUrl = baseUrl.includes("?")
                ? `${baseUrl}&Limit=${limit}&PageNr=${pageNr}`
                : `${baseUrl}?Limit=${limit}&PageNr=${pageNr}`;

            const { data, headers } = isGuest
                ? await unAuthRequestHandler(
                      preparedUrl,
                      [paginationHeader],
                      headerParser,
                  )
                : await authRequestHandler(
                      preparedUrl,
                      [paginationHeader],
                      headerParser,
                  );

            if (data && headers?.[paginationHeader]) {
                const { TotalPageCount, TotalItemCount } =
                    headers[paginationHeader];
                setTotalItemCount(TotalItemCount);
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
            limit,
            unAuthError,
            unAuthRequestHandler,
            urlProp,
        ],
    );

    const resetPaginatedData = () => setPaginatedData([]);

    const fetchFromStart = async (urlArg?: string) => {
        pageNrRef.current = 1;
        const data = await fetchMore(pageNrRef.current, urlArg);
        return data;
    };

    return {
        loaderRef,
        loaderRef2,
        loaderRef3,
        paginatedData,
        hasMore,
        fetchFromStart,
        isLoading,
        totalItemCount,
        resetPaginatedData,
    };
}
