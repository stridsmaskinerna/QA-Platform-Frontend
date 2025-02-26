import { useEffect, useState } from "react";
import styles from "./TagManagement.module.css";
import { Input } from "../..";
import { useTranslation } from "react-i18next";
import { useFetchWithToken, useQAContext } from "../../../hooks";
import { ITag } from "../../../utils";
import { BASE_URL } from "../../../data";
import delete_icon from "../../../assets/icons/delete.svg";

const tagUrl = `${BASE_URL}/tags`;
const deletetagUrl = (id: string) => `${BASE_URL}/tags?id=${id}`;

export function TagManagement() {
    const { requestHandler: fetchTags } = useFetchWithToken<ITag[]>();
    const { requestHandler: deletetag } = useFetchWithToken<ITag>();
    const { t } = useTranslation();
    const {
        loaderContext: { setIsLoading },
    } = useQAContext();

    const [allTags, setAllTags] = useState<ITag[]>([]); // Store all tags
    const [filteredTags, setFilteredTags] = useState<ITag[]>([]); // Store filtered tags
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        void fetchTags(tagUrl).then(data => {
            if (data) {
                setAllTags(data);
                setFilteredTags(data); // Initially, show all tags
            }
        });
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this course?")) return;
        setIsLoading(true);
        try {
            await deletetag(deletetagUrl(id), { method: "DELETE" });
            setAllTags(prev => prev.filter(tag => tag.id !== id));
            setFilteredTags(prev => prev.filter(tag => tag.id !== id)); // Update filtered tags too
        } catch (error) {
            console.error("Error deleting tag:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);

        const filtered = allTags.filter(tag =>
            tag.value.toLowerCase().includes(term.toLowerCase()),
        );
        setFilteredTags(filtered);
    };

    return (
        <div className={styles.container}>
            <Input
                inputName="manageTag"
                inputType="text"
                placeHolder={t("manageTag")}
                inputValue={searchTerm}
                onChange={handleSearchChange}
            />

            <table className={styles.tagTable}>
                <thead>
                    <tr>
                        <th>Tag Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTags.map(
                        (
                            tag, // Use filteredTags for rendering
                        ) => (
                            <tr key={tag.id}>
                                <td>{tag.value}</td>
                                <td>
                                    <button
                                        className={styles.deleteBtn}
                                        onClick={() =>
                                            void handleDelete(tag.id)
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
                        ),
                    )}
                </tbody>
            </table>
        </div>
    );
}
