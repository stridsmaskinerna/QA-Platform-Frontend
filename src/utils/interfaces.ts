import { CSSProperties, Dispatch, ReactElement, SetStateAction } from "react";
import { LoginErrorMessage, RegisterErrorMessage, Role } from ".";

export interface IAuthContext {
    userId: string | undefined;
    username: string | undefined;
    roles: Role[] | undefined;
    login: (
        credentials: ILoginCredentials
    ) => Promise<LoginErrorMessage | void>;
    logout: () => void;
    register: (
        formData: Omit<IRegisterFormData, "confirmPassword">
    ) => Promise<RegisterErrorMessage | void>;
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

export interface ILoaderContext {
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}
