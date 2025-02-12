import { useRoles } from "../../../hooks/useRoles";
import { useEffect } from "react";

import styles from "./TeacherDashboard.module.css";
import { CourseListCard } from "../courseListCard";

interface ITeacherDashboardProps {
  data: string;
}

export function TeacherDashboard({
  data
}: ITeacherDashboardProps) {
  const { isUser, isTeacher } = useRoles();

  useEffect(() => {
    console.log(data);
  });

  if (isUser) {
    console.log("only teacher");
  }

  if (isTeacher) {
    console.log("only teacher");
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Teacher Dashboard</h1>
      <CourseListCard  data="test"/>
    </div>
  );
}
