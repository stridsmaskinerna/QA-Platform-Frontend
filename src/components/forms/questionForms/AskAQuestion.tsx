import { CSSProperties } from "react";
import styles from "./QuestionFormSharedStyles.module.css";
import {
    Input,
    InputWithPrefetchedSuggestions,
    RichTextEditor,
    Select,
} from "../..";
import { useTranslation } from "react-i18next";
import { useQuestionForm } from "../../../hooks";
import { PublicQuestionToggle, AddATag } from ".";

const labelStyle: CSSProperties = {
    fontWeight: "600",
    fontSize: "14px",
};

const detailsContainerStyle: CSSProperties = {
    border: "2px solid var(--input-idle)",
};

export function AskAQuestion() {
    const {
        addedTags,
        onAddTag,
        onRemoveTag,
        debouncedHandleCourseOnChange,
        handleCourseSuggestionClick,
        possibleCourseSuggestions,
        topics,
        setDescription,
        handleSubmit,
        formRef,
    } = useQuestionForm({ action: "ask" });
    const { t } = useTranslation();
    return (
        <div className={styles.container}>
            <form
                onSubmit={handleSubmit}
                className={styles.form}
                ref={formRef}
            >
                <Input
                    labelStyle={labelStyle}
                    inputName="title"
                    minInputValueLength={5}
                    inputType="text"
                    label={t("questionTitle")}
                    placeHolder={t("questionTitlePlaceholder")}
                />
                <div className={styles.richTextWrapper}>
                    <h5>{t("questionDetails")}</h5>
                    <RichTextEditor
                        placeholder={t("questionDescriptionExpl")}
                        setEditorState={setDescription}
                        containerStyle={detailsContainerStyle}
                    />
                </div>

                <InputWithPrefetchedSuggestions
                    onChange={debouncedHandleCourseOnChange}
                    onSuggestionClick={handleCourseSuggestionClick}
                    labelStyle={labelStyle}
                    inputType="search"
                    label={t("course")}
                    placeHolder={t("askQuestionCoursePlaceholder")}
                    possibleSuggestions={possibleCourseSuggestions}
                />

                <Select
                    label={t("topic")}
                    placeholderValue={
                        topics.length
                            ? t("topicSelectActive")
                            : t("topicSelectDefault")
                    }
                    options={topics}
                    selectName="topicId"
                    labelStyle={labelStyle}
                />
                <div className={styles.inputPair}>
                    <PublicQuestionToggle />
                    <AddATag
                        addedTags={addedTags}
                        onRemoveClick={onRemoveTag}
                        onAddClick={onAddTag}
                    />
                </div>
                <button
                    className={styles.submitBtn}
                    type="submit"
                >
                    {t("submitQuestion")}
                </button>
            </form>
        </div>
    );
}
