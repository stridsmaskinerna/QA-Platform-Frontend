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

    //Handle failed requests in the form instead
    async function login({ email, password }: ILoginCredentials) {
        const tokens = await loginReq({ email, password });
        setTokens(tokens);
    }

    //Handle failed requests in the form instead
    async function register({
        email,
        password,
        username
    }: Omit<IRegisterFormData, "confirmPassword">) {
        const tokens = await registerReq({ email, password, username });
        setTokens(tokens);
    }

    function logout() {
        clearTokens();
    }

    useEffect(() => {
        const decodeToken = () => {
            if (tokens?.accessToken) {
                setIsLoading(true);
                const data = getValuesFromToken(tokens.accessToken);
                setUserDetails(data);
            }
            setIsLoading(false);
        };
        // Recompute user details whenever tokens change
        void decodeToken();
    }, [tokens?.accessToken]);

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
}
export { AuthContext, AuthProvider };
