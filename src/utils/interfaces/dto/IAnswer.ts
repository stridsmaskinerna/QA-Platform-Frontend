import { IComment } from "./IComment";

export interface IAnswer {
    id: string;
    userName: string;
    value: string;
    rating: number;
    filePath: string;
    created: string;
    isHidden: boolean;
    voteCount: number;
    isAccepted: boolean;
    comments: IComment[];
    myVote: string;
    answeredByTeacher: boolean;
}
