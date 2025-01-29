import { CSSProperties, ReactElement } from "react";
import { Roles } from ".";

export interface IAuthContext {
    userId: string | undefined;
    username: string | undefined;
    roles: Roles[] | undefined;
    login: (credentials: ILoginCredentials) => Promise<void>;
    logout: () => void;
    register: (formData: IRegisterFormData) => Promise<void>;
}

export interface IUserDetails {
    username: string;
    userId: string;
    roles: Roles[];
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
