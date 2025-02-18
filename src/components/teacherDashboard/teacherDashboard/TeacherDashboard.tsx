import { Role } from "../../../utils";
import { GUEST_HOME_ROUTE } from "../../../data";
import { AuthGuard } from "../../authGuard";
import { TeacherDashboardProvider } from "../provider";
import { TeacherDashboardInternal } from "../teacherDashboardInternal";

export function TeacherDashboard() {
    return (
        <AuthGuard
            roleBasedRedirect={{
                allowedRoles: [Role.Teacher],
                fallbackRoute: GUEST_HOME_ROUTE,
            }}
        >
            <TeacherDashboardProvider>
                <TeacherDashboardInternal />
            </TeacherDashboardProvider>
        </AuthGuard>
    );
}
