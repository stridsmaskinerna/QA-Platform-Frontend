import { useEffect, useState } from "react";
import styles from "./TagManagement.module.css";
import { Input } from "../..";
import { useTranslation } from "react-i18next";
import { useFetchWithToken, useQAContext } from "../../../hooks";
import { ITag } from "../../../utils";
import { BASE_URL } from "../../../data";
import { DeleteButton } from "../../button"; // Import the DeleteButton component
import { Modal } from "../../modal"; // Assuming you have the Modal component imported

const tagUrl = `${BASE_URL}/tags`;
const deletetagUrl = (id: string) => `${BASE_URL}/tags?id=${id}`;

export function TagManagement() {
    const { requestHandler: fetchTags } = useFetchWithToken<ITag[]>();
    const { requestHandler: deletetag } = useFetchWithToken<ITag>();
    const { t } = useTranslation();
    const {
        loaderContext: { setIsLoading },
    } = useQAContext();

    const [allTags, setAllTags] = useState<ITag[]>([]);
    const [filteredTags, setFilteredTags] = useState<ITag[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [tagToDelete, setTagToDelete] = useState<string | null>(null);
    const [tagName, setTagName] = useState<string>(""); // State to store the tag name

    useEffect(() => {
        void fetchTags(tagUrl).then(data => {
            if (data) {
                setAllTags(data);
                setFilteredTags(data); // Initially, show all tags
            }
        });
    }, []); // Runs only once when the component is mounted

    const handleDelete = () => {
        if (tagToDelete) {
            setIsLoading(true);
            void (async () => {
                try {
                    await deletetag(deletetagUrl(tagToDelete), {
                        method: "DELETE",
                    });
                    setAllTags(prev =>
                        prev.filter(tag => tag.id !== tagToDelete),
                    );
                    setFilteredTags(prev =>
                        prev.filter(tag => tag.id !== tagToDelete),
                    );
                    setShowDeleteModal(false);
                } catch (error) {
                    console.error("Error deleting tag:", error);
                } finally {
                    setIsLoading(false);
                }
            })();
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);

        // Filter tags based on the search term
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
                onChange={handleSearchChange} // Trigger search on input change
            />

            <table className={styles.tagTable}>
                <thead>
                    <tr className={styles.tagTableHeader}>
                        <th className={styles.tagTableCell}>Tag Name</th>
                        <th className={styles.tagTableDelCell}>Actions</th>{" "}
                        {/* Header for actions column */}
                    </tr>
                </thead>
                <tbody>
                    {filteredTags.map(tag => (
                        <tr key={tag.id}>
                            <td className={styles.tagTableCell}>{tag.value}</td>
                            <td className={styles.tagTableDeleteCell}>
                                <DeleteButton
                                    onClick={() => {
                                        setTagToDelete(tag.id);
                                        setTagName(tag.value);
                                        setShowDeleteModal(true);
                                    }}
                                    text={t("delete")}
                                    icon={true}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showDeleteModal && (
                <Modal
                    title={t("deleteTag")}
                    message={`${t("areYouSureYouWantToDeleteTag")} ${tagName}?`}
                    okClick={handleDelete}
                    cancelClick={() => setShowDeleteModal(false)}
                    onBackdropClick={() => setShowDeleteModal(false)} //
                />
            )}
        </div>
    );
}
