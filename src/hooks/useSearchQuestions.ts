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
    const debouncedSearch = useDebounceCallback(onSearchBarInputChange, 500);

    //The "topic" arg isn't used at this point. Putting it there for clarities sake
    // and possible future use.
    const updateQuestionsData = async (
        origin: "search" | "subject" | "topic"
    ) => {
        //If this updateQuestionsData is called because of an updated topicId, then all
        //types of query params will be active.
        const queryParams =
            urlAppendixes.searchStr +
            (origin === "search" ? "" : (urlAppendixes.subjectId ?? "")) +
            (origin === "subject" ? "" : (urlAppendixes.topicId ?? ""));

        const data = isGuest
            ? await fetchQuestions(publicQuestionsBaseUrl + queryParams)
            : await authFetchQuestions(questionsBaseUrl + queryParams);

        if (data) {
            setQuestions(data);

            if (origin === "search") {
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

            if (origin === "subject") {
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

    return {
        debouncedSearch,
        questions,
        topicFilter: { ...topicFilter, onFilterClick: topicFilterClick },
        subjectFilter: { ...subjectFilter, onFilterClick: subjectFilterClick },
        showTopicsFilters
    };
};
