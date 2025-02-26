import { useEffect, useState } from "react";
import styles from "./TagManagement.module.css";
import { Input, Loader } from "../..";
import { useTranslation } from "react-i18next";
import {
    useDELETE,
    useFetchWithToken,
    useInfiniteScrolling,
    useQAContext,
} from "../../../hooks";
import { ITag } from "../../../utils";
import { BASE_URL } from "../../../data";
import { DeleteButton } from "../../button"; // Import the DeleteButton component
import { Modal } from "../../modal"; // Assuming you have the Modal component imported

const tagUrl = `${BASE_URL}/tags`;
const deletetagUrl = (id: string) => `${BASE_URL}/tags?id=${id}`;

export function TagManagement() {
    const { deleteRequestWithError: deleteTag } = useDELETE<ITag>();
    const { t } = useTranslation();
    const {
        loaderContext: { setIsLoading },
    } = useQAContext();

    const [searchTerm, setSearchTerm] = useState("");
    const [tagToDelete, setTagToDelete] = useState<ITag | null>(null);
    const {
        isLoading,
        totalItemCount,
        paginatedData,
        removeIdFromPaginatedData,
        hasMore,
        loaderRef,
        fetchFromStart,
    } = useInfiniteScrolling<ITag>({
        url: `${tagUrl}${searchTerm ? `?subTagValue=${searchTerm}` : ""}`,
        limit: 20,
    });

    useEffect(() => {
        void fetchFromStart(tagUrl);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = () => {
        if (tagToDelete == null) return;
        setIsLoading(true);
        void (async () => {
            const { error } = await deleteTag(deletetagUrl(tagToDelete.id));
            if (!error) {
                removeIdFromPaginatedData(tagToDelete.id);
                setTagToDelete(null);
            } else {
                console.error(error);
            }
            setIsLoading(false);
        })();
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);

        void fetchFromStart(`${tagUrl}?subTagValue=${term}`);
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
            {isLoading && <Loader />}
            {totalItemCount != null && <p>{totalItemCount} found</p>}
            <table className={styles.tagTable}>
                <thead>
                    <tr className={styles.tagTableHeader}>
                        <th className={styles.tagTableCell}>Tag Name</th>
                        <th className={styles.tagTableDelCell}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map(tag => (
                        <tr key={tag.id}>
                            <td className={styles.tagTableCell}>{tag.value}</td>
                            <td className={styles.tagTableDeleteCell}>
                                <DeleteButton
                                    onClick={() => {
                                        setTagToDelete(tag);
                                    }}
                                    text={t("delete")}
                                    icon={true}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {tagToDelete && (
                <Modal
                    title={t("deleteTag")}
                    message={`${t("areYouSureYouWantToDeleteTag")} ${tagToDelete.value}?`}
                    okClick={handleDelete}
                    cancelClick={() => setTagToDelete(null)}
                    onBackdropClick={() => setTagToDelete(null)} //
                />
            )}

            {hasMore && (
                <div ref={loaderRef}>
                    <Loader />
                </div>
            )}
        </div>
    );
}
