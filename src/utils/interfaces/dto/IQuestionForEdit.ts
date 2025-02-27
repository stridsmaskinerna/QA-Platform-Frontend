export interface IQuestionForEdit {
    topicId: string;
    subjectId: string;
    tags: string[];
    description?: string;
    title: string;
    isProtected: boolean;
}
