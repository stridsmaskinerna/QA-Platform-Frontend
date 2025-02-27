import { vi } from "vitest";
import { IAnswer, IPaginationMeta, IQuestion } from "../utils";

export const mockAPI = vi.fn();

const paginationMeta: IPaginationMeta = {
    TotalItemCount: 10,
    PageNr: 1,
    TotalPageCount: 1,
    Limit: 20,
};

export const paginationMetaJSON = JSON.stringify(paginationMeta);

export const exampleQuestionCardProps: IQuestion = {
    id: "1",
    topicName: "topicName",
    topicId: "topicId",
    subjectId: "subjectId",
    subjectName: "subjectName",
    subjectCode: "007",
    userName: "username",
    title: "title",
    created: new Date("2025-02-22T14:30:00+01:00").toISOString(),
    isResolved: true,
    isProtected: false,
    isHidden: false,
    isHideable: true,
    answerCount: 5,
    tags: ["TAG1, TAG2, TAG3, TAG4"],
    userId: "userId",
};

const exampleRichTextString = JSON.stringify({
    root: {
        children: [
            {
                children: [
                    {
                        detail: 0,
                        format: 0,
                        mode: "normal",
                        style: "",
                        text: "Laborum ratione consectetur esse est et voluptas distinctio rerum qui architecto nihil in fuga et optio enim illum laudantium alias soluta optio odio incidunt non fuga libero est quaerat velit nemo consectetur sint ipsum et est nulla est amet tenetur distinctio accusamus est quis nihil nobis debitis sed deserunt aut repellendus autem modi nesciunt dolor rerum aspernatur ad dolore qui nihil tenetur in non unde animi fuga totam fugiat eos qui qui sunt cumque.",
                        type: "text",
                        version: 1,
                    },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "paragraph",
                version: 1,
                textFormat: 0,
                textStyle: "",
            },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "root",
        version: 1,
    },
});

export const exampleAnswerCardProps: IAnswer = {
    id: "id",
    userName: "username",
    value: exampleRichTextString,
    rating: 0,
    filePath: "",
    created: new Date("2025-02-22T14:30:00+01:00").toISOString(),
    isHidden: false,
    voteCount: 7,
    isAccepted: true,
    comments: [
        {
            id: "commentID",
            value: "commentValue",
            userName: "commenterUsername",
        },
    ],
    myVote: "neutral",
    answeredByTeacher: true,
};
