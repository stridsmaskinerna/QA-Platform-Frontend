import { Route, Routes } from "react-router";
import { AuthGuard, Header, ErrorBoundary } from "./components";
import { Admin, LoginRegister, QAExtended, QALimited } from "./pages";

function App() {
    return (
        <ErrorBoundary>
            <Header />
            <Routes>
                <Route
                    path="/public"
                    element={<QALimited />}
                />
                <Route
                    path="/login"
                    element={<LoginRegister />}
                />
                <Route
                    path="/"
                    element={
                        <AuthGuard
                            roleBasedRedirect={{
                                allowedRoles: ["User", "Teacher"],
                                fallbackRoute: "/public"
                            }}
                        >
                            <Route element={<QAExtended />} />
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
                            <Route element={<Admin />} />
                        </AuthGuard>
                    }
                />
            </Routes>
        </ErrorBoundary>
    );
}

export default App;
