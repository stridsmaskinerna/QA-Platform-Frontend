import { ISubject } from "../../../utils";
import { SubjectItem } from "../subjectItem";

interface ISubjectListProps {
    subjects: ISubject[];
    selectedSubject: ISubject | null;
    onSelectSubject: (subject: ISubject) => void;
    onSelectSubjectQuestions: (subject: ISubject) => void;
}

export function SubjectList({
    subjects,
    selectedSubject,
    onSelectSubject,
    onSelectSubjectQuestions,
}: ISubjectListProps) {
    const selectSubject = (subject: ISubject) => {
        onSelectSubject(subject);
    };

    const isSubjectSelected = (subject: ISubject) => {
        return selectedSubject != null && selectedSubject.id == subject.id;
    };

    return (
        <>
            {subjects.map((s, i) => (
                <div
                    key={i}
                    onClick={() => {
                        selectSubject(s);
                    }}
                >
                    <SubjectItem
                        subject={s}
                        isSelected={isSubjectSelected(s)}
                        onSelectSubjectQuestions={onSelectSubjectQuestions}
                    />
                </div>
            ))}
        </>
    );
}
