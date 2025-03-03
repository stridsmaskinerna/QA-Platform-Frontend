import { FormEventHandler, useEffect, useRef, useState } from "react";
import styles from "./CourseManagement.module.css";
import { DeleteButton, EditButton, Input, Modal, SaveButton } from "../..";
import { useTranslation } from "react-i18next";
import {
    useDELETE,
    useFetchWithToken,
    usePOST,
    usePUT,
    useQAContext,
} from "../../../hooks";
import {
    ISubject,
    ISubjectForPut,
    removePropertiesFromObject,
} from "../../../utils";
import { BASE_URL } from "../../../data";
import removeX from "../../../assets/icons/removeX.svg";

const courseUrl = `${BASE_URL}/subjects`;
const deleteCourseUrl = (id: string) => `${BASE_URL}/subjects/${id}`;

export function CourseManagement() {
    const { requestHandler: fetchCourses } = useFetchWithToken<ISubject[]>();
    const { postRequestWithError: postCourse } = usePOST();
    const { deleteRequestWithError: deleteCourse } = useDELETE();
    const { putRequestWithError: putSubject } = usePUT<ISubject>();
    const { t } = useTranslation();
    const {
        loaderContext: { setIsLoading },
    } = useQAContext();
    const [allCourses, setAllCourses] = useState<ISubject[]>([]); // Store all courses
    const [filteredCourses, setFilteredCourses] = useState<ISubject[]>([]); // Store filtered courses
    const [courseForEditing, setCourseForEditing] = useState<ISubjectForPut>();
    const [addTeacherInput, setAddTeacherInput] = useState("");
    const [showCreateCourseConfirmation, setShowCreateCourseConfirmation] =
        useState(false);

    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();
        void (async () => {
            setIsLoading(true);
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

            const { error } = await postCourse(courseUrl, formattedData);
            if (!error) {
                setShowCreateCourseConfirmation(true);
            } else {
                console.error(error);
            }
            setIsLoading(false);
        })();
    };

    const handleOkConfirmation = () => {
        setShowCreateCourseConfirmation(false);
        window.location.reload();
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.trim().toLowerCase();
        setFilteredCourses(
            term
                ? allCourses
                      .filter(
                          c =>
                              c.name.toLowerCase().includes(term) ||
                              c.subjectCode?.toLowerCase().includes(term),
                      )
                      .slice(0, 15)
                : allCourses.slice(0, 15),
        );
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this course?")) return;
        setIsLoading(true);

        const { error } = await deleteCourse(deleteCourseUrl(id), {
            method: "DELETE",
        });

        if (!error) {
            setFilteredCourses(prev => prev.filter(course => course.id !== id));
        } else if (error.errorCode === 403) {
            //TODO
            //Display modal saying it is unallowed because course has questions connected to it
        } else {
            console.error(error);
        }
        setIsLoading(false);
    };

    const handleAddTeacher = () => {
        if (!addTeacherInput.trim()) {
            return;
        }

        const formattedInput = addTeacherInput
            .split(",")
            .map(e => e.trim())
            .filter(e => e && !courseForEditing?.teachers.includes(e));

        setCourseForEditing(prev => {
            if (prev) {
                return {
                    ...prev,
                    teachers: [...prev.teachers, ...formattedInput],
                };
            }
            return prev;
        });
        setAddTeacherInput("");
    };

    const handleEditClick = (subject: ISubject) => {
        setCourseForEditing(prev => {
            if (prev?.id !== subject.id) {
                return {
                    id: subject.id,
                    teachers: subject.teachers?.map(t => t.email) ?? [],
                    name: subject.name,
                    subjectCode: subject.subjectCode,
                };
            }
            return undefined;
        });
    };

    const handleRemoveTeacherTag = (teacherEmail: string) => {
        setCourseForEditing(prev => {
            if (prev) {
                return {
                    ...prev,
                    teachers: prev.teachers.filter(
                        e => e.toLowerCase() !== teacherEmail.toLowerCase(),
                    ),
                };
            }
            return prev;
        });
    };

    const handleSaveSubjectChanges = async () => {
        if (courseForEditing) {
            setIsLoading(true);
            const { error, response } = await putSubject(
                `${courseUrl}/${courseForEditing.id}`,
                removePropertiesFromObject({ ...courseForEditing }, "id"),
            );

            if (!error && response) {
                setFilteredCourses(prev => {
                    const idx = prev.findIndex(
                        s => s.id === courseForEditing.id,
                    );

                    const prevCopy = [...prev];

                    prevCopy.splice(idx, 1, response);
                    return prevCopy;
                });
                setCourseForEditing(undefined);
            } else {
                console.error(error);
            }
            setIsLoading(false);
        }
    };

    useEffect(() => {
        void fetchCourses(courseUrl).then(data => {
            if (data) {
                setAllCourses(data);
                setFilteredCourses(data.slice(0, 15));
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    label={t("adminDashBoard.addNewCourse")}
                    placeHolder={t("adminDashBoard.courseCodePlaceHolder")}
                />
                <Input
                    inputName="name"
                    inputType="text"
                    label={t("adminDashBoard.courseName")}
                    placeHolder={t("adminDashBoard.courseNamePlaceHolder")}
                />
                <Input
                    required={false}
                    inputName="teachers"
                    inputType="text"
                    label={t("adminDashBoard.teacherName")}
                    placeHolder={t("adminDashBoard.teacherNamePlaceHolder")}
                />
                <button
                    className={styles.submitBtn}
                    type="submit"
                >
                    {t("adminDashBoard.addCourse")}
                </button>
            </form>
            <div className={styles.manageCourse}>
                <h2 className={styles.heading}>
                    {t("adminDashBoard.manageExistingCourses")}
                </h2>

                {courseForEditing ? (
                    <div className={styles.addTeacherContainer}>
                        <Input
                            label={t("addTeacherToSubject", {
                                subject: `${courseForEditing.subjectCode ? courseForEditing.subjectCode + " " : ""}${courseForEditing.name}`,
                            })}
                            placeHolder={t(
                                "adminDashBoard.teacherNamePlaceHolder",
                            )}
                            inputType="text"
                            inputValue={addTeacherInput}
                            onChange={e => setAddTeacherInput(e.target.value)}
                        />
                        <button
                            onClick={handleAddTeacher}
                            className={styles.addTeacherBtn}
                        >
                            {t("addTeacher")}
                        </button>
                    </div>
                ) : (
                    <Input
                        label={t("searchSubjects")}
                        inputName="manageCourse"
                        inputType="search"
                        placeHolder={t(
                            "adminDashBoard.searchCoursePlaceholder",
                        )}
                        onChange={handleSearchChange}
                    />
                )}

                <table className={styles.courseTable}>
                    <thead>
                        <tr>
                            <th>{t("adminDashBoard.courseCode")}</th>
                            <th>{t("adminDashBoard.courseName")}</th>
                            <th>{t("adminDashBoard.teachers")}</th>
                            <th>{t("adminDashBoard.actions")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCourses.map(course => (
                            <tr
                                key={course.id}
                                className={
                                    course.id === courseForEditing?.id
                                        ? styles.activeRow
                                        : ""
                                }
                            >
                                <td data-label={t("adminDashBoard.courseCode")}>
                                    {course.id === courseForEditing?.id ? (
                                        <Input
                                            inputType="text"
                                            inputValue={
                                                courseForEditing.subjectCode ??
                                                ""
                                            }
                                            onChange={e =>
                                                setCourseForEditing(prev => ({
                                                    ...prev!,
                                                    subjectCode: e.target.value,
                                                }))
                                            }
                                        />
                                    ) : (
                                        course.subjectCode
                                    )}
                                </td>
                                <td data-label={t("adminDashBoard.courseName")}>
                                    {course.id === courseForEditing?.id ? (
                                        <Input
                                            inputType="text"
                                            inputValue={courseForEditing.name}
                                            onChange={e =>
                                                setCourseForEditing(prev => ({
                                                    ...prev!,
                                                    name: e.target.value,
                                                }))
                                            }
                                        />
                                    ) : (
                                        course.name
                                    )}
                                </td>
                                <td data-label={t("adminDashBoard.teachers")}>
                                    <div
                                        className={styles.teacherTagsContainer}
                                    >
                                        {(course.id === courseForEditing?.id
                                            ? courseForEditing.teachers
                                            : (course.teachers?.map(
                                                  c => c.email,
                                              ) ?? [])
                                        ).map((email, idx) => (
                                            <button
                                                disabled={
                                                    course.id !==
                                                    courseForEditing?.id
                                                }
                                                onClick={() =>
                                                    handleRemoveTeacherTag(
                                                        email,
                                                    )
                                                }
                                                key={`${email}-${idx}`}
                                                className={`${styles.teacherTag} ${course.id === courseForEditing?.id ? styles.activeTag : ""}`}
                                            >
                                                {email}
                                                {course.id ===
                                                    courseForEditing?.id && (
                                                    <img
                                                        src={removeX}
                                                        className={styles.xIcon}
                                                    />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </td>
                                <td data-label={t("adminDashBoard.actions")}>
                                    <div className={styles.actionsContainer}>
                                        <div className={styles.btnsContainer}>
                                            <EditButton
                                                disabled={
                                                    courseForEditing !==
                                                        undefined &&
                                                    course.id !==
                                                        courseForEditing.id
                                                }
                                                text={
                                                    course.id ===
                                                    courseForEditing?.id
                                                        ? t("cancelChanges")
                                                        : t("edit")
                                                }
                                                onClick={() =>
                                                    handleEditClick(course)
                                                }
                                            />
                                            {course.id ===
                                                courseForEditing?.id && (
                                                <SaveButton
                                                    onClick={() =>
                                                        void handleSaveSubjectChanges()
                                                    }
                                                    text={t("saveChanges")}
                                                />
                                            )}
                                            {course.id !==
                                                courseForEditing?.id && (
                                                <DeleteButton
                                                    disabled={
                                                        courseForEditing !==
                                                        undefined
                                                    }
                                                    text={t("delete")}
                                                    onClick={() =>
                                                        void handleDelete(
                                                            course.id,
                                                        )
                                                    }
                                                />
                                            )}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showCreateCourseConfirmation && (
                <Modal
                    onBackdropClick={handleOkConfirmation}
                    title={t("adminDashBoard.confirmation")}
                    message={t("adminDashBoard.courseCreated")}
                    okClick={handleOkConfirmation}
                />
            )}
        </div>
    );
}
