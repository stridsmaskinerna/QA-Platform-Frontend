import { useTranslation } from "react-i18next";
import { SearchFilter } from ".";
import { SearchBar } from "..";
import styles from "./SearchWithFilters.module.css";
import { ISearchWithFiltersProps } from "../../../utils";

export function SearchWithFilters(props: ISearchWithFiltersProps) {
    const { t } = useTranslation();
    return (
        <div className={styles.container}>
            <SearchBar
                defaultValue={props.defaultValue}
                placeholder={props.placeholder}
                onInputChange={props.onInputChange}
            />
            <div
                className={`${styles.filterWrapper} ${props.shouldShowFilters.subject ? styles.show : ""}`}
            >
                <div className={styles.subjectFilterWrapper}>
                    <SearchFilter
                        title={`${t("categoryFilter")}:`}
                        onFilterClick={props.subjectFilter.onFilterClick}
                        displayedFilters={props.subjectFilter.displayedFilters}
                        activeFilter={props.subjectFilter.activeFilter}
                    />
                </div>
            </div>

            <div
                data-testid="topicFilterWrapper"
                className={`${styles.filterWrapper} ${props.shouldShowFilters.topic ? styles.show : ""}`}
            >
                <div className={styles.topicFilterWrapper}>
                    <SearchFilter
                        title={`${t("topicFilter")}:`}
                        onFilterClick={props.topicFilter.onFilterClick}
                        displayedFilters={props.topicFilter.displayedFilters}
                        activeFilter={props.topicFilter.activeFilter}
                    />
                </div>
            </div>
        </div>
    );
}
