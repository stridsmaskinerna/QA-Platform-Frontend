import { useTranslation } from "react-i18next";
import { AskAQuestion, QuestionFinder, Tabs } from "../../../components";
import { useRoles } from "../../../hooks";
import styles from "../HomeSharedStyle.module.css";
import { ITab } from "../../../utils";
import { CSSProperties, useMemo } from "react";

const tabBtnsContainerStyle: CSSProperties = {
    width: "clamp(290px, 90vw, 700px)",
};

const btnStyle: CSSProperties = {
    fontSize: "clamp(14px, 2vw, 1.2rem)",
    flex: 1,
};

const questionFinderContainerStyle: CSSProperties = {
    marginTop: "1.5rem",
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
                content: <AskAQuestion />,
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
