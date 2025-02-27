import { useTranslation } from "react-i18next";
import { NavLinkTabs } from "../../components";
import { useMemo } from "react";
import { Outlet } from "react-router";
import styles from "./Admin.module.css";

export function Admin() {
    const { t } = useTranslation();

    const navTabs = useMemo(
        () => [
            { title: t("adminDashBoard.courseManagement"), to: "course-management" },
            { title: t("adminDashBoard.userManagement"), to: "user-management" },
            { title: t("adminDashBoard.tagManagement"), to: "tag-management" },
        ],
        [t],
    );

    return (
        <section className={styles.container}>
            <div className={styles.contentWrapper}>
                <NavLinkTabs
                    containerClass={styles.navTabsContainer}
                    btnClass={styles.tabBtn}
                    navTabs={navTabs}
                />
                <Outlet />
            </div>
        </section>
    );
}
