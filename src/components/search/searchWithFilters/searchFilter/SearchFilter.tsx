import { FilterButton } from ".";
import { ISearchFilter } from "../../../../utils";
import styles from "./SearchFilter.module.css";

export function SearchFilter({
    displayedFilters,
    onFilterClick,
    activeFilter
}: ISearchFilter) {
    return (
        <div className={styles.container}>
            {displayedFilters?.map(f => (
                <FilterButton
                    isActive={activeFilter === f.id}
                    title={f.title}
                    onClick={() => onFilterClick(f.id)}
                    key={f.id}
                />
            ))}
        </div>
    );
}
