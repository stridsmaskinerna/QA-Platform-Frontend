import { useTranslation } from "react-i18next";
import styles from "./AddATag.module.css";
import { InputWithDynamicSuggestions } from "../..";
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
                    onClick={() => onAddClick(inputValue)}
                    className={styles.addBtn}
                    type="button"
                >
                    {t("add")}
                </button>
            </div>
        </div>
    );
}
