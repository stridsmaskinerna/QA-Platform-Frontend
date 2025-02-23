import { useTranslation } from "react-i18next";

import { highlights } from "../../../questionCard";
import { IQuestionWithInformationMeta } from "../types";
import { getOneDayOldTimestamp } from "../utility";

export function useQuestionCards() {
    const { t } = useTranslation();

    const createTitle = (subTitle: string) => {
        return `Question Card - ${subTitle}`;
    };

    const subject: IQuestionWithInformationMeta = {
        informationTitle: createTitle(t("userGuide.subtitleSubject")),
        informationDescription: t("userGuide.descriptionSubject"),
        defaultMarker: highlights.subjectTitle,
        isResolved: true,
        id: "id",
        topicName: "A Topic Name",
        topicId: "topicId",
        subjectId: "subjectId",
        subjectName: "A Course Name",
        subjectCode: "A Course Code",
        userName: "Luca",
        title: "How do you prevent retain cycles in Swift closures?",
        created: getOneDayOldTimestamp(),
        isProtected: false,
        isHidden: false,
        isHideable: false,
        answerCount: 10,
        tags: ["A Tag"],
        userId: "userId",
    } as const;

    const unresolved: IQuestionWithInformationMeta = {
        ...subject,
        informationTitle: createTitle(
            t("userGuide.subtitleUnresolvedQuestion"),
        ),
        informationDescription: t("userGuide.descriptionUnresolvedQuestion"),
        defaultMarker: highlights.resolvedQuestion,
        isResolved: false,
    } as const;

    const resolved: IQuestionWithInformationMeta = {
        ...subject,
        informationTitle: createTitle(t("userGuide.subtitleResolvedQuestion")),
        informationDescription: t("userGuide.descriptionResolvedQuestion"),
        defaultMarker: highlights.resolvedQuestion,
        isResolved: true,
    } as const;

    const publicStatus: IQuestionWithInformationMeta = {
        ...subject,
        informationTitle: createTitle(t("userGuide.subtitlePublicQuestion")),
        informationDescription: t("userGuide.descriptionPublicQuestion"),
        defaultMarker: highlights.publicQuestion,
        isProtected: false,
    } as const;

    const protectedSatus: IQuestionWithInformationMeta = {
        ...subject,
        informationTitle: createTitle(t("userGuide.subtitleProtectedQuestion")),
        informationDescription: t("userGuide.descriptionProtectedQuestion"),
        defaultMarker: highlights.publicQuestion,
        isProtected: true,
    } as const;

    const topic: IQuestionWithInformationMeta = {
        ...subject,
        informationTitle: createTitle(t("userGuide.subtitleTopic")),
        informationDescription: t("userGuide.descriptionTopic"),
        defaultMarker: highlights.topicName,
    } as const;

    const creationDate: IQuestionWithInformationMeta = {
        ...subject,
        informationTitle: createTitle(t("userGuide.subtitleCreationDate")),
        informationDescription: t("userGuide.descriptionCreationDate"),
        defaultMarker: highlights.creationDate,
    } as const;

    const title: IQuestionWithInformationMeta = {
        ...subject,
        informationTitle: createTitle(t("userGuide.subtitleQuestionTitle")),
        informationDescription: t("userGuide.descriptionQuestionTitle"),
        defaultMarker: highlights.titleQuestion,
    } as const;

    const author: IQuestionWithInformationMeta = {
        ...subject,
        informationTitle: createTitle(t("userGuide.subtitleAuthor")),
        informationDescription: t("userGuide.descriptionAuthor"),
        defaultMarker: highlights.userName,
    } as const;

    const answers: IQuestionWithInformationMeta = {
        ...subject,
        informationTitle: createTitle(t("userGuide.subtitleAnswercount")),
        informationDescription: t("userGuide.descriptionAnswercount"),
        defaultMarker: highlights.answerCount,
    } as const;

    const tags: IQuestionWithInformationMeta = {
        ...subject,
        informationTitle: createTitle(t("userGuide.subtitleTags")),
        informationDescription: t("userGuide.descriptionTags"),
        defaultMarker: highlights.tags,
    } as const;

    return {
        all: [
            subject,
            unresolved,
            resolved,
            publicStatus,
            protectedSatus,
            topic,
            creationDate,
            title,
            author,
            answers,
            tags,
        ],
        subject,
        unresolved,
        resolved,
        public: publicStatus,
        protected: protectedSatus,
        topic,
        creationDate,
        title,
        author,
        answers,
        tags,
    };
}

export type UseQusetionCardsReturnType = ReturnType<typeof useQuestionCards>;
