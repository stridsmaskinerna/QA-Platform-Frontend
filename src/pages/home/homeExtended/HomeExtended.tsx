import { useTranslation } from "react-i18next";
import { QuestionFinder, Tabs } from "../../../components";
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

const questionFinderContainerStyle: CSSProperties = {
    marginTop: "1rem",
    width: "100%",
};
const tabsContainerStyle: CSSProperties = { width: "100%", maxWidth: "1600px" };

export function HomeExtended() {
    const { t } = useTranslation();
    const { isTeacher } = useRoles();

    const tabs: ITab[] = useMemo(() => {
        const baseTabs = [
            {
                content: <QuestionFinder />,
                contentContainerStyle: questionFinderContainerStyle,
                btnStyle,
                title: t("searchQuestions"),
            },
            {
                content: <></>,
                btnStyle,
                title: t("askAQuestion"),
            },
        ];
        if (!isTeacher) {
            baseTabs.push({
                content: <></>,
                btnStyle,
                title: t("teacher"),
            });
        }
        return baseTabs;
    }, [isTeacher, t]);

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
