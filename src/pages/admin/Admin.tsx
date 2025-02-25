import { useTranslation } from "react-i18next";
import {

    Tabs
} from "../../components";
import styles from "../home/HomeSharedStyle.module.css";
import { ITab } from "../../utils";
import { CSSProperties, useMemo } from "react";
import { CourseManagement } from "../../components/adminDashboard/courseManagement/CourseManagement";
import { UserManagement } from "../../components/adminDashboard/userManagement/UserManagement";
import { TagManagement } from "../../components/adminDashboard/tagManagement/TagManagement";

const tabBtnsContainerStyle: CSSProperties = {
    maxWidth: "100%",
};

const btnStyle: CSSProperties = {
    fontSize: "13px",
    width: "max-content",
    paddingBlock: "5px",
};

const contentContainerStyle: CSSProperties = {
    width: "100%",
    marginTop: "1.5rem",
};
const tabsContainerStyle: CSSProperties = { width: "100%", maxWidth: "1600px" };

export function Admin() {
    const { t } = useTranslation();

    const tabs = useMemo(() => {
        const baseTabs: ITab[] = [
            {
                content: <CourseManagement/>,
                contentContainerStyle,
                btnStyle,
                title: t("courseManagement"),
            },
            {
                content: <UserManagement />,
                contentContainerStyle,
                btnStyle,
                title: t("userManagement"),
            },
            {
                content: <TagManagement />,
                contentContainerStyle,
                btnStyle,
                title: t("tagManagement"),
            },
        ];
 
        return baseTabs;
    }, [t]);

    return (
        <section className={styles.container}>
            <Tabs
                containerStyle={tabsContainerStyle}
                tabs={tabs}
                tabBtnsContainerStyle={tabBtnsContainerStyle}
            />
        </section>
    );
}
