import { ITeacher } from "./ITeacher";
import { ITopic } from "./ITopic";

export interface ISubject {
    id: string;
    name: string;
    subjectCode?: string;
    teachers?: ITeacher[];
    topics: ITopic[];
}
