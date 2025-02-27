// DTO

export interface IProblemDetail {
    status: number;
    title: string;
    detail: string | undefined;
}

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

export interface IDetailedQuestion extends IQuestion {
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

export interface ICommentForCreation {
    answerId: string;
    value: string;
}

export interface IAnswerForCreation {
    questionId: string;
    value: string;
    filePath?: string | undefined;
}

export interface IAnswerForPut {
    value: string;
    filePath?: string | undefined;
}

export interface IComment {
    id: string;
    userName: string;
    value: string;
}

export interface IPaginationMeta {
    PageNr: number;
    Limit: number;
    TotalItemCount: number;
    TotalPageCount: number;
}

export interface IUser {
    id: string;
    userName: string;
    email: string;
    isBlocked: boolean;
}

export interface IQuestionForEdit {
    topicId: string;
    subjectId: string;
    tags: string[];
    description?: string;
    title: string;
    isProtected: boolean;
}

export interface ISubject {
    id: string;
    name: string;
    subjectCode?: string;
    teachers?: ITeacher[];
    topics: ITopic[];
}

export interface ITeacher {
    id: string;
    email: string;
    userName: string;
}

export interface ITopic {
    id: string;
    name: string;
    isActive: boolean;
    subjectId: string;
}

export interface ITopicForCreation {
    name: string;
    subjectId: string;
}

export interface ISubjectForPut {
    id: string;
    name: string;
    subjectCode?: string;
    teachers: string[];
}

export interface ITag {
    id: string;
    value: string;
}
