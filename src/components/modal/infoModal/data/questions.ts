import { highlights } from "../../../questionCard";
import { IQuestionWithInformationTitle } from "../types";
import { getOneDayOldTimestamp } from "../utility";

const questionCardUnresolved: IQuestionWithInformationTitle = {
    informationTitle: "An unresolved question",
    defaultMarker: highlights.resolvedQuestion,
    id: "id",
    topicName: "A Topic Name",
    topicId: "topicId",
    subjectId: "subjectId",
    subjectName: "A Subject Name",
    subjectCode: "A Subject Code",
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
};

const questionCardResolved: IQuestionWithInformationTitle = {
    ...questionCardUnresolved,
    informationTitle: "A Resolved Question",
    defaultMarker: highlights.resolvedQuestion,
    isResolved: true,
};

const questionCardProtected: IQuestionWithInformationTitle = {
    ...questionCardResolved,
    informationTitle: "A Protected Question",
    defaultMarker: highlights.publicQuestion,
    isProtected: true,
};

const questionCardTopic: IQuestionWithInformationTitle = {
    ...questionCardResolved,
    informationTitle: "The topic the question belong to",
    defaultMarker: highlights.topicName,
    isProtected: true,
};

const questionCardDate: IQuestionWithInformationTitle = {
    ...questionCardResolved,
    informationTitle: "The creation date",
    defaultMarker: highlights.creationDate,
    isProtected: true,
};

const questionCardTitle: IQuestionWithInformationTitle = {
    ...questionCardResolved,
    informationTitle: "The Title",
    defaultMarker: highlights.titleQuestion,
    isProtected: true,
};

const questionCardAuthor: IQuestionWithInformationTitle = {
    ...questionCardResolved,
    informationTitle: "The user that asked the question",
    defaultMarker: highlights.userName,
    isProtected: true,
};

const questionCardAnswers: IQuestionWithInformationTitle = {
    ...questionCardResolved,
    informationTitle: "The number of answers",
    defaultMarker: highlights.answerCount,
    isProtected: true,
};

const questionCardTags: IQuestionWithInformationTitle = {
    ...questionCardResolved,
    informationTitle: "Tags",
    defaultMarker: highlights.tags,
    isProtected: true,
};

export const questionCards = [
    questionCardUnresolved,
    questionCardResolved,
    questionCardProtected,
    questionCardTopic,
    questionCardDate,
    questionCardTitle,
    questionCardAuthor,
    questionCardAnswers,
    questionCardTags,
];
