import {
    createContext,
    ReactElement,
    ReactNode,
    useEffect,
    useState
} from "react";
import {
    getRolesFromToken,
    IAuthContext,
    ILoginCredentials,
    ITokens,
    loginReq,
    Roles
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

    const [roles, setRoles] = useState<Roles[]>();

    const values: IAuthContext = {
        roles,
        login,
        logout,
        tokens
    };

    async function login({ email, password }: ILoginCredentials) {
        const tokens = await loginReq({ email, password });
        setTokens(tokens);
    }

    function logout() {
        clearTokens();
    }

    useEffect(() => {
        // Recompute roles whenever tokens change
        setRoles(getRolesFromToken(tokens?.accessToken));
    }, [tokens?.accessToken]);

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
}
export { AuthContext, AuthProvider };
