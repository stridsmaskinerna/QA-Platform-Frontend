import {
    FormEventHandler,
    useEffect,
    useRef,
    useState,
} from "react";
import styles from "./CourseManagement.module.css";
import { Input } from "../..";
import { useTranslation } from "react-i18next";
import { useFetchWithToken, useQAContext } from "../../../hooks";
import { CustomError, ISubject } from "../../../utils";
import { BASE_URL } from "../../../data";
import delete_icon from "../../../assets/icons/delete.svg";

const courseUrl = `${BASE_URL}/subjects`;
const postCourseUrl = `${BASE_URL}/subjects`;
const deleteCourseUrl = (id: string) => `${BASE_URL}/subjects/${id}`;

export function CourseManagement() {
    const { requestHandler: fetchCourses } = useFetchWithToken<ISubject[]>();
    const { requestHandler: postCourse } = useFetchWithToken<void>();
    const { requestHandler: deleteCourse } = useFetchWithToken<void>();
    const { t } = useTranslation();
    const { loaderContext: { setIsLoading } } = useQAContext();

    const [courses, setCourses] = useState<ISubject[]>([]);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        void fetchCourses(courseUrl).then(data => {
            if (data) {
                setCourses(data);
            }
        });
    }, []);

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formDetails = Object.fromEntries(formData);
        console.log(formDetails);
        setIsLoading(true);
        try {
            await postCourse(postCourseUrl, {
                
                method: "POST",
                body: JSON.stringify(formDetails),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            formRef.current?.reset();
            void fetchCourses(courseUrl).then((data) => {
                if (data) setCourses(data);
            });
        } catch (error) {
            if (error instanceof CustomError) {
                console.error(error);
            } else {
                throw error;
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        setIsLoading(true);
        try {
            await deleteCourse(deleteCourseUrl(id), { method: "DELETE" });
            setCourses(prev => prev.filter(course => course.id !== id));
        } catch (error) {
            console.error("Error deleting course:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form} ref={formRef}>
                <Input
                    inputName="courseCode"
                    inputType="text"
                    label={t("addNewCourse")}
                    placeHolder={t("courseCodePlaceHolder")}
                />
                <Input
                    inputName="courseName"
                    inputType="text"
                    label={t("courseName")}
                    placeHolder={t("courseNamePlaceHolder")}
                />
                <Input
                    inputName="teacherName"
                    inputType="text"
                    label={t("teacherName")}
                    placeHolder={t("teacherNamePlaceHolder")}
                />
                <button className={styles.submitBtn} type="submit">
                    {t("addCourse")}
                </button>
            </form>
            <div className= {styles.manageCourse}>
                <h2 className={styles.heading}>Manage Existing Courses</h2>
                <Input
                    inputName="manageCourse"
                    inputType="text"
                    placeHolder={t("manageCourse")}
                />

                <table className={styles.courseTable}>
                    <thead>
                        <tr>
                            <th>Course Code</th>
                            <th>Course Name</th>
                            <th>Teachers</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map(course => (
                            <tr key={course.id}>
                                <td>{course.subjectCode}</td>
                                <td>{course.name}</td>
                                <td>
                                    {course.teachers?.map(teacher => (
                                        <span key={teacher.id} className={styles.teacherTag}>
                                            {teacher.email}
                                        </span>
                                    ))}
                                </td>
                                <td>
                                    <button
                                        className={styles.deleteBtn}
                                        onClick={() => handleDelete(course.id)}
                                    >
                                        <img src={delete_icon} alt="Delete Icon" className="delete-icon" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
