import { IAnswer } from "./IAnswer";
import { IQuestion } from "./IQuestion";

export interface IDetailedQuestion extends IQuestion {
    filePath: string;
    answers: IAnswer[];
}
