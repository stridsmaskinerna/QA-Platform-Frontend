import { IQuestion } from "../../utils";
import { Loader } from "..";
import { QuestionCard } from "../questionCard/QuestionCard";
import styles from "./QuestionCardList.module.css";
import { ResolvedFilters } from "./ResolvedFilters";
import { useTranslation } from "react-i18next";

interface IQuestionCardListProps {
    data: IQuestion[];
    activeResolvedFilter: boolean | null;
    onResolvedFilterClick: (arg: boolean | null) => void;
    isLoadingQuestions: boolean;
    header: string;
    totalItemCount?: number;
    hasMore?: boolean;
    loaderRef?: (node?: Element | null) => void;
    displayResolveFilter?: boolean;
}

export function QuestionCardList({
    data,
    activeResolvedFilter,
    onResolvedFilterClick,
    isLoadingQuestions,
    header,
    totalItemCount,
    hasMore,
    loaderRef,
    displayResolveFilter = true,
}: IQuestionCardListProps) {
    const { t } = useTranslation();
    if (isLoadingQuestions) {
        return (
            <div className={styles.container}>
                <div className={styles.loader}>
                    <Loader />
                </div>
            </div>
        );
    }
    const isNoData = data.length === 0;
    return (
        <div className={styles.container}>
            <div className={styles.headerRow}>
                <div className={styles.headerWrapper}>
                    <h3>{header}</h3>
                    {totalItemCount !== undefined && (
                        <span>
                            {t("nrOfQuestionsFound", { count: totalItemCount })}
                        </span>
                    )}
                </div>

                {displayResolveFilter && (
                    <ResolvedFilters
                        activeResolvedFilter={activeResolvedFilter}
                        onResolvedFilterClick={onResolvedFilterClick}
                    />
                )}
            </div>
            {data.map(question => (
                <QuestionCard
                    key={question.id}
                    data={question}
                />
            ))}
            {isNoData && <h3>{t("noQuestionsFound")}</h3>}
            {hasMore && (
                <div ref={loaderRef}>
                    <Loader />
                </div>
            )}
        </div>
    );
}
