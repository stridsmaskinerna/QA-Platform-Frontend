import {
    createContext,
    ReactElement,
    ReactNode,
    useEffect,
    useState,
} from "react";
import {
    CustomError,
    getValuesFromToken,
    ILoginCredentials,
    IRegisterFormData,
    ITokens,
    IUserDetails,
    LoginErrorMessage,
    RegisterErrorMessage,
    Role,
} from "../../utils";
import { useLocalStorage } from "usehooks-ts";
import {
    EMAIL_TAKEN,
    LOCAL_STORAGE_TOKEN_KEY,
    loginReq,
    registerReq,
    USERNAME_TAKEN,
} from "../../data";

interface IAuthProviderProps {
    children: ReactNode;
}

export interface IAuthContext {
    userId: string | undefined;
    username: string | undefined;
    roles: Role[] | undefined;
    login: (
        credentials: ILoginCredentials,
    ) => Promise<LoginErrorMessage | void>;
    logout: () => void;
    register: (
        formData: Omit<IRegisterFormData, "confirmPassword">,
    ) => Promise<RegisterErrorMessage | void>;
    isLoading: boolean;
    isLoggedIn: boolean;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

function AuthProvider({ children }: IAuthProviderProps): ReactElement {
    const [tokens, setTokens, clearTokens] = useLocalStorage<ITokens | null>(
        LOCAL_STORAGE_TOKEN_KEY,
        null,
    );
    const [userDetails, setUserDetails] = useState<IUserDetails>();
    const isLoggedIn = userDetails?.userId != null;
    const [isLoading, setIsLoading] = useState(true);

    const values: IAuthContext = {
        username: userDetails?.username,
        userId: userDetails?.userId,
        roles: userDetails?.roles,
        login,
        logout,
        register,
        isLoading,
        isLoggedIn,
    };

    async function login({
        email,
        password,
    }: ILoginCredentials): Promise<LoginErrorMessage | void> {
        try {
            const tokens = await loginReq({ email, password });
            setTokens(tokens);
        } catch (error) {
            if (error instanceof CustomError) {
                if (error.errorCode === 401) return "wrongCredentials";
                if (error.errorCode === 403) return "userBlocked";
            }
            console.error(error);
            return "serverProblem";
        }
    }

    async function register({
        email,
        password,
        username,
    }: Omit<
        IRegisterFormData,
        "confirmPassword"
    >): Promise<RegisterErrorMessage | void> {
        try {
            await registerReq({ email, password, username });
        } catch (error) {
            if (error instanceof CustomError && error.errorCode === 409) {
                if (error?.detail === USERNAME_TAKEN) {
                    return "usernameTaken";
                }
                if (error?.detail === EMAIL_TAKEN) {
                    return "emailTaken";
                }
                console.error(error);
                return "serverProblem";
            }
        }
    }

    function logout() {
        clearTokens();
    }

    useEffect(() => {
        const decodeToken = () => {
            setIsLoading(true);
            const data = getValuesFromToken(tokens?.accessToken);
            setUserDetails(data);
            setIsLoading(false);
        };
        // Recompute user details whenever tokens change
        decodeToken();
    }, [setIsLoading, tokens?.accessToken]);

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
}
export { AuthContext, AuthProvider };
