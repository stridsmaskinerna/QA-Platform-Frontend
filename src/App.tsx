import { Route, Routes } from "react-router";
import {
    AuthGuard,
    Header,
    ErrorBoundary,
    FullScreenLoader,
    QuestionFinder,
    AskAQuestion,
    TeacherDashboard,
    CourseManagement,
    UserManagement,
    TagManagement,
} from "./components";
import {
    Admin,
    LoginRegister,
    HomeExtended,
    HomeLimited,
    QuestionDetailsExtended,
    QuestionDetailsLimited,
    EditQuestion,
} from "./pages";
import {
    ADMIN_ROUTE,
    EDIT_QUESTION_ROUTE,
    GUEST_HOME_ROUTE,
    GUEST_QUESTION_DETAILS_ROUTE,
    HOME_ROUTE,
    LOGIN_REGISTER_ROUTE,
    QUESTION_DETAILS_ROUTE,
    QUESTION_ID,
} from "./data";
import { Role } from "./utils";
import { useQAContext } from "./hooks";

function App() {
    const {
        loaderContext: { isLoading },
    } = useQAContext();

    return (
        <ErrorBoundary>
            <main className="app">
                {isLoading && <FullScreenLoader />}
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
                                    fallbackRoute: GUEST_HOME_ROUTE,
                                }}
                            >
                                <HomeExtended />
                            </AuthGuard>
                        }
                    >
                        <Route
                            index
                            element={<QuestionFinder />}
                        />
                        <Route
                            path="ask"
                            element={<AskAQuestion />}
                        />
                        <Route
                            path="teacher"
                            element={<TeacherDashboard />}
                        />
                    </Route>
                    <Route
                        path={QUESTION_DETAILS_ROUTE + QUESTION_ID}
                        element={
                            <AuthGuard
                                roleBasedRedirect={{
                                    allowedRoles: [
                                        Role.User,
                                        Role.Teacher,
                                        Role.Admin,
                                    ],
                                    //The questionId is appended to the fallback route in the AuthGuard
                                    fallbackRoute: GUEST_QUESTION_DETAILS_ROUTE,
                                }}
                            >
                                <QuestionDetailsExtended />
                            </AuthGuard>
                        }
                    />

                    <Route
                        path={EDIT_QUESTION_ROUTE + QUESTION_ID}
                        element={
                            <AuthGuard
                                roleBasedRedirect={{
                                    allowedRoles: [Role.User],
                                    fallbackRoute: HOME_ROUTE,
                                }}
                            >
                                <EditQuestion />
                            </AuthGuard>
                        }
                    />

                    <Route
                        path={ADMIN_ROUTE}
                        element={
                            <AuthGuard
                                roleBasedRedirect={{
                                    allowedRoles: [Role.Admin],
                                    fallbackRoute: HOME_ROUTE,
                                }}
                            >
                                <Admin />
                            </AuthGuard>
                        }
                    >
                        <Route
                            index
                            path="course-management"
                            element={<CourseManagement />}
                        />
                        <Route
                            path="user-management"
                            element={<UserManagement />}
                        />
                        <Route
                            path="tag-management"
                            element={<TagManagement />}
                        />
                    </Route>
                </Routes>
            </main>
        </ErrorBoundary>
    );
}

export default App;
