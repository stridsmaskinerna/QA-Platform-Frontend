import { ChangeEventHandler, useEffect, useState } from "react";
import { useRoles } from "./useRoles";
import { useDebounceCallback } from "usehooks-ts";
import { BASE_URL, fetchQuestions } from "../data";
import { useFetchWithToken } from "./useFetchWithToken";
import { IQuestion, ISearchFilter } from "../utils";

const publicQuestionsBaseUrl = `${BASE_URL}/questions/public?limit=10`;
const questionsBaseUrl = `${BASE_URL}/questions?limit=10`;

interface IUrlAppendixes {
    searchStr: string;
    subjectId: string | null;
    topicId: string | null;
    isResolved: string | null | undefined;
}

export const useSearchQuestions = () => {
    const { isGuest } = useRoles();
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
    const [subjectFilter, setSubjectFilter] = useState<
        Omit<ISearchFilter, "onFilterClick">
    >({
        activeFilter: "",
        displayedFilters: []
    });
    const [topicFilter, setTopicFilter] = useState<
        Omit<ISearchFilter, "onFilterClick">
    >({
        activeFilter: "",
        displayedFilters: []
    });
    const [resolvedFilter, setResolvedFilter] = useState<boolean | null>(null);
    const [urlAppendixes, setUrlAppendixes] = useState<IUrlAppendixes>({
        searchStr: "",
        subjectId: null,
        topicId: null,
        isResolved: undefined
    });
    const { requestHandler: authFetchQuestions } =
        useFetchWithToken<IQuestion[]>();

    const subjectFilterClick = (subjectId: string) => {
        if (subjectFilter.activeFilter === subjectId) {
            setUrlAppendixes(prev => ({
                ...prev,
                subjectId: "",
                topicId: null
            }));
            setSubjectFilter(prev => ({
                activeFilter: "",
                displayedFilters: prev.displayedFilters
            }));
        } else {
            //Set isLoadingQuestions to true here to prevent TopicFilters from the previous fetch to
            //momentarily appear on screen before the new data has been fetched and parsed
            setIsLoadingQuestions(true);
            setUrlAppendixes(prev => ({
                ...prev,
                subjectId: `&subjectId=${subjectId}`,
                topicId: null
            }));
            setSubjectFilter(prev => ({
                activeFilter: subjectId,
                displayedFilters: prev.displayedFilters
            }));
        }
    };

    const topicFilterClick = (topicId: string) => {
        if (topicFilter.activeFilter === topicId) {
            setUrlAppendixes(prev => ({
                ...prev,
                topicId: ""
            }));
            setTopicFilter(prev => ({
                activeFilter: "",
                displayedFilters: prev.displayedFilters
            }));
        } else {
            setUrlAppendixes(prev => ({
                ...prev,
                topicId: `&topicId=${topicId}`
            }));
            setTopicFilter(prev => ({
                activeFilter: topicId,
                displayedFilters: prev.displayedFilters
            }));
        }
    };
    const onSearchBarInputChange: ChangeEventHandler<HTMLInputElement> = e => {
        setUrlAppendixes(prev => ({
            ...prev,
            searchStr: `&searchString=${e.target.value}`,
            subjectId: null,
            topicId: null
        }));
    };
    const debouncedSearch = useDebounceCallback(onSearchBarInputChange, 500);

    const onResolvedFilterClick = (newValue: boolean | null) => {
        setResolvedFilter(newValue);
        setUrlAppendixes(prev => ({
            ...prev,
            isResolved: newValue === null ? null : `&isResolved=${newValue}`
        }));
    };

    //The "topic" and "isResolved" arg isn't used at this point. Putting it there for clarities sake
    // and possible future use.
    const updateQuestionsData = async (
        caller: "search" | "subject" | "topic" | "isResolved"
    ) => {
        setIsLoadingQuestions(true);

        //If updateQuestionsData is called because of an updated topicId (caller = "topic"), then all
        //types of query params will be active.
        const queryParams =
            urlAppendixes.searchStr +
            (urlAppendixes.isResolved ?? "") +
            (caller === "search" ? "" : (urlAppendixes.subjectId ?? "")) +
            (caller === "subject" ? "" : (urlAppendixes.topicId ?? ""));

        const data = isGuest
            ? await fetchQuestions(publicQuestionsBaseUrl + queryParams)
            : await authFetchQuestions(questionsBaseUrl + queryParams);

        if (data) {
            setQuestions(data);

            if (caller === "search") {
                setSubjectFilter({
                    activeFilter: "",
                    displayedFilters: data
                        //Get array with only unique subjectIds
                        .reduce(
                            (acc: IQuestion[], current) =>
                                acc.some(q => q.subjectId === current.subjectId)
                                    ? acc
                                    : [...acc, current],
                            []
                        )
                        //Map to right format
                        .map(q => ({
                            id: q.subjectId,
                            title: `${q.subjectCode ?? ""} ${q.subjectName}`
                        }))
                });
                setTopicFilter({ activeFilter: "", displayedFilters: [] });
            }

            if (caller === "subject") {
                setTopicFilter({
                    activeFilter: "",
                    displayedFilters: data
                        //Get array with only unique topicIds
                        .reduce(
                            (acc: IQuestion[], current) =>
                                acc.some(q => q.topicId === current.topicId)
                                    ? acc
                                    : [...acc, current],
                            []
                        )
                        //Map to right format
                        .map(q => ({
                            id: q.topicId,
                            title: q.topicName
                        }))
                });
            }
        }
        setIsLoadingQuestions(false);
    };

    useEffect(() => {
        void updateQuestionsData("search");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGuest, urlAppendixes.searchStr]);

    useEffect(() => {
        //Dont run on initial render
        if (urlAppendixes.subjectId !== null) {
            void updateQuestionsData("subject");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGuest, urlAppendixes.subjectId]);

    useEffect(() => {
        //Dont run on initial render
        if (urlAppendixes.topicId !== null) {
            void updateQuestionsData("topic");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGuest, urlAppendixes.topicId]);

    useEffect(() => {
        //Dont run on initial render. We use the null value to indicate fetch all.
        if (urlAppendixes.isResolved !== undefined) {
            void updateQuestionsData("isResolved");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGuest, urlAppendixes.isResolved]);

    return {
        debouncedSearch,
        questions,
        topicFilter: { ...topicFilter, onFilterClick: topicFilterClick },
        subjectFilter: { ...subjectFilter, onFilterClick: subjectFilterClick },
        isLoadingQuestions,
        onResolvedFilterClick,
        resolvedFilter
    };
};
