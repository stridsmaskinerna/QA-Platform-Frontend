import { useTranslation } from "react-i18next";
import { IUser } from "../../../utils"; // Assuming this is the user model
import styles from "./UserManagement.module.css"; // Importing the CSS module styles
import { Loader } from "../..";

interface UserTableProps {
    users: IUser[];
    onBlockUnblock: (id: string) => Promise<void>;
    hasMore: boolean;
    loaderRef: (node?: Element | null) => void;
}

export function UserTable({
    users,
    onBlockUnblock,
    hasMore,
    loaderRef,
}: UserTableProps) {
    const { t } = useTranslation();

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>{t("username")}</th>
                        <th>{t("email")}</th>
                        <th>{t("adminDashBoard.status")}</th>
                        <th>{t("adminDashBoard.actions")}</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.userName}</td>
                            <td>{user.email}</td>
                            <td>
                                {user.isBlocked ? t("adminDashBoard.blocked") : t("adminDashBoard.active")}
                            </td>
                            <td>
                                <button
                                    onClick={() => void onBlockUnblock(user.id)}
                                    className={
                                        user.isBlocked
                                            ? styles.unblockBtn
                                            : styles.blockBtn
                                    }
                                >
                                    {user.isBlocked ? t("adminDashBoard.unblock") : t("adminDashBoard.block")}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {hasMore && (
                <div ref={loaderRef}>
                    <Loader />
                </div>
            )}
        </>
    );
}
