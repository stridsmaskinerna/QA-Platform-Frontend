import { ISubject, ITopic } from "../../../utils";

import styles from "./TopicManagerCard.module.css";

interface SubjectManagerCardProps {
  subject: ISubject;
}

export function TopicManagerCard({
  subject
}: SubjectManagerCardProps) {

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Topics for {subject.name}</h1>
      {subject.topics.map((topic, i) => <div key={i}>
        <TopicItem topic={topic}/>
      </div>)}
    </div>
  );
}

interface ITopicItemProps {
  topic: ITopic;
}

function TopicItem({
  topic
}: ITopicItemProps) {
  return (
    <div className={styles.subjectItem}>
      <p>{topic.name}</p>
    </div>
  );
}
