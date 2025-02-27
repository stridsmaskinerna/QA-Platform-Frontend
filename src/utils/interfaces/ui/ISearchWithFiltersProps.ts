import { ISearchBarProps, ISearchFilter, IShouldShowFilters } from ".";

export interface ISearchWithFiltersProps extends ISearchBarProps {
    subjectFilter: ISearchFilter;
    topicFilter: ISearchFilter;
    isLoadingQuestions: boolean;
    shouldShowFilters: IShouldShowFilters;
}
