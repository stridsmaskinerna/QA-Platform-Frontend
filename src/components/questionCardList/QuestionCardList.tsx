import { IQuestion } from "../../utils";
import { Loader } from "..";
import { QuestionCard } from "../questionCard/QuestionCard";
import styles from "./QuestionCardList.module.css";
import { ResolvedFilters } from "./ResolvedFilters";
import { useTranslation } from "react-i18next";
import { LegacyRef } from "react";

interface IQuestionCardListProps {
    data: IQuestion[];
    activeResolvedFilter: boolean | null;
    onResolvedFilterClick: (arg: boolean | null) => void;
    isLoadingQuestions: boolean;
    header: string;
    hasMore?: boolean;
    loaderRef?: LegacyRef<HTMLDivElement>;
}

export function QuestionCardList({
    data,
    activeResolvedFilter,
    onResolvedFilterClick,
    isLoadingQuestions,
    header,
    hasMore,
    loaderRef,
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
                <h3>{header}</h3>
                <ResolvedFilters
                    activeResolvedFilter={activeResolvedFilter}
                    onResolvedFilterClick={onResolvedFilterClick}
                />
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
