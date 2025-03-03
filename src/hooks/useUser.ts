import { useState, useEffect } from "react";
import { useFetchWithToken, usePUT } from "../hooks";
import { IUser } from "../utils";
import { BASE_URL, ADMIN_ROUTE } from "../data";

export function useUser() {
    const { putRequestWithError } = usePUT();
    const { requestHandler: fetchUsers } = useFetchWithToken<IUser[]>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setAllUsers] = useState<IUser[] | null>(null);
    const [filteredUsers, setFilteredUsers] = useState<IUser[] | null>(null); // Initialize to null!
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const AdminUrl = `${BASE_URL}${ADMIN_ROUTE}`;

    useEffect(() => {
        const fetchAllUsers = async () => {
            setIsLoading(true);
            try {
                const url = `${AdminUrl}users?searchString=${encodeURIComponent(searchTerm)}`; // Add searchString
                const data = await fetchUsers(url);
                if (data) {
                    setAllUsers(data);
                    setFilteredUsers(data);
                } else {
                    setAllUsers(null);
                    setFilteredUsers(null);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
                setAllUsers(null);
                setFilteredUsers(null);
            } finally {
                setIsLoading(false);
            }
        };

        void fetchAllUsers();
    }, [fetchUsers, AdminUrl, searchTerm]);

    const updateUserStatus = async (id: string, newStatus: boolean) => {
        const url = `${AdminUrl}blockuser?Id=${id}`;
        const data = { isBlocked: newStatus };
        console.log("Request URL:", url);
        console.log("Request Data:", data);
        try {
            const { error, response } = await putRequestWithError(url, data);

            if (error) {
                throw error;
            }

            setFilteredUsers(prevUsers => {
                if (!prevUsers) {
                    return []; // Or return null, depending on your state type
                }
                return prevUsers.map(user =>
                    user.id === id ? { ...user, isBlocked: newStatus } : user,
                );
            });

            const urlupdate = `${AdminUrl}users?searchString=${encodeURIComponent(searchTerm)}`;
            const updatedUsers = await fetchUsers(urlupdate);
            if (updatedUsers) {
                setAllUsers(updatedUsers);
                setFilteredUsers(updatedUsers);
            }

            return response;
        } catch (error) {
            console.error("Error updating user status:", error);
            throw error; // Re-throw for the calling component to handle
        }
    };

    const handleSearchChange = async (term: string) => {
        setSearchTerm(term);
        setIsLoading(true);

        try {
            const searchString = `?searchString=${encodeURIComponent(term)}`;
            const url = `${AdminUrl}users${searchString}`;
            const data = await fetchUsers(url);

            if (data) {
                // Check if data is not void
                setFilteredUsers(data);
            } else {
                setFilteredUsers([]); // or null
            }
        } catch (error) {
            console.error("Error searching users:", error);
            setFilteredUsers([]); // or null
        } finally {
            setIsLoading(false);
        }
    };

    return {
        filteredUsers,
        searchTerm,
        handleSearchChange,
        isLoading,
        updateUserStatus,
    };
}
