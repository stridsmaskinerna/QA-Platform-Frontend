import { CSSProperties, ReactElement } from "react";
import { Roles } from ".";

export interface IAuthContext {
    roles: Roles[] | undefined;
    login: (credentials: ILoginCredentials) => Promise<void>;
    logout: () => void;
    tokens: ITokens | null;
}

export interface ITokens {
    accessToken: string;
    refreshToken: string;
}

export interface ILoginCredentials {
    email: string;
    password: string;
}

export interface IRoleBasedRedirect {
    allowedRoles: Roles[];
    fallbackRoute: string;
}

export interface ITab {
    title: string;
    content: ReactElement;
    index: number;
    contentContainerStyle?: CSSProperties;
    btnStyle?: CSSProperties;
    btnsContainerStyle?: CSSProperties;
}
