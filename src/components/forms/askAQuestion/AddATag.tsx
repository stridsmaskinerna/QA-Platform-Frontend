import { useTranslation } from "react-i18next";
import styles from "./AddATag.module.css";
import { InputWithDynamicSuggestions, Modal } from "../..";
import {
    ChangeEventHandler,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { useFetchWithToken } from "../../../hooks";
import { BASE_URL } from "../../../data";
import { ISuggestion, ITag } from "../../../utils";
import { useDebounceCallback } from "usehooks-ts";
import removeX from "../../../assets/icons/removeX.svg";

const url = `${BASE_URL}/tags`;

interface IAddATagProps {
    onAddClick: (tag: string) => void;
    addedTags: string[];
    onRemoveClick: (tag: string) => void;
}

export function AddATag({
    onAddClick,
    addedTags,
    onRemoveClick,
}: IAddATagProps) {
    const { t } = useTranslation();
    const { requestHandler: fetchTags } = useFetchWithToken<ITag[]>();
    const [inputValue, setInputValue] = useState("");
    const [displayedSuggestions, setDisplayedSuggestions] = useState<
        ISuggestion[]
    >([]);
    const [showWarning, setShowWarning] = useState(false);
    const hideSuggestionsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const onInputChange: ChangeEventHandler<HTMLInputElement> = e => {
        e.preventDefault();
        const value = e.target.value;
        setInputValue(value);
        if (value.trim()) {
            void debouncedFetchSuggestions(value);
        } else {
            hideSuggestionsTimeoutRef.current = setTimeout(() => {
                setDisplayedSuggestions([]);
            }, 500);
        }
    };

    const fetchTagSuggestions = useCallback(async (query: string) => {
        const data = await fetchTags(`${url}?subTagValue=${query}`);
        if (data) {
            setDisplayedSuggestions(
                data.slice(0, 10).map(t => ({ id: t.id, name: t.value })),
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const debouncedFetchSuggestions = useDebounceCallback(
        fetchTagSuggestions,
        300,
    );

    const handleAddClick = () => {
        if (addedTags.includes(inputValue.trim().toUpperCase())) {
            return;
        }

        if (addedTags.length === 5) {
            setShowWarning(true);
            return;
        }
        onAddClick(inputValue.trim().toUpperCase());
        setInputValue("");
        setDisplayedSuggestions([]);
    };

    const onSuggestionClick = ({ name }: ISuggestion) => {
        setInputValue(name);
    };

    const onFocus = () => {
        if (inputValue.trim()) {
            void fetchTagSuggestions(inputValue);
        }
    };

    useEffect(() => {
        return () => {
            clearTimeout(hideSuggestionsTimeoutRef.current ?? undefined);
        };
    }, []);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.infoContainer}>
                    <h5>{t("tags")}</h5>
                    <p>{t("addATagExpl")}</p>
                </div>
                <div className={styles.inputContainer}>
                    <InputWithDynamicSuggestions
                        inputValue={inputValue}
                        onChange={onInputChange}
                        placeHolder={t("addATag")}
                        onSuggestionClick={onSuggestionClick}
                        displayedSuggestions={displayedSuggestions}
                        inputType="search"
                        onFocus={onFocus}
                    />

                    <button
                        onClick={handleAddClick}
                        className={styles.addBtn}
                        type="button"
                    >
                        {t("add")}
                    </button>
                </div>
                <div className={styles.addedTagsContainer}>
                    {addedTags.map(t => (
                        <button
                            className={styles.addedTag}
                            onClick={() => onRemoveClick(t)}
                            key={t}
                        >
                            <p>{t}</p>
                            <img src={removeX} />
                        </button>
                    ))}
                </div>
            </div>
            {showWarning && (
                <Modal
                    okClick={() => setShowWarning(false)}
                    message={t("tagLimitWarning")}
                />
            )}
        </>
    );
}
