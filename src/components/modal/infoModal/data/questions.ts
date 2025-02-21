import { IQuestionWithInformationTitle } from "../types";
import { getOneDayOldTimestamp } from "../utility";

const questionCardUnresolved: IQuestionWithInformationTitle = {
    informationTitle: "An unresolved question",
    id: "id",
    topicName: "A Topic Name",
    topicId: "topicId",
    subjectId: "subjectId",
    subjectName: "A Subject Name",
    subjectCode: "A Subject Code",
    userName: "teacherTest@ltu.se",
    title: "How do you prevent retain cycles in Swift closures?",
    created: getOneDayOldTimestamp(),
    isResolved: false,
    isProtected: false,
    isHidden: false,
    isHideable: false,
    answerCount: 10,
    tags: [],
    userId: "userId",
};

const questionCardResolved: IQuestionWithInformationTitle = {
    ...questionCardUnresolved,
    informationTitle: "A Resolved Question",
    isResolved: true,
};

const questionCardProtected: IQuestionWithInformationTitle = {
    ...questionCardResolved,
    informationTitle: "A Protected Question",
    isProtected: true,
};

export const questionCards = [
    questionCardUnresolved,
    questionCardResolved,
    questionCardProtected,
];
