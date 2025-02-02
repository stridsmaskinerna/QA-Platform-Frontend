import { useTranslation } from "react-i18next";
import { IQuestion, ISearchWithFiltersProps } from "../../utils";
import { SearchWithFilters } from "..";

interface IQuestionFinderProps {
    searchAndFilterProps: ISearchWithFiltersProps;
    questions: IQuestion[];
}

export function QuestionFinder({
    searchAndFilterProps: {
        subjectFilter,
        topicFilter,
        onInputChange,
        showTopicsFilters
    },
    questions
}: IQuestionFinderProps) {
    const { t } = useTranslation();

    return (
        <div>
            <SearchWithFilters
                placeholder={t("searchQuestionsPlaceholder")}
                subjectFilter={subjectFilter}
                topicFilter={topicFilter}
                onInputChange={onInputChange}
                showTopicsFilters={showTopicsFilters}
            />

            <div style={{ height: "100px" }} />
            {questions.map(question => (
                <div key={question.id}>{question.topicName}</div>
            ))}
        </div>
    );
}
