import { SearchWithFilters } from "../../components";
import { useSearchQuestions } from "../../hooks";
import styles from "./HomeExtended.module.css";

export function HomeExtended() {
    const {
        debouncedSearch,
        questions,
        subjectFilter,
        topicFilter,
        showTopicsFilters
    } = useSearchQuestions();

    return (
        <section className={styles.container}>
            <SearchWithFilters
                subjectFilter={subjectFilter}
                topicFilter={topicFilter}
                onInputChange={debouncedSearch}
                showTopicFilters={showTopicsFilters}
            />
            <div style={{ height: "100px" }} />
            {questions.map(question => (
                <div key={question.id}>{question.topicName}</div>
            ))}
        </section>
    );
}
