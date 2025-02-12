import { ISubject } from "../../../utils";
import { CardContainer } from "../cardContainer";

import styles from "./SubjectListCard.module.css";

interface ISubjectListCardProps {
  subjects: ISubject[];
  selectedSubject: ISubject | null;
  onSelectSubject: (subject: ISubject) => void;
  onSelectSubjectQuestions: (subject: ISubject) => void;
}

// TODO Update backend to send teachers subjects.
export function SubjectListCard({
  subjects,
  selectedSubject,
  onSelectSubject,
  onSelectSubjectQuestions
}: ISubjectListCardProps) {

  const selectSubject = (subject: ISubject) => {
    onSelectSubject(subject)
  };

  const isSubjectSelected = (subject: ISubject) => {
    return selectedSubject != null && selectedSubject.id == subject.id;
  }


  return (
    <CardContainer>
      <h1>Your Courses</h1>
      <div>
        {subjects.slice(0, 5).map((s, i) =>
          <div
            key={i}
            onClick={() => { selectSubject(s); }}>
            <SubjectItem
              subject={s}
              isSelected={isSubjectSelected(s)}
              onSelectSubjectQuestions={onSelectSubjectQuestions}/>
          </div>)}
      </div>
    </CardContainer>
  );
}

interface ISubjectItemProps {
  subject: ISubject;
  isSelected: boolean;
  onSelectSubjectQuestions: (subject: ISubject) => void;
}

function SubjectItem({
  subject,
  isSelected,
  onSelectSubjectQuestions
}: ISubjectItemProps) {
  const getDerivedClassName = () => {
    return isSelected
      ? `${styles.selectedSubject} ${styles.subjectItem}`
      : styles.subjectItem;
  }

  return (
    <div className={getDerivedClassName()}>
      <div>
        <p>
          <span className={styles.subjectCode}>
            {subject.subjectCode}</span> - {subject.name}
        </p>
      </div>
      {isSelected && <div>
        <button 
          onClick={() => { onSelectSubjectQuestions(subject) }}
          className={styles.viewQuestions}>
          View questions
        </button>
      </div>}
    </div>
  );
}
