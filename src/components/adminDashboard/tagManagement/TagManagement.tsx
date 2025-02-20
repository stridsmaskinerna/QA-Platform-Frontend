import {
    useEffect,
    useState,
} from "react";
import styles from "./TagManagement.module.css";
import { Input } from "../..";
import { useTranslation } from "react-i18next";
import { useFetchWithToken, useQAContext } from "../../../hooks";
import {  ITag } from "../../../utils";
import { BASE_URL } from "../../../data";
import delete_icon from "../../../assets/icons/delete.svg";

const tagUrl = `${BASE_URL}/tags`;
const deletetagUrl = (id: string) => `${BASE_URL}/tags?id=${id}`;

export function TagManagement() {
    const { requestHandler: fetchTags } = useFetchWithToken<ITag[]>();
    const { requestHandler: deletetag } = useFetchWithToken<ITag>();
    const { t } = useTranslation();
    const { loaderContext: { setIsLoading } } = useQAContext();

    const [Tags, setTags] = useState<ITag[]>([]);

    useEffect(() => {
        void fetchTags(tagUrl).then(data => {
            if (data) {
                setTags(data);
            }
        });
    }, []);

    const handleDelete = async (id: string) => {
        setIsLoading(true);
        try {
            await deletetag(deletetagUrl(id), { method: "DELETE" });
            setTags(prev => prev.filter(tag => tag.id !== id));
        } catch (error) {
            console.error("Error deleting tag:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
                <Input
                    inputName="manageTag"
                    inputType="text"
                    placeHolder={t("manageTag")}
                />

                <table className={styles.tagTable}>
                    <thead>
                        <tr>
                            <th>Tag Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Tags.map(tag => (
                            <tr key={tag.id}>
                                <td>{tag.value}</td>
                                <td>
                                    <button
                                        className={styles.deleteBtn}
                                        onClick={() => handleDelete(tag.id)}
                                    >
                                        <img src={delete_icon} alt="Delete Icon" className="delete-icon" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    );
}
