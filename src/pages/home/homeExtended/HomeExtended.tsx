import { useTranslation } from "react-i18next";
import { NavLinkTabs } from "../../../components";
import { useRoles } from "../../../hooks";
import styles from "../HomeSharedStyle.module.css";
import { useMemo } from "react";
import { Outlet } from "react-router";
import { HOME_ROUTE } from "../../../data";

export function HomeExtended() {
    const { t } = useTranslation();
    const { isTeacher } = useRoles();
    const navTabs = useMemo(() => {
        const baseNavTabs = [
            { title: t("searchQuestions"), to: HOME_ROUTE },
            { title: t("askAQuestion"), to: "ask" },
        ];
        if (isTeacher) {
            baseNavTabs.push({ title: t("teacher"), to: "teacher" });
        }
        return baseNavTabs;
    }, [isTeacher, t]);

    return (
        <section className={styles.container}>
            <div className={styles.contentWrapper}>
                <NavLinkTabs
                    btnClass={styles.tabBtn}
                    containerClass={styles.navTabsContainer}
                    navTabs={navTabs}
                />
                <Outlet />
            </div>
        </section>
    );
}
