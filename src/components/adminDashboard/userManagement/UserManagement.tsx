import { useUser } from "../../../hooks/useUser";
import { Input } from "../..";
import styles from "./UserManagement.module.css";
import { UserTable } from "./UserTable";

export function UserManagement() {
    const {
        searchTerm,
        handleSearchChange,
        filteredUsers,
        updateUserStatus,
        isLoading,
    } = useUser();

    const handleBlockUnblock = async (id: string, isBlocked: boolean) => {
        if (!confirm("Are you sure you want to block/unblock this user?")) return;

        try {
            await updateUserStatus(id, !isBlocked);

        } catch (error) {
            console.error("Error updating user status:", error);
            alert("Failed to update user status. Please try again.");
        }
    };

    return (
        <div className={styles.container}>
            <Input
                inputName="manageUser"
                inputType="text"
                placeHolder="Manage User"
                inputValue={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
            />

            {isLoading && <div>Loading...</div>}
            {filteredUsers && <UserTable users={filteredUsers} onBlockUnblock={handleBlockUnblock} />}
            {filteredUsers === null && !isLoading && <div>No users found</div>}
        </div>
    );
}