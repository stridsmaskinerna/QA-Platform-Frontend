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
}

export const useSearchQuestions = () => {
    const { isGuest } = useRoles();
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [showTopicsFilters, setShowTopicsFilters] = useState(true);
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
    const [urlAppendixes, setUrlAppendixes] = useState<IUrlAppendixes>({
        searchStr: "",
        subjectId: null,
        topicId: null
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
            //Set showTopicsFilters to false to prevent TopicFilters from the previous fetch to
            //momentarily appear on screen before the new data has been fetched and parsed
            setShowTopicsFilters(false);
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
        setUrlAppendixes({
            searchStr: `&searchString=${e.target.value}`,
            subjectId: null,
            topicId: null
        });
    };

    useEffect(() => {
        console.log(topicFilter.displayedFilters.length);
    }, [topicFilter.displayedFilters.length]);

    const debouncedSearch = useDebounceCallback(onSearchBarInputChange, 400);

    const updateQuestionsData = async (
        refreshSubjectFilters: boolean,
        refreshTopicFilters: boolean
    ) => {
        const filterQueryParams =
            (refreshSubjectFilters ? "" : (urlAppendixes.subjectId ?? "")) +
            (refreshTopicFilters ? "" : (urlAppendixes.topicId ?? ""));

        const data = isGuest
            ? await fetchQuestions(
                  publicQuestionsBaseUrl +
                      urlAppendixes.searchStr +
                      filterQueryParams
              )
            : await authFetchQuestions(
                  questionsBaseUrl + urlAppendixes.searchStr + filterQueryParams
              );

        if (data) {
            setQuestions(data);

            if (refreshSubjectFilters) {
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
                            title: q.subjectCode
                        }))
                });
                setTopicFilter({ activeFilter: "", displayedFilters: [] });
            }

            if (refreshTopicFilters) {
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
        setShowTopicsFilters(true);
    };

    useEffect(() => {
        void updateQuestionsData(true, false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGuest, urlAppendixes.searchStr]);

    useEffect(() => {
        //Dont run on initial render
        if (urlAppendixes.subjectId !== null) {
            void updateQuestionsData(false, true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGuest, urlAppendixes.subjectId]);

    useEffect(() => {
        //Dont run on initial render
        if (urlAppendixes.topicId !== null) {
            void updateQuestionsData(false, false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGuest, urlAppendixes.topicId]);

    return {
        debouncedSearch,
        questions,
        topicFilter: { ...topicFilter, onFilterClick: topicFilterClick },
        subjectFilter: { ...subjectFilter, onFilterClick: subjectFilterClick },
        showTopicsFilters
    };
};
