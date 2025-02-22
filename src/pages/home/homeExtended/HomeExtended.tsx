import { useTranslation } from "react-i18next";
import {
    AskAQuestion,
    QuestionFinder,
    Tabs,
    TabsProvider,
    TeacherDashboard,
} from "../../../components";
import { useRoles } from "../../../hooks";
import styles from "../HomeSharedStyle.module.css";
import { ITab } from "../../../utils";
import { CSSProperties, useMemo } from "react";

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

export function HomeExtended() {
    const { t } = useTranslation();
    const { isTeacher } = useRoles();
    const tabs = useMemo(() => {
        const baseTabs: ITab[] = [
            {
                content: <QuestionFinder />,
                contentContainerStyle,
                btnStyle,
                title: t("searchQuestions"),
            },
            {
                content: <AskAQuestion />,
                contentContainerStyle,
                btnStyle,
                title: t("askAQuestion"),
            },
        ];
        if (isTeacher) {
            baseTabs.push({
                content: <TeacherDashboard />,
                contentContainerStyle,
                btnStyle,
                title: t("teacher"),
            });
        }
        return baseTabs;
    }, [isTeacher, t]);

    return (
        <section className={styles.container}>
            <TabsProvider>
                <Tabs
                    containerStyle={tabsContainerStyle}
                    tabs={tabs}
                    tabBtnsContainerStyle={tabBtnsContainerStyle}
                />
            </TabsProvider>
        </section>
    );
}
