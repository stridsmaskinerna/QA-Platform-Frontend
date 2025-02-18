import { useTranslation } from "react-i18next";
import { SearchWithFilters, Tabs } from "..";
import { useRoles, useSearchQuestions } from "../../hooks";
import { QuestionCardList } from "../questionCardList";
import styles from "./QuestionFinder.module.css";
import { ITab } from "../../utils";
import { CSSProperties, useMemo } from "react";
import { MyQASection } from "../myQASection";

const tabContainerStyle: CSSProperties = {
    width: "100%",
    marginTop: "clamp(0.2rem, 5vw, 2rem)",
};

const tabsBtnStyle: CSSProperties = {
    fontSize: "clamp(12px, 2vw, 1.5rem)",
    flex: 1,
    textWrap: "nowrap",
};
export function QuestionFinder() {
    const {
        debouncedSearch,
        questions,
        subjectFilterProps,
        topicFilterProps,
        isLoadingQuestions,
        onResolvedFilterClick,
        activeFilters,
        onInterActionFilterClick,
        shouldShowFilters,
        loaderRef,
        hasMore,
    } = useSearchQuestions();
    const { t } = useTranslation();
    const { isUser } = useRoles();

    const tabsOuterContainerStyle: CSSProperties = {
        width: "100%",
        flexDirection: "column",
        transition: "transform 0.5s ease",
    };

    const questionListContent = useMemo(
        () => (
            <QuestionCardList
                header={t(
                    `${activeFilters.userInteraction ?? "questionList"}Header`,
                )}
                onResolvedFilterClick={onResolvedFilterClick}
                activeResolvedFilter={activeFilters.resolved}
                data={questions}
                isLoadingQuestions={isLoadingQuestions}
                loaderRef={loaderRef}
                hasMore={hasMore}
            />
        ),
        [
            activeFilters.resolved,
            activeFilters.userInteraction,
            hasMore,
            isLoadingQuestions,
            loaderRef,
            onResolvedFilterClick,
            questions,
            t,
        ],
    );

    const tabs: ITab[] = useMemo(
        () => [
            {
                content: questionListContent,
                title: t("recentQuestions"),
                btnStyle: tabsBtnStyle,
                contentContainerStyle: tabContainerStyle,
                tabBtnClickSideEffect: () => onInterActionFilterClick(null),
            },
            {
                content: (
                    <MyQASection
                        activeFilter={
                            activeFilters.userInteraction ?? "created"
                        }
                        setActiveFilter={onInterActionFilterClick}
                    >
                        {questionListContent}
                    </MyQASection>
                ),
                contentContainerStyle: tabContainerStyle,
                title: t("myQa"),
                btnStyle: tabsBtnStyle,
                tabBtnClickSideEffect: () =>
                    onInterActionFilterClick("created"),
            },
        ],
        [
            activeFilters.userInteraction,
            onInterActionFilterClick,
            questionListContent,
            t,
        ],
    );

    return (
        <div className={styles.container}>
            <SearchWithFilters
                shouldShowFilters={shouldShowFilters}
                placeholder={t("searchQuestionsPlaceholder")}
                subjectFilter={subjectFilterProps}
                topicFilter={topicFilterProps}
                onInputChange={debouncedSearch}
                isLoadingQuestions={isLoadingQuestions}
            />

            {isUser ? (
                <Tabs
                    containerStyle={tabsOuterContainerStyle}
                    tabs={tabs}
                />
            ) : (
                questionListContent
            )}
        </div>
    );
}
