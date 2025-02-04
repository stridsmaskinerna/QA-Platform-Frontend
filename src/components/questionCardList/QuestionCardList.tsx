// import { useTranslation } from "react-i18next";
import { IQuestion } from "../../utils";
import { QuestionCard } from "../questionCard/QuestionCard";
import styles from "./QuestionCardList.module.css";
import { ResolvedFilters } from "./ResolvedFilters";

interface IQuestionCardListProps {
    data: IQuestion[];
    activeResolvedFilter: boolean | null;
    onResolvedFilterClick: (arg: boolean | null) => void;
}

export function QuestionCardList({
    data,
    activeResolvedFilter,
    onResolvedFilterClick
}: IQuestionCardListProps) {
    // const { t } = useTranslation();
    return (
        <div className={styles.container}>
            <div className={styles.headerRow}>
                <div />
                {/* <h3>{t("recentQuestions")}</h3> */}
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
