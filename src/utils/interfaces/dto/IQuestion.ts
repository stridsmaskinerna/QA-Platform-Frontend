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
