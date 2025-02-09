import { ChangeEvent, useEffect, useState } from "react";
import { BASE_URL } from "../data";
import { ICourse } from "../utils";
import { useFetchWithToken } from "./useFetchWithToken";
import { useDebounceCallback } from "usehooks-ts";

const url = `${BASE_URL}/subject`;

export function useSearchCourses() {
    const { requestHandler: fetchCourses, isLoading: isLoadingCourses } =
        useFetchWithToken<ICourse[]>();
    const [courses, setCourses] = useState<ICourse[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<ICourse[]>([]);

    const onCourseInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFilteredCourses(
            e.target.value
                ? courses.filter(
                      c =>
                          c.name
                              .toLowerCase()
                              .includes(e.target.value.toLowerCase()) ||
                          c.subjectCode
                              ?.toLowerCase()
                              .includes(e.target.value.toLowerCase()),
                  )
                : [],
        );
    };
    const debouncedOnCourseInputChange = useDebounceCallback(
        onCourseInputChange,
        300,
    );

    useEffect(() => {
        void fetchCourses(url).then(data => {
            if (data) {
                setCourses(data);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        isLoadingCourses,
        debouncedOnCourseInputChange,
        filteredCourses,
        courses,
    };
}
