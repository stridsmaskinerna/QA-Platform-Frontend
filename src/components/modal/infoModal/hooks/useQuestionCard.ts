import { highlights } from "../../../questionCard";
import { IQuestionWithInformationMeta } from "../types";
import { getOneDayOldTimestamp } from "../utility";

export function useQuestionCards() {
    const questionCardUnresolved: IQuestionWithInformationMeta = {
        informationTitle: "Unresolved Question",
        informationDescription:
            "If the author of the question have NOT accepted an anwser.",
        defaultMarker: highlights.resolvedQuestion,
        id: "id",
        topicName: "A Topic Name",
        topicId: "topicId",
        subjectId: "subjectId",
        subjectName: "A Course Name",
        subjectCode: "A Course Code",
        userName: "Luca",
        title: "How do you prevent retain cycles in Swift closures?",
        created: getOneDayOldTimestamp(),
        isResolved: false,
        isProtected: false,
        isHidden: false,
        isHideable: false,
        answerCount: 10,
        tags: ["A Tag"],
        userId: "userId",
    } as const;

    const questionCardSubject: IQuestionWithInformationMeta = {
        ...questionCardUnresolved,
        informationTitle: "Course",
        informationDescription:
            "The course name and code associated with this question.",
        defaultMarker: highlights.subjectTitle,
        isResolved: true,
    } as const;

    const questionCardResolved: IQuestionWithInformationMeta = {
        ...questionCardUnresolved,
        informationTitle: "Resolved Question",
        informationDescription:
            "If the author of the question have accepted an anwser.",
        defaultMarker: highlights.resolvedQuestion,
        isResolved: true,
    } as const;

    const questionCardPublic: IQuestionWithInformationMeta = {
        ...questionCardResolved,
        informationTitle: "A Public Question",
        informationDescription: "The question can be viewed by everyone.",
        defaultMarker: highlights.publicQuestion,
        isProtected: false,
    } as const;

    const questionCardProtected: IQuestionWithInformationMeta = {
        ...questionCardResolved,
        informationTitle: "A Protected Question",
        informationDescription:
            "The question can only be viewed by authenticated users.",
        defaultMarker: highlights.publicQuestion,
        isProtected: true,
    } as const;

    const questionCardTopic: IQuestionWithInformationMeta = {
        ...questionCardResolved,
        informationTitle: "Topic",
        informationDescription: "The topic this question belongs to.",
        defaultMarker: highlights.topicName,
        isProtected: true,
    } as const;

    const questionCardDate: IQuestionWithInformationMeta = {
        ...questionCardResolved,
        informationTitle: "Date",
        informationDescription: "How long time ago the question was asked.",
        defaultMarker: highlights.creationDate,
        isProtected: true,
    } as const;

    const questionCardTitle: IQuestionWithInformationMeta = {
        ...questionCardResolved,
        informationTitle: "Title",
        informationDescription: "The title of the question.",
        defaultMarker: highlights.titleQuestion,
        isProtected: true,
    } as const;

    const questionCardAuthor: IQuestionWithInformationMeta = {
        ...questionCardResolved,
        informationTitle: "Author",
        informationDescription: "The person who created this question.",
        defaultMarker: highlights.userName,
        isProtected: true,
    } as const;

    const questionCardAnswers: IQuestionWithInformationMeta = {
        ...questionCardResolved,
        informationTitle: "Answercount",
        informationDescription: "The number of answers.",
        defaultMarker: highlights.answerCount,
        isProtected: true,
    } as const;

    const questionCardTags: IQuestionWithInformationMeta = {
        ...questionCardResolved,
        informationTitle: "Tags",
        informationDescription: "Tags used to mark the question.",
        defaultMarker: highlights.tags,
        isProtected: true,
    } as const;

    return {
        all: [
            questionCardSubject,
            questionCardUnresolved,
            questionCardResolved,
            questionCardPublic,
            questionCardProtected,
            questionCardTopic,
            questionCardDate,
            questionCardTitle,
            questionCardAuthor,
            questionCardAnswers,
            questionCardTags,
        ],
        questionCardSubject,
        questionCardUnresolved,
        questionCardResolved,
        questionCardPublic,
        questionCardProtected,
        questionCardTopic,
        questionCardDate,
        questionCardTitle,
        questionCardAuthor,
        questionCardAnswers,
        questionCardTags,
    };
}
