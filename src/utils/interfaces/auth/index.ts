// AUTH
import { Role } from "../../enums";

export type RegisterErrorMessage =
    | "usernameTaken"
    | "serverProblem"
    | "passwordsNoMatch"
    | "mustEndWithLtuErrMsg"
    | "emailTaken";

export type LoginErrorMessage =
    | "wrongCredentials"
    | "serverProblem"
    | "mustEndWithLtuErrMsg";

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

export interface IAuthErrorResponse {
    detail: string;
}
