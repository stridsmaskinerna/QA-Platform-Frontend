import { useTranslation } from "react-i18next";
import { QuestionFinder, Tabs } from "../../components";
import { useRoles } from "../../hooks";
import styles from "./HomeExtended.module.css";
import { ITab } from "../../utils";
import { CSSProperties } from "react";
import { useMediaQuery } from "usehooks-ts";

let tabBtnsContainerStyle: CSSProperties = {};

const btnStyle: CSSProperties = {
    fontSize: "clamp(14px, 2vw, 1.2rem)",
    flex: 1
};

const questionFinderContainerStyle: CSSProperties = {
    marginTop: "1.5rem",
    width: "100%"
};

let tabsContainerStyle: CSSProperties = {};

export function HomeExtended() {
    const { t } = useTranslation();
    const { isTeacher } = useRoles();
    const matches = useMediaQuery(`(max-width: 1000px`);
    if (matches) {
        tabsContainerStyle = {
            alignSelf: "center",
            width: "100%",
            justifyContent: "center"
        };
        tabBtnsContainerStyle = {
            width: "clamp(290px, 90vw, 700px)"
        };
    } else {
        tabsContainerStyle = {
            width: "100%",
            justifyContent: "flex-start"
        };
        tabBtnsContainerStyle = {
            width: "clamp(290px, 90vw, 700px)"
        };
    }

    const tabs: ITab[] = [
        {
            content: <QuestionFinder />,
            contentContainerStyle: questionFinderContainerStyle,
            btnStyle,
            title: t("searchQuestions")
        },
        {
            content: <></>,
            btnStyle,
            title: t("askAQuestion")
        }
    ];
    if (!isTeacher) {
        tabs.push({
            content: <></>,
            btnStyle,
            title: t("teacher")
        });
    }

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
