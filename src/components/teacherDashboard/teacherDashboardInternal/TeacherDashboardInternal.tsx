import { useTranslation } from "react-i18next";

import { SubjectManager } from "../subjectManager";
import { TopicManager } from "../topicManager";
import { QuestionCardList } from "../../questionCardList";
import { Loader } from "../../loader";
import { useTeacherDashboardContext } from "../context";
import { H1 } from "../../text";
import styles from "./TeacherDashboardInternal.module.css";

export function TeacherDashboardInternal() {
    const { t } = useTranslation();
    const context = useTeacherDashboardContext();

    const getDerivedHeader = () => {
        const questionInCourse = t("teacherDashboard.questionsInCourse");
        return `${questionInCourse} '${context.selectedSubject?.name}'`;
    };

    return (
        <div className={styles.container}>
            <H1 text={t("teacherDashboard.title")} />
            <div className={styles.courseManagerContainer}>
                <SubjectManager />
                {context.selectedSubject != null && <TopicManager />}
            </div>
            <div className={styles.loader}>
                {context.isLoading() && <Loader />}
            </div>
            {context.questions.length != 0 && (
                <QuestionCardList
                    data={context.questions}
                    activeResolvedFilter={null}
                    onResolvedFilterClick={() => {
                        return;
                    }}
                    isLoadingQuestions={false}
                    header={getDerivedHeader()}
                    displayResolveFilter={false}
                    hasMore={context.hasMore}
                    loaderRef={context.loaderRef}
                    totalItemCount={context.totalItemCount}
                />
            )}
        </div>
    );
}
