import {
    ChangeEventHandler,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { useRoles } from "./useRoles";
import { useDebounceCallback } from "usehooks-ts";
import { BASE_URL, fetchQuestions } from "../data";
import { useFetchWithToken } from "./useFetchWithToken";
import { IQuestion, UserInteractionFilter } from "../utils";

const publicQuestionsBaseUrl = `${BASE_URL}/questions/public?limit=10`;
const questionsBaseUrl = `${BASE_URL}/questions?limit=10`;

interface IUrlAppendixes {
    searchStr: string;
    subjectId: string | undefined;
    topicId: string | undefined;
    isResolved: string | null | undefined;
    userInteraction: string | null | undefined;
}

interface IActiveFilters {
    subject: string;
    topic: string;
    resolved: boolean | null;
    userInteraction: UserInteractionFilter | null;
}

interface IDisplayedFilters {
    subject: { id: string; title: string }[];
    topic: { id: string; title: string }[];
}

export const useSearchQuestions = () => {
    const { isGuest } = useRoles();
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
    const [activeFilters, setActiveFilters] = useState<IActiveFilters>({
        subject: "",
        topic: "",
        resolved: null,
        userInteraction: null,
    });

    const [displayedFilters, setDisplayedFilters] = useState<IDisplayedFilters>(
        { subject: [], topic: [] },
    );

    const [urlAppendixes, setUrlAppendixes] = useState<IUrlAppendixes>({
        searchStr: "",
        subjectId: undefined,
        topicId: undefined,
        isResolved: undefined,
        userInteraction: undefined,
    });
    const prevUrlAppendixes = useRef<typeof urlAppendixes>();
    const { requestHandler: authFetchQuestions } =
        useFetchWithToken<IQuestion[]>();

    const onSubjectFilterClick = (subjectId: string) => {
        //If deactivating a subject filter
        if (activeFilters.subject === subjectId) {
            setUrlAppendixes(prev => ({
                ...prev,
                subjectId: "",
                topicId: undefined,
            }));
            setActiveFilters(prev => ({
                ...prev,
                topic: "",
                subject: "",
            }));
        } else {
            //Set isLoadingQuestions to true here to prevent TopicFilters from the previous fetch to
            //momentarily appear on screen before the new data has been fetched and parsed
            setIsLoadingQuestions(true);
            setUrlAppendixes(prev => ({
                ...prev,
                subjectId: `&subjectId=${subjectId}`,
                topicId: undefined,
            }));
            setActiveFilters(prev => ({
                ...prev,
                subject: subjectId,
            }));
        }
    };

    const onTopicFilterClick = (topicId: string) => {
        //If deactivating a topic filter
        if (activeFilters.topic === topicId) {
            setUrlAppendixes(prev => ({
                ...prev,
                topicId: "",
            }));
            setActiveFilters(prev => ({
                ...prev,
                topic: "",
            }));
        } else {
            setUrlAppendixes(prev => ({
                ...prev,
                topicId: `&topicId=${topicId}`,
            }));
            setActiveFilters(prev => ({
                ...prev,
                topic: topicId,
            }));
        }
    };
    const onSearchBarInputChange: ChangeEventHandler<HTMLInputElement> = e => {
        setUrlAppendixes(prev => ({
            ...prev,
            searchStr: `&searchString=${e.target.value}`,
            subjectId: undefined,
            topicId: undefined,
        }));
    };
    const debouncedSearch = useDebounceCallback(onSearchBarInputChange, 500);

    const onResolvedFilterClick = (newValue: boolean | null) => {
        setActiveFilters(prev => ({ ...prev, resolved: newValue }));
        setUrlAppendixes(prev => ({
            ...prev,
            isResolved: newValue === null ? null : `&isResolved=${newValue}`,
        }));
    };

    const onInterActionFilterClick = (
        newValue: UserInteractionFilter | null,
    ) => {
        setActiveFilters(prev => ({ ...prev, userInteraction: newValue }));

        setUrlAppendixes(prev => ({
            ...prev,
            userInteraction:
                newValue === null ? null : `&interactionType=${newValue}`,
        }));
    };

    //The "topic" arg isn't used at this point. Putting it there for clarities sake
    // and possible future use.
    const updateQuestionsAndFilters = useCallback(
        async (
            caller:
                | "search"
                | "subject"
                | "topic"
                | "isResolved"
                | "interactionFilter",
        ) => {
            setIsLoadingQuestions(true);

            const queryParams =
                urlAppendixes.searchStr +
                (urlAppendixes.isResolved ?? "") +
                (urlAppendixes.userInteraction ?? "") +
                (urlAppendixes.subjectId ?? "") +
                (urlAppendixes.topicId ?? "");

            const data = isGuest
                ? await fetchQuestions(publicQuestionsBaseUrl + queryParams)
                : await authFetchQuestions(questionsBaseUrl + queryParams);

            if (data) {
                setQuestions(data);

                //If called by search we kind of reset the displayed filters. We update subject filter
                //to mirror the fetched questions and set displayed topic filters to none
                if (caller === "search") {
                    const newDisplayedSubjectFilters = data
                        //Get array with only unique SubjectIds
                        .reduce(
                            (acc: IQuestion[], current) =>
                                acc.some(q => q.subjectId === current.subjectId)
                                    ? acc
                                    : [...acc, current],
                            [],
                        )
                        //Map to right format
                        .map(q => ({
                            id: q.subjectId,
                            title: `${q.subjectCode ?? ""} ${q.subjectName}`,
                        }))
                        //Sort so possible active filter comes first
                        .sort(a => (a.id === activeFilters.subject ? -1 : 1));

                    setDisplayedFilters({
                        subject: newDisplayedSubjectFilters,
                        topic: [],
                    });
                }

                //If called by subject we only update the displayed topic filters and sort the subject filters
                // so that the possible new active filter comes first
                if (caller === "subject") {
                    const newDisplayedTopicFilters = data
                        //Get array with only unique topicIds
                        .reduce(
                            (acc: IQuestion[], current) =>
                                acc.some(q => q.topicId === current.topicId)
                                    ? acc
                                    : [...acc, current],
                            [],
                        )
                        //Map to right format
                        .map(q => ({
                            id: q.topicId,
                            title: q.topicName,
                        }));

                    setDisplayedFilters(prev => ({
                        subject: prev.subject.sort(a =>
                            a.id === activeFilters.subject ? -1 : 1,
                        ),
                        topic: newDisplayedTopicFilters,
                    }));
                }

                //If called by interactionFilter or resolvedFilter we keep the displayed subject and topic filters
                //if they have an active filter. A future improvement could be to only keep the active filter and refesh the rest
                if (caller === "interactionFilter" || caller === "isResolved") {
                    setDisplayedFilters(prev => {
                        const newDisplayedSubjectFilters = activeFilters.subject
                            ? prev.subject
                            : data
                                  //Get array with only unique SubjectIds
                                  .reduce(
                                      (acc: IQuestion[], current) =>
                                          acc.some(
                                              q =>
                                                  q.subjectId ===
                                                  current.subjectId,
                                          )
                                              ? acc
                                              : [...acc, current],
                                      [],
                                  )
                                  //Map to right format
                                  .map(q => ({
                                      id: q.subjectId,
                                      title: `${q.subjectCode ?? ""} ${q.subjectName}`,
                                  }));

                        const newDisplayedTopicFilters = activeFilters.topic
                            ? prev.topic
                            : data
                                  //Get array with only unique topicIds
                                  .reduce(
                                      (acc: IQuestion[], current) =>
                                          acc.some(
                                              q =>
                                                  q.topicId === current.topicId,
                                          )
                                              ? acc
                                              : [...acc, current],
                                      [],
                                  )
                                  //Map to right format
                                  .map(q => ({
                                      id: q.topicId,
                                      title: q.topicName,
                                  }));

                        return {
                            topic: newDisplayedTopicFilters,
                            subject: newDisplayedSubjectFilters,
                        };
                    });
                }
            }
            setIsLoadingQuestions(false);
        },
        [
            activeFilters.subject,
            activeFilters.topic,
            authFetchQuestions,
            isGuest,
            urlAppendixes.isResolved,
            urlAppendixes.searchStr,
            urlAppendixes.subjectId,
            urlAppendixes.topicId,
            urlAppendixes.userInteraction,
        ],
    );

    useEffect(() => {
        //Initial render. Run the updateQuestionsAndFilters function with caller = search
        // and now searchString. Will initiate filters and ust fetch the 10 most recent questions.
        if (!prevUrlAppendixes.current) {
            prevUrlAppendixes.current = urlAppendixes;
            void updateQuestionsAndFilters("search");
        }

        // Determine what changed
        let caller:
            | "search"
            | "subject"
            | "topic"
            | "isResolved"
            | "interactionFilter"
            | null = null;

        if (prevUrlAppendixes.current.searchStr !== urlAppendixes.searchStr) {
            caller = "search";
        } else if (
            prevUrlAppendixes.current.subjectId !== urlAppendixes.subjectId
        ) {
            caller = "subject";
        } else if (
            prevUrlAppendixes.current.topicId !== urlAppendixes.topicId
        ) {
            caller = "topic";
        } else if (
            prevUrlAppendixes.current.isResolved !== urlAppendixes.isResolved
        ) {
            caller = "isResolved";
        } else if (
            prevUrlAppendixes.current.userInteraction !==
            urlAppendixes.userInteraction
        ) {
            caller = "interactionFilter";
        }

        prevUrlAppendixes.current = urlAppendixes; // Update ref for next render

        if (caller) {
            void updateQuestionsAndFilters(caller);
        }
    }, [isGuest, updateQuestionsAndFilters, urlAppendixes]);

    return {
        debouncedSearch,
        questions,
        isLoadingQuestions,
        onResolvedFilterClick,
        activeFilters,
        onInterActionFilterClick,
        subjectFilterProps: {
            onFilterClick: onSubjectFilterClick,
            displayedFilters: displayedFilters.subject,
            activeFilter: activeFilters.subject,
        },
        topicFilterProps: {
            onFilterClick: onTopicFilterClick,
            displayedFilters: displayedFilters.topic,
            activeFilter: activeFilters.topic,
        },
    };
};
