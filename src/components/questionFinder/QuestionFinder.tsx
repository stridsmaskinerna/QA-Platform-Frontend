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

const tabsOuterContainerStyle: CSSProperties = {
    width: "100%",
    flexDirection: "column",
};

const tabsBtnStyle: CSSProperties = {
    fontSize: "clamp(12px, 2vw, 1.5rem)",
    flex: 1,
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
    } = useSearchQuestions();
    const { t } = useTranslation();
    const { isUser } = useRoles();

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
            />
        ),
        [
            activeFilters.resolved,
            activeFilters.userInteraction,
            isLoadingQuestions,
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
