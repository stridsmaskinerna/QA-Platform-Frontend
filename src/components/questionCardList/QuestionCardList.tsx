import { useTranslation } from "react-i18next";
import { IQuestion } from "../../utils";
import { Loader } from "..";
import { QuestionCard } from "../questionCard/QuestionCard";
import styles from "./QuestionCardList.module.css";
import { ResolvedFilters } from "./ResolvedFilters";

interface IQuestionCardListProps {
    data: IQuestion[];
    activeResolvedFilter: boolean | null;
    onResolvedFilterClick: (arg: boolean | null) => void;
    isLoadingQuestions: boolean;
}

export function QuestionCardList({
    data,
    activeResolvedFilter,
    onResolvedFilterClick,
    isLoadingQuestions,
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

    return (
        <div className={styles.container}>
            <div className={styles.headerRow}>
                <h3>{t("recentQuestions")}</h3>
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
        </div>
    );
}
