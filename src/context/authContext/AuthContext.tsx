import { createContext, ReactElement, ReactNode } from "react";
import {
    IAuthContext,
    ILoginCredentials,
    ITokens,
    loginReq
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
    const values: IAuthContext = {
        isLoggedIn: tokens !== null,
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

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
}
export { AuthContext, AuthProvider };
