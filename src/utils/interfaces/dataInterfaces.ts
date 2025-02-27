// TODO! Move to DTO
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
    isHideable: boolean;
    answerCount: number;
    tags: string[];
    userId: string;
    description?: string;
}

// TODO! Move to DTO
export interface IDetailedQuestion extends IQuestion {
    filePath: string;
    answers: IAnswer[];
}

// TODO! Move to DTO
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

// TODO! Move to DTO
export interface ICommentForCreation {
    answerId: string;
    value: string;
}

// TODO! Move to DTO
export interface IAnswerForCreation {
    questionId: string;
    value: string;
    filePath?: string | undefined;
}

// TODO! Move to DTO
export interface IAnswerForPut {
    value: string;
    filePath?: string | undefined;
}

export interface IComment {
    id: string;
    userName: string;
    value: string;
}

// TODO! Move to DTO or dto/header ???
export interface IPaginationMeta {
    PageNr: number;
    Limit: number;
    TotalItemCount: number;
    TotalPageCount: number;
}

// TODO! Move to DTO
export interface IUser {
    id: string;
    userName: string;
    email: string;
    isBlocked: boolean;
}

// TODO! Move to DTO
export interface IQuestionForEdit {
    topicId: string;
    subjectId: string;
    tags: string[];
    description?: string;
    title: string;
    isProtected: boolean;
}
