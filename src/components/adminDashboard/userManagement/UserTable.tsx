import { IUser } from "../../../utils"; // Assuming this is the user model
import styles from './UserManagement.module.css'; // Importing the CSS module styles

interface UserTableProps {
    users: IUser[];
    onBlockUnblock: (id: string, isBlocked: boolean) => void;
}

export function UserTable({ users, onBlockUnblock }: UserTableProps) {
    return (
        <table>
            <thead>
                <tr>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.length === 0 ? (
                    <tr>
                        <td colSpan={4}>No users found</td>
                    </tr>
                ) : (
                    users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.userName}</td>
                            <td>{user.email}</td>
                            <td>{user.isBlocked ? "Blocked" : "Active"}</td>
                            <td>
                                <button
                                    onClick={() => onBlockUnblock(user.id, user.isBlocked)}
                                    className={user.isBlocked ? styles.unblockBtn : styles.blockBtn}
                                >
                                    {user.isBlocked ? "Unblock" : "Block"}
                                </button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
}
