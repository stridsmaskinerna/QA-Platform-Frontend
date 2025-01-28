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
    GUEST_QA_ROUTE,
    GUEST_QUESTION_ROUTE,
    LOGIN_REGISTER_ROUTE,
    QA_ROUTE,
    QUESTION_ID,
    QUESTION_ROUTE
} from "./data";

function App() {
    return (
        <ErrorBoundary>
            <main className="app">
                <Header />
                <Routes>
                    <Route
                        path={GUEST_QA_ROUTE}
                        element={<HomeLimited />}
                    />
                    <Route
                        path={LOGIN_REGISTER_ROUTE}
                        element={<LoginRegister />}
                    />
                    <Route
                        path={GUEST_QUESTION_ROUTE + QUESTION_ID}
                        element={<QuestionDetailsLimited />}
                    />
                    <Route
                        path={QA_ROUTE}
                        element={
                            <AuthGuard
                                roleBasedRedirect={{
                                    allowedRoles: ["User", "Teacher"],
                                    fallbackRoute: GUEST_QA_ROUTE
                                }}
                            >
                                <HomeExtended />
                            </AuthGuard>
                        }
                    />
                    <Route
                        path={QUESTION_ROUTE + QUESTION_ID}
                        element={
                            <AuthGuard
                                roleBasedRedirect={{
                                    allowedRoles: ["User", "Teacher"],
                                    //The questionId is appended to the fallback route in the AuthGuard
                                    fallbackRoute: GUEST_QUESTION_ROUTE
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
                                    allowedRoles: ["Admin"],
                                    fallbackRoute: QA_ROUTE
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
