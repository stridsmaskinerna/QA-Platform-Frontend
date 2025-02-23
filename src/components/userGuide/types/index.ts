import { IQuestion } from "../../../utils";

interface MetaInformation {
    informationTitle: string;
    informationDescription: string;
    defaultMarker: string;
}

export type IQuestionWithInformationMeta = IQuestion & MetaInformation;
