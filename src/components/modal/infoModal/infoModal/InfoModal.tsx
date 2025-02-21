import { useState } from "react";

import { Modal } from "../..";
import { InfoModalBody } from "../infoModalBody";
import { IQuestionWithInformationTitle } from "../types";

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

function getOneDayOldTimestamp(): string {
    const now = new Date();
    now.setDate(now.getDate() - 1);

    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, "0");
    const day = String(now.getUTCDate()).padStart(2, "0");
    const hours = String(now.getUTCHours()).padStart(2, "0");
    const minutes = String(now.getUTCMinutes()).padStart(2, "0");
    const seconds = String(now.getUTCSeconds()).padStart(2, "0");
    const milliseconds = String(now.getUTCMilliseconds()).padStart(6, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}+00`;
}

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

const questionCards = [
    questionCardUnresolved,
    questionCardResolved,
    questionCardProtected,
];

export function InfoModal() {
    const [isOpen, setIsOpen] = useState(true);

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            {isOpen && (
                <Modal
                    title={"Fast Facts You Shouldn't Miss"}
                    message={<InfoModalBody questionCards={questionCards} />}
                    okClick={() => {
                        closeModal();
                    }}
                    onBackdropClick={() => {
                        closeModal();
                    }}
                />
            )}
        </>
    );
}
