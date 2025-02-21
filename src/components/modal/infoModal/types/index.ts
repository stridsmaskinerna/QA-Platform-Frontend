import { IQuestion } from "../../../../utils";

interface InformationTitle {
    informationTitle: string;
}

export type IQuestionWithInformationTitle = IQuestion & InformationTitle;
