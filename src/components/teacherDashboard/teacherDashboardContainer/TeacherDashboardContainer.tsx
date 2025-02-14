import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { SubjectManager } from "../subjectManager";
import { ISubject } from "../../../utils";
import { TopicManager } from "../topicManager";
import { QuestionCardList } from "../../questionCardList";
import { Loader } from "../../loader";
import { useTeacherDashboardContext } from "../context";
import styles from "./TeacherDashboard.module.css";

export function TeacherDashboardContainer() {
    const { t } = useTranslation();
    const context = useTeacherDashboardContext();

    useEffect(() => {
        void context.fetchTeacherSubjects();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const displaySelectedSubject = (subject: ISubject) => {
        if (context.selectedSubject?.id != subject.id) {
            context.updateQuestions([]);
        }
        context.updateSelectedSubject(subject);
    };

    const fetchQuestionDetails = (subject: ISubject) => {
        void context.fetchQuestionDetails(subject);
    };

    const getDerivedHeader = () => {
        const questionInCourse = t("teacherDashboard.questionsInCourse");
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        return `${questionInCourse} '${context.selectedSubject?.name}'`
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{t("teacherDashboard.title")}</h1>
            <div className={styles.courseManagerContainer}>
                <SubjectManager
                    subjects={context.subjects}
                    selectedSubject={context.selectedSubject}
                    onSelectSubject={displaySelectedSubject}
                    onSelectSubjectQuestions={fetchQuestionDetails}
                />
                {context.selectedSubject != null && (
                    <TopicManager subject={context.selectedSubject} />
                )}
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
                />
            )}
        </div>
    );
}
