import { useTranslation } from "react-i18next";
import { SearchFilter } from ".";
import { SearchBar } from "..";
import { ISearchWithFiltersProps } from "../../../utils";
import styles from "./SearchWithFilters.module.css";

export function SearchWithFilters(props: ISearchWithFiltersProps) {
    const { t } = useTranslation();
    return (
        <div className={styles.container}>
            <SearchBar
                defaultValue={props.defaultValue}
                placeholder={props.placeholder}
                onInputChange={props.onInputChange}
            />
            {props.subjectFilter.displayedFilters.length && (
                <SearchFilter
                    title={`${t("categoryFilter")}:`}
                    onFilterClick={props.subjectFilter.onFilterClick}
                    displayedFilters={props.subjectFilter.displayedFilters}
                    activeFilter={props.subjectFilter.activeFilter}
                />
            )}
            {props.subjectFilter.activeFilter && props.showTopicsFilters && (
                <SearchFilter
                    title={`${t("topicFilter")}:`}
                    onFilterClick={props.topicFilter.onFilterClick}
                    displayedFilters={props.topicFilter.displayedFilters}
                    activeFilter={props.topicFilter.activeFilter}
                />
            )}
        </div>
    );
}
