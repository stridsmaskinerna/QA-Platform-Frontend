import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { SubjectListCard } from "../subjectListCard";
import { useFetchWithToken } from "../../../hooks";
import { IQuestion, ISubject, Role } from "../../../utils";
import { BASE_URL, GUEST_HOME_ROUTE, SUBJECT_URL } from "../../../data";
import { TopicManagerCard } from "../topicManagerCard/TopicManagerCard";
import { QuestionCardList } from "../../questionCardList";
import { AuthGuard } from "../../authGuard";
import styles from "./TeacherDashboard.module.css";
import { Loader } from "../../loader";

export function TeacherDashboard() {
    const { t } = useTranslation();
    const [subjects, setSubjects] = useState<ISubject[]>([]);
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<ISubject | null>(null);
    const fetchSubjects = useFetchWithToken<ISubject[]>();
    const fetchSubjectQuestions = useFetchWithToken<IQuestion[]>();

    useEffect(() => {
        const fetchTeacherSubjects = async () => {
            const data = await fetchSubjects.requestHandler(
                `${BASE_URL}${SUBJECT_URL}/teacher`,
            );

            if (data != null) {
                setSubjects(data ?? []);
                setSelectedSubject(data[0]);
            } else {
                setSubjects([]);
                setSelectedSubject(null);
            }
        };

        void fetchTeacherSubjects();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const displaySelectedSubject = (subject: ISubject) => {
        if (selectedSubject?.id != subject.id) {
            setQuestions([]);
        }
        setSelectedSubject(subject);
    };

    const fetchQuestionDetails = (subject: ISubject) => {
        const fetch = async () => {
            const data = await fetchSubjectQuestions.requestHandler(
                `${BASE_URL}${SUBJECT_URL}/${subject.id}/questions`
            );

            setQuestions(data ?? []);
        };

        // TODO handle error ??
        void fetch();
    };

    return (
        <AuthGuard roleBasedRedirect={{
            allowedRoles: [Role.Teacher],
            fallbackRoute: GUEST_HOME_ROUTE,
        }}>
            <div className={styles.container}>
                <h1 className={styles.title}>{t("teacherDashboard.title")}</h1>
                <div className={styles.courseManagerContainer}>
                    <SubjectListCard
                        subjects={subjects}
                        selectedSubject={selectedSubject}
                        onSelectSubject={displaySelectedSubject}
                        onSelectSubjectQuestions={fetchQuestionDetails} />
                    {selectedSubject != null &&
                        <TopicManagerCard
                            subject={selectedSubject} />
                    }
                </div>
                <div className={styles.loader}>
                    {fetchSubjects.isLoading || fetchSubjectQuestions.isLoading && <Loader />}
                </div>
                {questions.length != 0 && <QuestionCardList
                    data={questions}
                    activeResolvedFilter={null}
                    onResolvedFilterClick={() => { return; }}
                    isLoadingQuestions={false}
                    header={`${t("teacherDashboard.questionsInCourse")} '${selectedSubject?.name}'`}
                    displayResolveFilter={false} />
                }
            </div>
        </AuthGuard>
    );
}
