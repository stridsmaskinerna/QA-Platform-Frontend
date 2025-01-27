import { Route, Routes } from "react-router";
import { AuthGuard, Header, ErrorBoundary } from "./components";
import {
    Admin,
    LoginRegister,
    QAExtended,
    QALimited,
    QuestionPageExtended,
    QuestionPageLimited
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
            <Header />
            <Routes>
                <Route
                    path={GUEST_QA_ROUTE}
                    element={<QALimited />}
                />
                <Route
                    path={LOGIN_REGISTER_ROUTE}
                    element={<LoginRegister />}
                />
                <Route
                    path={GUEST_QUESTION_ROUTE + QUESTION_ID}
                    element={<QuestionPageLimited />}
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
                            <QAExtended />
                        </AuthGuard>
                    }
                />
                <Route
                    path={QUESTION_ROUTE + QUESTION_ID}
                    element={
                        <AuthGuard
                            roleBasedRedirect={{
                                allowedRoles: ["User", "Teacher"],
                                fallbackRoute: GUEST_QUESTION_ROUTE
                            }}
                        >
                            <QuestionPageExtended />
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
        </ErrorBoundary>
    );
}

export default App;
