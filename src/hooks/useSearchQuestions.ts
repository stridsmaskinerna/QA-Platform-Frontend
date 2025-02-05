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
        //Set isLoadingQuestions to true here if activating a subject filter to prevent
        // TopicFilters from the previous fetch to momentarily appear on screen before the
        // new data has been fetched and parsed
        if (activeFilters.subject !== subjectId) {
            setIsLoadingQuestions(true);
        }
        setUrlAppendixes(prev => ({
            ...prev,
            subjectId:
                activeFilters.subject === subjectId
                    ? ""
                    : `&subjectId=${subjectId}`,
            topicId: undefined,
        }));
        setActiveFilters(prev => ({
            ...prev,
            subject: prev.subject === subjectId ? "" : subjectId,
            topic: prev.subject === subjectId ? "" : prev.topic,
        }));
    };

    const onTopicFilterClick = (topicId: string) => {
        setUrlAppendixes(prev => ({
            ...prev,
            topicId:
                activeFilters.topic === topicId ? "" : `&topicId=${topicId}`,
        }));
        setActiveFilters(prev => ({
            ...prev,
            topic: prev.topic === topicId ? "" : topicId,
        }));
    };

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

    const onSearchBarInputChange: ChangeEventHandler<HTMLInputElement> = e => {
        setUrlAppendixes(prev => ({
            ...prev,
            searchStr: `&searchString=${e.target.value}`,
            subjectId: undefined,
            topicId: undefined,
        }));
    };
    const debouncedSearch = useDebounceCallback(onSearchBarInputChange, 500);

    const updateDisplayedSubjectFilters = useCallback(
        (data: IQuestion[], sort?: boolean) => {
            const uniqueSubjects = data
                .reduce(
                    (acc: IQuestion[], current) =>
                        acc.some(q => q.subjectId === current.subjectId)
                            ? acc
                            : [...acc, current],
                    [],
                )
                .map(q => ({
                    id: q.subjectId,
                    title: `${q.subjectCode ?? ""} ${q.subjectName}`,
                }));

            // Apply sorting only if `sort` is true
            if (sort) {
                uniqueSubjects.sort(a =>
                    a.id === activeFilters.subject ? -1 : 1,
                );
            }

            return uniqueSubjects;
        },
        [activeFilters.subject],
    );

    const updateDisplayedTopicFilters = (data: IQuestion[]) => {
        return data
            .reduce(
                (acc: IQuestion[], current) =>
                    acc.some(q => q.topicId === current.topicId)
                        ? acc
                        : [...acc, current],
                [],
            )
            .map(q => ({
                id: q.topicId,
                title: q.topicName,
            }));
    };

    //The "topic" arg isn't used at this point. Putting it there for clarities sake
    // and possible future use.
    const updateQuestionsAndFilters = useCallback(
        async (caller: keyof IUrlAppendixes) => {
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
                //to mirror the fetched questions and set displayed topic filters to none.
                if (caller === "searchStr") {
                    setActiveFilters(prev => ({
                        ...prev,
                        subject: "",
                        topic: "",
                    }));
                    setDisplayedFilters({
                        subject: updateDisplayedSubjectFilters(data),
                        topic: [],
                    });
                }

                //If called by subject we only update the displayed topic filters and sort the subject filters
                // so that the possible new active filter comes first
                if (caller === "subjectId") {
                    setDisplayedFilters(prev => ({
                        subject: prev.subject.sort(a =>
                            a.id === activeFilters.subject ? -1 : 1,
                        ),
                        topic: updateDisplayedTopicFilters(data),
                    }));
                }

                //If called by interactionFilter or resolvedFilter we keep the displayed subject and topic filters
                //if they have an active filter. A future improvement could be to only keep the active filter and refesh the rest
                if (caller === "userInteraction" || caller === "isResolved") {
                    setDisplayedFilters(prev => ({
                        subject: activeFilters.subject
                            ? prev.subject
                            : updateDisplayedSubjectFilters(data),
                        topic: activeFilters.topic
                            ? prev.topic
                            : updateDisplayedTopicFilters(data),
                    }));
                }
            }
            setIsLoadingQuestions(false);
        },
        [
            activeFilters.subject,
            activeFilters.topic,
            authFetchQuestions,
            isGuest,
            updateDisplayedSubjectFilters,
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
            void updateQuestionsAndFilters("searchStr");
        }

        // Determine what changed
        const changedKey = Object.keys(urlAppendixes).find(
            key =>
                prevUrlAppendixes.current?.[key as keyof IUrlAppendixes] !==
                urlAppendixes[key as keyof IUrlAppendixes],
        ) as keyof IUrlAppendixes | undefined;

        prevUrlAppendixes.current = urlAppendixes; // Update ref for next render

        if (changedKey) {
            void updateQuestionsAndFilters(changedKey);
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
