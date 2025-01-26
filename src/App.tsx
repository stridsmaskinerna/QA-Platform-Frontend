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

function App() {
    return (
        <ErrorBoundary>
            <Header />
            <Routes>
                <Route
                    path="/guest"
                    element={<QALimited />}
                />
                <Route
                    path="/login"
                    element={<LoginRegister />}
                />
                <Route
                    path="/guest/questions/:questionId"
                    element={<QuestionPageLimited />}
                />
                <Route
                    path="/"
                    element={
                        <AuthGuard
                            roleBasedRedirect={{
                                allowedRoles: ["User", "Teacher"],
                                fallbackRoute: "/guest"
                            }}
                        >
                            <QAExtended />
                        </AuthGuard>
                    }
                />
                <Route
                    path="questions/:questionId"
                    element={
                        <AuthGuard
                            roleBasedRedirect={{
                                allowedRoles: ["User", "Teacher"],
                                fallbackRoute: "/"
                            }}
                        >
                            <QuestionPageExtended />
                        </AuthGuard>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <AuthGuard
                            roleBasedRedirect={{
                                allowedRoles: ["Admin"],
                                fallbackRoute: "/"
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
