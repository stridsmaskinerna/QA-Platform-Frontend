import { FormEventHandler, useEffect, useRef, useState } from "react";
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
    const {
        loaderContext: { setIsLoading },
    } = useQAContext();
    const [allCourses, setAllCourses] = useState<ISubject[]>([]); // Store all courses
    const [filteredCourses, setFilteredCourses] = useState<ISubject[]>([]); // Store filtered courses
    const [searchTerm, setSearchTerm] = useState("");

    const [courses, setCourses] = useState<ISubject[]>([]);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        void fetchCourses(courseUrl).then(data => {
            if (data) {
                setAllCourses(data);
                setFilteredCourses(data);
            }
        });
    }, []);

    const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();
        void (async () => {
            const formData = new FormData(e.currentTarget);
            const formDetails = Object.fromEntries(formData);
            const teachers =
                typeof formDetails.teachers === "string"
                    ? formDetails.teachers.split(",").map(t => t.trim())
                    : [];

            const formattedData = {
                ...formDetails,
                teachers,
            };
            console.log(formattedData);
            setIsLoading(true);
            try {
                await postCourse(postCourseUrl, {
                    method: "POST",
                    body: JSON.stringify(formattedData),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                formRef.current?.reset();
                void fetchCourses(courseUrl).then(data => {
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
        })();
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);

        const filtered = allCourses.filter(course => {
            const searchString =
                `${course.subjectCode} ${course.name} ${course.teachers?.map(t => t.email).join(" ")}`.toLowerCase(); // Include teachers in search
            return searchString.includes(term.toLowerCase());
        });
        setFilteredCourses(filtered);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this course?")) return;
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
            <form
                onSubmit={handleSubmit}
                className={styles.form}
                ref={formRef}
            >
                <Input
                    inputName="subjectCode"
                    inputType="text"
                    label={t("addNewCourse")}
                    placeHolder={t("courseCodePlaceHolder")}
                />
                <Input
                    inputName="name"
                    inputType="text"
                    label={t("courseName")}
                    placeHolder={t("courseNamePlaceHolder")}
                />
                <Input
                    inputName="teachers"
                    inputType="text"
                    label={t("teacherName")}
                    placeHolder={t("teacherNamePlaceHolder")}
                />
                <button
                    className={styles.submitBtn}
                    type="submit"
                >
                    {t("addCourse")}
                </button>
            </form>
            <div className={styles.manageCourse}>
                <h2 className={styles.heading}>{t("manageExistingCourses")}</h2>
                <Input
                    inputName="manageCourse"
                    inputType="text"
                    placeHolder={t("manageCourse")}
                    inputValue={searchTerm}
                    onChange={handleSearchChange}
                />

                <table className={styles.courseTable}>
                    <thead>
                        <tr>
                            <th>{t("courseCode")}</th>
                            <th>{t("courseName")}</th>
                            <th>{t("teachers")}</th>
                            <th>{t("actions")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCourses.map(course => (
                            <tr key={course.id}>
                                <td data-label={t("courseCode")}>
                                    {course.subjectCode}
                                </td>
                                <td data-label={t("courseName")}>
                                    {course.name}
                                </td>
                                <td data-label={t("teachers")}>
                                    {course.teachers?.map(teacher => (
                                        <span
                                            key={teacher.id}
                                            className={styles.teacherTag}
                                        >
                                            {teacher.email}
                                        </span>
                                    ))}
                                </td>
                                <td data-label={t("actions")}>
                                    <button
                                        className={styles.deleteBtn}
                                        onClick={() =>
                                            void handleDelete(course.id)
                                        }
                                    >
                                        <img
                                            src={delete_icon}
                                            alt="Delete Icon"
                                            className="delete-icon"
                                        />
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
