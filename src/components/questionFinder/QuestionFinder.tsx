import { useTranslation } from "react-i18next";
import { Loader, SearchWithFilters } from "..";
import { useSearchQuestions } from "../../hooks";
import { QuestionCardList } from "../questionCardList";
import styles from "./QuestionFinder.module.css";

export function QuestionFinder() {
    const {
        debouncedSearch,
        questions,
        subjectFilter,
        topicFilter,
        isLoadingQuestions
    } = useSearchQuestions();
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <SearchWithFilters
                placeholder={t("searchQuestionsPlaceholder")}
                subjectFilter={subjectFilter}
                topicFilter={topicFilter}
                onInputChange={debouncedSearch}
                isLoadingQuestions={isLoadingQuestions}
            />

            {/* Here goes the Recent Questions - My Q&A which will be conditionally rendered depending on having the User role.
            This component will then be usable in HomeLimited as well */}

            {isLoadingQuestions ? (
                <div className={styles.loader}>
                    <Loader />
                </div>
            ) : (
                <QuestionCardList data={questions} />
            )}
        </div>
    );
}
