export interface IQuestion {
    id: string;
    topicName: string;
    topicId: string;
    subjectId: string;
    subjectName: string;
    subjectCode: string;
    userName: string;
    title: string;
    created: string;
    isResolved: boolean;
    isProtected: boolean;
    isHidden: boolean;
    answerCount: number;
    tags: string[];
    userId: string;
}

export interface IDetailedQuestion extends IQuestion {
    description: string;
    filePath: string;
    answers: IAnswer[];
}

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

export interface IComment {
    id: string;
    userName: string;
    value: string;
}
