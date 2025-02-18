import {
    ChangeEventHandler,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { useRoles } from "./useRoles";
import { useDebounceCallback } from "usehooks-ts";
import { BASE_URL } from "../data";
import { useFetchWithToken } from "./useFetchWithToken";
import { IQuestion, IShouldShowFilters, UserInteractionFilter } from "../utils";
import { useFetchData } from "./useFetchData";

const publicQuestionsBaseUrl = `${BASE_URL}/questions/public?limit=10`;
const questionsBaseUrl = `${BASE_URL}/questions?limit=10`;
let timeout: NodeJS.Timeout;
//If changes this, also change the transition time length accordingly in SearchWithFilters.module.css
const ANIMATION_TIMER = 500;

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
    const [shouldShowFilters, setShouldShowFilters] =
        useState<IShouldShowFilters>({ subject: false, topic: false });
    const prevUrlAppendixes = useRef<typeof urlAppendixes>();
    const { requestHandler: authFetchQuestions } =
        useFetchWithToken<IQuestion[]>();
    const { requestHandler: fetchQuestions } = useFetchData<IQuestion[]>();
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
            searchStr: e.target.value ? `&searchString=${e.target.value}` : "",
            subjectId: undefined,
            topicId: undefined,
        }));
    };
    const debouncedSearch = useDebounceCallback(onSearchBarInputChange, 500);

    const updateDisplayedSubjectFilters = useCallback((data: IQuestion[]) => {
        return data
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
    }, []);

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

    const updateQuestionsAndFilters = useCallback(
        async (caller: keyof IUrlAppendixes) => {
            const queryParams =
                urlAppendixes.searchStr +
                (urlAppendixes.isResolved ?? "") +
                (urlAppendixes.userInteraction ?? "") +
                (urlAppendixes.subjectId ?? "") +
                (urlAppendixes.topicId ?? "");

            setIsLoadingQuestions(true);
            const data = isGuest
                ? await fetchQuestions(publicQuestionsBaseUrl + queryParams)
                : await authFetchQuestions(questionsBaseUrl + queryParams);

            if (data) {
                setQuestions(data);

                //If called by searchStr (which will also be the caller on initital render)
                // we kind of reset the displayed filters. We update subject filter
                //to mirror the fetched questions (if there is a searchStr)
                // and set displayed topic filters to none. To not jar the animation
                //for hiding filters we wait for the animation to finish before
                //removing the displayed and active filters if urlAppendixes.searchStr
                //is empty.
                if (caller === "searchStr") {
                    if (urlAppendixes.searchStr) {
                        setShouldShowFilters({ subject: true, topic: false });
                        setActiveFilters(prev => ({
                            ...prev,
                            subject: "",
                            topic: "",
                        }));
                        setDisplayedFilters({
                            subject: updateDisplayedSubjectFilters(data),
                            topic: [],
                        });
                    } else {
                        setShouldShowFilters({ subject: false, topic: false });
                        setTimeout(() => {
                            setActiveFilters(prev => ({
                                ...prev,
                                subject: "",
                                topic: "",
                            }));
                            setDisplayedFilters({
                                subject: [],
                                topic: [],
                            });
                        }, ANIMATION_TIMER);
                    }
                }

                //If called by subject we only update the displayed topic filters.
                if (caller === "subjectId") {
                    if (urlAppendixes.subjectId) {
                        clearTimeout(timeout);
                        setShouldShowFilters({
                            subject: true,
                            topic: true,
                        });
                        setDisplayedFilters(prev => ({
                            subject: prev.subject,
                            topic: updateDisplayedTopicFilters(data),
                        }));
                    } else {
                        setShouldShowFilters({ subject: true, topic: false });
                        timeout = setTimeout(() => {
                            setDisplayedFilters(prev => ({
                                subject: prev.subject,
                                topic: [],
                            }));
                        }, ANIMATION_TIMER);
                    }
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            activeFilters.subject,
            activeFilters.topic,
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
        // and no searchString. Will initiate filters and just fetch the 10 most recent questions.
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGuest, urlAppendixes]);

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
        shouldShowFilters,
    };
};
