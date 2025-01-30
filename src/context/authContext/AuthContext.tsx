import {
    createContext,
    ReactElement,
    ReactNode,
    useEffect,
    useState
} from "react";
import {
    getValuesFromToken,
    IAuthContext,
    ILoginCredentials,
    IRegisterFormData,
    ITokens,
    IUserDetails,
    loginReq,
    registerReq
} from "../../utils";
import { useLocalStorage } from "usehooks-ts";
import { LOCAL_STORAGE_TOKEN_KEY } from "../../data";

interface IAuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

function AuthProvider({ children }: IAuthProviderProps): ReactElement {
    const [tokens, setTokens, clearTokens] = useLocalStorage<ITokens | null>(
        LOCAL_STORAGE_TOKEN_KEY,
        null
    );
    const [userDetails, setUserDetails] = useState<IUserDetails>();
    const [isLoading, setIsLoading] = useState(true);

    const values: IAuthContext = {
        isLoading,
        username: userDetails?.username,
        userId: userDetails?.userId,
        roles: userDetails?.roles,
        login,
        logout,
        register
    };

    //Handle failed requests in the form instead (no try catch here)
    async function login({ email, password }: ILoginCredentials) {
        const tokens = await loginReq({ email, password });
        setTokens(tokens);
    }

    //Handle failed requests in the form instead (no try catch here)
    async function register({
        email,
        password,
        username
    }: Omit<IRegisterFormData, "confirmPassword">): Promise<void> {
        await registerReq({ email, password, username });
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
        void decodeToken();
    }, [clearTokens, tokens?.accessToken]);

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
}
export { AuthContext, AuthProvider };
