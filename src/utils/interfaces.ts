import { CSSProperties, ReactElement } from "react";
import { Role } from ".";

export interface IAuthContext {
    userId: string | undefined;
    username: string | undefined;
    roles: Role[] | undefined;
    login: (credentials: ILoginCredentials) => Promise<void>;
    logout: () => void;
    register: (
        formData: Omit<IRegisterFormData, "confirmPassword">
    ) => Promise<void>;
    isLoading: boolean;
}

export interface IUserDetails {
    username: string;
    userId: string;
    roles: Role[];
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
    allowedRoles: Role[];
    fallbackRoute: string;
}

export interface ITab {
    title: string;
    content: ReactElement;
    contentContainerStyle?: CSSProperties;
    btnStyle?: CSSProperties;
    btnsContainerStyle?: CSSProperties;
}

export interface IAuthErrorResponse {
    detail: string;
}
