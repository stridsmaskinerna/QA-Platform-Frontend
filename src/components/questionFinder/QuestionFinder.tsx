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
        subjectFilter,
        topicFilter,
        isLoadingQuestions,
        resolvedFilter,
        onResolvedFilterClick,
    } = useSearchQuestions();
    const { t } = useTranslation();
    const { isUser } = useRoles();

    const questionListContent = useMemo(
        () => (
            <QuestionCardList
                onResolvedFilterClick={onResolvedFilterClick}
                activeResolvedFilter={resolvedFilter}
                data={questions}
                isLoadingQuestions={isLoadingQuestions}
            />
        ),
        [isLoadingQuestions, onResolvedFilterClick, questions, resolvedFilter],
    );

    const tabs: ITab[] = useMemo(
        () => [
            {
                content: questionListContent,
                title: t("recentQuestions"),
                btnStyle: tabsBtnStyle,
                contentContainerStyle: tabContainerStyle,
            },
            {
                content: (
                    <MyQASection
                        activeFilter="answered"
                        setActiveFilter={filter => {}}
                    >
                        {questionListContent}
                    </MyQASection>
                ),
                title: t("myQa"),
                btnStyle: tabsBtnStyle,
            },
        ],
        [questionListContent, t],
    );

    return (
        <div className={styles.container}>
            <SearchWithFilters
                placeholder={t("searchQuestionsPlaceholder")}
                subjectFilter={subjectFilter}
                topicFilter={topicFilter}
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
