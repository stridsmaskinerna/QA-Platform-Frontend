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
    subjectId: string;
    topicId: string;
}

export const useSearchQuestions = () => {
    const { isGuest } = useRoles();
    const [questions, setQuestions] = useState<IQuestion[]>([]);
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
        subjectId: "",
        topicId: ""
    });
    const { requestHandler: authFetchQuestions } =
        useFetchWithToken<IQuestion[]>();

    const subjectFilterClick = (subjectId: string) => {
        if (subjectFilter.activeFilter === subjectId) {
            setSubjectFilter(prev => ({
                activeFilter: "",
                displayedFilters: prev.displayedFilters
            }));
            setUrlAppendixes(prev => ({ ...prev, subjectId: "", topicId: "" }));
        } else {
            setSubjectFilter(prev => ({
                activeFilter: subjectId,
                displayedFilters: prev.displayedFilters
            }));
            setUrlAppendixes(prev => ({
                ...prev,
                subjectId: `&subjectId=${subjectId}`,
                topicId: ""
            }));
        }
    };
    const topicFilterClick = (topicId: string) => {
        if (topicFilter.activeFilter === topicId) {
            setTopicFilter(prev => ({
                activeFilter: "",
                displayedFilters: prev.displayedFilters
            }));
            setUrlAppendixes(prev => ({
                ...prev,
                topicId: ""
            }));
        } else {
            setTopicFilter(prev => ({
                activeFilter: topicId,
                displayedFilters: prev.displayedFilters
            }));
            setUrlAppendixes(prev => ({
                ...prev,
                topicId: `&topicId=${topicId}`
            }));
        }
    };
    const onSearchBarInputChange: ChangeEventHandler<HTMLInputElement> = e => {
        const searchStr = e.target.value;
        if (searchStr?.length > 1) {
            setUrlAppendixes({
                searchStr: `&searchString=${searchStr}`,
                subjectId: "",
                topicId: ""
            });
        }
    };

    const debouncedSearch = useDebounceCallback(onSearchBarInputChange, 400);

    const updateQuestionsData = async (
        refreshSubjectFilters: boolean,
        refreshTopicFilters: boolean
    ) => {
        const filterQueryParams =
            (refreshSubjectFilters ? "" : urlAppendixes.subjectId) +
            (refreshTopicFilters ? "" : urlAppendixes.topicId);
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
    };

    useEffect(() => {
        void updateQuestionsData(true, false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        isGuest,
        publicQuestionsBaseUrl,
        questionsBaseUrl,
        urlAppendixes.searchStr
    ]);

    useEffect(() => {
        void updateQuestionsData(false, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        isGuest,
        publicQuestionsBaseUrl,
        questionsBaseUrl,
        urlAppendixes.subjectId
    ]);

    useEffect(() => {
        void updateQuestionsData(false, false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        isGuest,
        publicQuestionsBaseUrl,
        questionsBaseUrl,
        urlAppendixes.topicId
    ]);

    return {
        debouncedSearch,
        questions,
        topicFilter: { ...topicFilter, onFilterClick: topicFilterClick },
        subjectFilter: { ...subjectFilter, onFilterClick: subjectFilterClick }
    };
};
