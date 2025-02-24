import { CSSProperties } from "react";
import { useQuestionForm } from "../../../hooks";
import { useTranslation } from "react-i18next";
import { AddATag, PublicQuestionToggle } from ".";
import {
    Input,
    InputWithPrefetchedSuggestions,
    RichTextEditor,
    Select,
} from "../..";
import styles from "./QuestionFormSharedStyles.module.css";

const labelStyle: CSSProperties = {
    fontWeight: "600",
    fontSize: "14px",
};

const detailsContainerStyle: CSSProperties = {
    border: "2px solid var(--input-idle)",
};

interface IEditAQuestionProps {
    questionId: string;
}

export function EditAQuestion({ questionId }: IEditAQuestionProps) {
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
        questionForEdit,
    } = useQuestionForm({ action: "edit", questionId });
    const { t } = useTranslation();

    if (!questionForEdit) {
        return <></>;
    }

    return (
        <div className={styles.container}>
            <form
                onSubmit={handleSubmit}
                className={styles.form}
                ref={formRef}
            >
                <Input
                    defaultValue={questionForEdit.title}
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
                        initialState={questionForEdit.description}
                        placeholder={t("questionDescriptionExpl")}
                        setEditorState={setDescription}
                        containerStyle={detailsContainerStyle}
                    />
                </div>

                <InputWithPrefetchedSuggestions
                    defaultValue={
                        possibleCourseSuggestions.find(
                            s => s.id === questionForEdit.subjectId,
                        )?.name
                    }
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
                    defaultOption={questionForEdit.topicId}
                    options={topics}
                    selectName="topicId"
                    labelStyle={labelStyle}
                />
                <div className={styles.inputPair}>
                    <PublicQuestionToggle
                        defaultChecked={!questionForEdit.isProtected}
                    />
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
                    {t("saveChanges")}
                </button>
            </form>
        </div>
    );
}
