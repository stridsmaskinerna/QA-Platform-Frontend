import { useTranslation } from "react-i18next";
import { SearchWithFilters, Tabs } from "..";
import { useRoles, useSearchQuestions } from "../../hooks";
import { QuestionCardList } from "../questionCardList";
import styles from "./QuestionFinder.module.css";
import { ITab } from "../../utils";
import { CSSProperties } from "react";

const tabContainerStyle: CSSProperties = { width: "100%", marginTop: "3rem" };

const tabsOuterContainerStyle: CSSProperties = {
    width: "100%",
    flexDirection: "column",
};

const tabsBtnStyle: CSSProperties = {
    fontSize: "clamp(16px, 2vw, 1.5rem)",
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

    const tabs: ITab[] = [
        {
            content: (
                <QuestionCardList
                    data={questions}
                    isLoadingQuestions={isLoadingQuestions}
                />
            ),
            title: t("recentQuestions"),
            btnStyle: tabsBtnStyle,
            contentContainerStyle: tabContainerStyle,
        },
        { content: <></>, title: t("myQa"), btnStyle: tabsBtnStyle },
    ];

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
                <QuestionCardList
                    onResolvedFilterClick={onResolvedFilterClick}
                    activeResolvedFilter={resolvedFilter}
                    data={questions}
                    isLoadingQuestions={isLoadingQuestions}
                />
            )}
        </div>
    );
}
