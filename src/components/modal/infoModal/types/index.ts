import { IQuestion } from "../../../../utils";

interface MetaInformation {
    informationTitle: string;
    defaultMarker: string
}

export type IQuestionWithInformationTitle = IQuestion & MetaInformation;
