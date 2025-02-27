import { Input, Loader } from "../..";
import styles from "./UserManagement.module.css";
import { UserTable } from "./UserTable";
import { useTranslation } from "react-i18next";
import { useInfiniteScrolling, usePUT } from "../../../hooks";
import { BASE_URL, USERS_URL } from "../../../data";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { IUser } from "../../../utils";

const getUsersUrl = `${BASE_URL}${USERS_URL}`;
const blockUserUrl = `${BASE_URL}/admin/blockuser`;

export function UserManagement() {
    const { t } = useTranslation();
    const { putRequestWithError } = usePUT();
    const [searchString, setSearchString] = useState("");
    const {
        isLoading,
        totalItemCount,
        resetPaginatedData,
        paginatedData,
        hasMore,
        loaderRef,
        fetchFromStart,
        setPaginatedData,
    } = useInfiniteScrolling<IUser>({
        url: `${getUsersUrl}?searchString=${searchString}`,
        limit: 20,
    });

    const handleBlockUnblock = async (id: string) => {
        if (!confirm("Are you sure you want to block/unblock this user?"))
            return;

        try {
            await updateUserStatus(id);
        } catch (error) {
            console.error("Error updating user status:", error);
            alert("Failed to update user status. Please try again.");
        }
    };

    const handleSearchChange: ChangeEventHandler<HTMLInputElement> = e => {
        setSearchString(e.target.value);
        void (async () => {
            await debouncedHandleSearchChange(e.target.value);
        })();
    };

    const fetchUsersBySearchString = async (str: string) => {
        await fetchFromStart(`${getUsersUrl}?searchString=${str}`);
    };

    const debouncedHandleSearchChange = useDebounceCallback(
        fetchUsersBySearchString,
        400,
        { leading: true },
    );

    const updateUserStatus = async (id: string) => {
        const url = `${blockUserUrl}?Id=${id}`;
        const { error } = await putRequestWithError(url);

        if (error) {
            throw error;
        }

        setPaginatedData(prev => {
            const idx = prev.findIndex(u => u.id === id);
            const user = prev.find(u => u.id === id);
            const prevCopy = [...prev];
            if (user) {
                prevCopy.splice(idx, 1, {
                    ...user,
                    isBlocked: !user.isBlocked,
                });
            }
            return prevCopy;
        });
    };

    useEffect(() => {
        void fetchFromStart(`${getUsersUrl}?searchString=`);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.container}>
            <Input
                inputName="manageUser"
                inputType="search"
                placeHolder={t("searchUser")}
                inputValue={searchString}
                onChange={handleSearchChange}
            />
            {isLoading && <Loader />}
            {paginatedData.length > 0 && (
                <>
                    <h4 className={styles.foundInfo}>
                        {t("nrOfUsersFound", { count: totalItemCount })}
                    </h4>
                    <UserTable
                        hasMore={hasMore}
                        loaderRef={loaderRef}
                        users={paginatedData}
                        onBlockUnblock={handleBlockUnblock}
                    />
                </>
            )}
            {paginatedData.length === 0 && !isLoading && searchString && (
                <h5>{t("noUsersFound")}</h5>
            )}
        </div>
    );
}
