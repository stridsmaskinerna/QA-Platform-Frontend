import { useTranslation } from "react-i18next";
import { SearchWithFilters } from "..";
import { useSearchQuestions } from "../../hooks";

export function QuestionFinder() {
    const {
        debouncedSearch,
        questions,
        subjectFilter,
        topicFilter,
        showTopicsFilters
    } = useSearchQuestions();
    const { t } = useTranslation();

    return (
        <div>
            <SearchWithFilters
                placeholder={t("searchQuestionsPlaceholder")}
                subjectFilter={subjectFilter}
                topicFilter={topicFilter}
                onInputChange={debouncedSearch}
                showTopicsFilters={showTopicsFilters}
            />

            {/* Here goes the Recent Questions - My Q&A which will be conditionally rendered depending on having the User role.
            This component will then be usable in HomeLimited as well */}

            <div style={{ height: "100px" }} />
            {questions.map(question => (
                <div key={question.id}>{question.topicName}</div>
            ))}
        </div>
    );
}
