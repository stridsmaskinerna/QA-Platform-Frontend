import { SearchFilter } from ".";
import { SearchBar } from "..";
import { ISearchBarProps, ISearchFilter } from "../../../utils";
import styles from "./SearchWithFilters.module.css";

interface ISearchWithFiltersProps extends ISearchBarProps {
    subjectFilter: ISearchFilter;
    topicFilter: ISearchFilter;
    showTopicFilters: boolean;
}

export function SearchWithFilters(props: ISearchWithFiltersProps) {
    return (
        <div className={styles.container}>
            <SearchBar
                defaultValue={props.defaultValue}
                placeholder={props.placeholder}
                onInputChange={props.onInputChange}
            />
            {props.subjectFilter.displayedFilters.length && (
                <SearchFilter
                    onFilterClick={props.subjectFilter.onFilterClick}
                    displayedFilters={props.subjectFilter.displayedFilters}
                    activeFilter={props.subjectFilter.activeFilter}
                />
            )}
            {props.subjectFilter.activeFilter && props.showTopicFilters && (
                <SearchFilter
                    onFilterClick={props.topicFilter.onFilterClick}
                    displayedFilters={props.topicFilter.displayedFilters}
                    activeFilter={props.topicFilter.activeFilter}
                />
            )}
        </div>
    );
}
