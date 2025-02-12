import { useRoles } from "../../../hooks/useRoles";
import { useEffect, useState } from "react";

import styles from "./TeacherDashboard.module.css";
import { SubjectListCard } from "../subjectListCard";
import { useFetchWithToken, useQAContext } from "../../../hooks";
import { IQuestion, ISubject } from "../../../utils";
import { BASE_URL } from "../../../data";
import { TopicManagerCard } from "../topicManagerCard/TopicManagerCard";
import { QuestionCardList } from "../../questionCardList";

// TODO Update backend to send teachers subjects.
// TODO Mobile UI.
export function TeacherDashboard() {
  const context = useQAContext()
  const [subjects, setSubjects] = useState<ISubject[]>([])
  const [questions, setQuestions] = useState<IQuestion[]>([])
  const [selectedSubject, setSelectedSubject] = useState<ISubject | null>(null)
  const roles = useRoles();
  const fetchSubjects = useFetchWithToken<ISubject[]>();
  const fetchSubjectQuestions = useFetchWithToken<IQuestion[]>();

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      const data = await fetchSubjects.requestHandler(
        `${BASE_URL}/subject`,
      );
      
      if (data != null) {
        setSubjects(data ?? []);
        setSelectedSubject(data[0]);
      } else {
        setSubjects([]);
        setSelectedSubject(null);
      }
    };

    context.loaderContext.setIsLoading(true)
    void fetchQuestionDetails();
    context.loaderContext.setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displaySelectedSubject = (subject: ISubject) => {
    if (selectedSubject?.id != subject.id) {
      setQuestions([]);
    }
    setSelectedSubject(subject);
  };

  // Get questions        
  const fetchQuestionDetails = (subject: ISubject) => {
    const fetch = async () => {
      const data = await fetchSubjectQuestions.requestHandler(
        `${BASE_URL}/subject/${subject.id}/questions`
      );

      setQuestions(data ?? []);
    };

    context.loaderContext.setIsLoading(true)
    void fetch()
    context.loaderContext.setIsLoading(false)   
  };

  if (fetchSubjects.error != null) {
    // TODO handle error.
    console.log(fetchSubjects.error);
  }

  if (!roles.isTeacher) {
    // TODO navigate back.
    console.log("only teacher");
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Teacher Dashboard</h1>
      <div className={styles.courseManagerContainer}>
        <SubjectListCard
          subjects={subjects}
          selectedSubject={selectedSubject}
          onSelectSubject={displaySelectedSubject}
          onSelectSubjectQuestions={fetchQuestionDetails} />
        {selectedSubject != null && <TopicManagerCard subject={selectedSubject} />}
      </div>
      {questions.length != 0 && <QuestionCardList
          data={questions}
          activeResolvedFilter={null}
          onResolvedFilterClick={() => { return; }}
          isLoadingQuestions={false}
          header={`Questions in course ${selectedSubject?.name}`} />}
    </div>
  );
}
