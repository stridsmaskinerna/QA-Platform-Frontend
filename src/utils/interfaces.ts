export interface IAuthContext {
    isLoggedIn: boolean;
    login: (credentials: ILoginCredentials) => Promise<void>;
    logout: () => void;
    tokens: ITokens | null;
}

export interface ITokens {
    accessToken: string;
    refreshToken: string;
    role: "User" | "Admin" | "Teacher";
}

export interface ILoginCredentials {
    email: string;
    password: string;
}
