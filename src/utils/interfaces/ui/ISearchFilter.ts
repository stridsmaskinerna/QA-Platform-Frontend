export interface ISearchFilter {
    displayedFilters: { title: string; id: string }[];
    onFilterClick: (id: string) => void;
    activeFilter: string;
    title?: string;
}
