import { useEffect } from "react";

import styles from "./CourseListCard.module.css";

interface ICourseListCardProps {
  data: string;
}

export function CourseListCard({
  data
}: ICourseListCardProps) {

  useEffect(() => {
    console.log(data);
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Courses</h1>
    </div>
  );
}
