import { Route, Routes } from "react-router";
import { AuthGuard, Header, ErrorBoundary } from "./components";
import {
    Admin,
    LoginRegister,
    HomeExtended,
    HomeLimited,
    QuestionDetailsExtended,
    QuestionDetailsLimited
} from "./pages";
import {
    ADMIN_ROUTE,
    GUEST_HOME_ROUTE,
    GUEST_QUESTION_DETAILS_ROUTE,
    HOME_ROUTE,
    LOGIN_REGISTER_ROUTE,
    QUESTION_DETAILS_ROUTE,
    QUESTION_ID
} from "./data";
import { Role } from "./utils/enums";

function App() {
    return (
        <ErrorBoundary>
            <main className="app">
                <Header />
                <Routes>
                    <Route
                        path={GUEST_HOME_ROUTE}
                        element={<HomeLimited />}
                    />
                    <Route
                        path={LOGIN_REGISTER_ROUTE}
                        element={<LoginRegister />}
                    />
                    <Route
                        path={GUEST_QUESTION_DETAILS_ROUTE + QUESTION_ID}
                        element={<QuestionDetailsLimited />}
                    />
                    <Route
                        path={HOME_ROUTE}
                        element={
                            <AuthGuard
                                roleBasedRedirect={{
                                    allowedRoles: [Role.User, Role.Teacher],
                                    fallbackRoute: GUEST_HOME_ROUTE
                                }}
                            >
                                <HomeExtended />
                            </AuthGuard>
                        }
                    />
                    <Route
                        path={QUESTION_DETAILS_ROUTE + QUESTION_ID}
                        element={
                            <AuthGuard
                                roleBasedRedirect={{
                                    allowedRoles: [Role.User, Role.Teacher],
                                    //The questionId is appended to the fallback route in the AuthGuard
                                    fallbackRoute: GUEST_QUESTION_DETAILS_ROUTE
                                }}
                            >
                                <QuestionDetailsExtended />
                            </AuthGuard>
                        }
                    />
                    <Route
                        path={ADMIN_ROUTE}
                        element={
                            <AuthGuard
                                roleBasedRedirect={{
                                    allowedRoles: [Role.Admin],
                                    fallbackRoute: HOME_ROUTE
                                }}
                            >
                                <Admin />
                            </AuthGuard>
                        }
                    />
                </Routes>
            </main>
        </ErrorBoundary>
    );
}

export default App;
