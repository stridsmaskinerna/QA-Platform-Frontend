import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { SubjectListCard } from "../subjectListCard";
import { ISubject } from "../../../utils";
import { TopicManagerCard } from "../topicManagerCard/TopicManagerCard";
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

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>{t("teacherDashboard.title")}</h1>
			<div className={styles.courseManagerContainer}>
				<SubjectListCard
					subjects={context.subjects}
					selectedSubject={context.selectedSubject}
					onSelectSubject={displaySelectedSubject}
					onSelectSubjectQuestions={fetchQuestionDetails}
				/>
				{context.selectedSubject != null && (
					<TopicManagerCard subject={context.selectedSubject} />
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
					header={`${t("teacherDashboard.questionsInCourse")} '${context.selectedSubject?.name}'`}
					displayResolveFilter={false}
				/>
			)}
		</div>
	);
}
