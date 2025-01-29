import { CSSProperties, ReactElement } from "react";
import { Roles } from ".";

export interface IAuthContext {
    roles: Roles[] | undefined;
    login: (credentials: ILoginCredentials) => Promise<void>;
    logout: () => void;
    tokens: ITokens | null;
    register: (formData: IRegisterFormData) => Promise<void>;
}

export interface ITokens {
    accessToken: string;
    refreshToken: string;
}

export interface ILoginCredentials {
    email: string;
    password: string;
}

export interface IRegisterFormData {
    email: string;
    password: string;
    confirmPassword: string;
    username: string;
}

export interface IRoleBasedRedirect {
    allowedRoles: Roles[];
    fallbackRoute: string;
}

export interface ITab {
    title: string;
    content: ReactElement;
    contentContainerStyle?: CSSProperties;
    btnStyle?: CSSProperties;
    btnsContainerStyle?: CSSProperties;
}
