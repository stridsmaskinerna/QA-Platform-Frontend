import { CSSProperties, ReactElement } from "react";

export interface ITab {
    title: string;
    content: ReactElement;
    contentContainerStyle?: CSSProperties;
    btnStyle?: CSSProperties;
    tabBtnClickSideEffect?: () => void;
}
