import { useTranslation } from "react-i18next";
import { LoginForm, RegisterForm, Tabs } from "../../components";
import styles from "./LoginRegister.module.css";
import { CSSProperties } from "react";

const tabsContainerStyle: CSSProperties = { marginTop: "2rem" };
const tabsContentContainerStyle: CSSProperties = {
    width: "100%"
};
const tabBtnsContainerStyle: CSSProperties = {
    width: "clamp(260px, 60vw, 1000px)"
};
const tabsBtnStyle: CSSProperties = {
    fontSize: "clamp(16px, 2vw, 1.5rem)",
    flex: 1
};

export function LoginRegister() {
    const { t } = useTranslation();

    return (
        <section className={styles.container}>
            <header>
                <h2>{t("loginRegister").split("/").join(" / ")}</h2>
            </header>
            <Tabs
                tabs={[
                    {
                        content: <LoginForm />,
                        title: t("login"),
                        btnStyle: tabsBtnStyle,
                        contentContainerStyle: tabsContentContainerStyle
                    },
                    {
                        content: <RegisterForm />,
                        title: t("register"),
                        btnStyle: tabsBtnStyle,
                        contentContainerStyle: tabsContentContainerStyle
                    }
                ]}
                containerStyle={tabsContainerStyle}
                tabBtnsContainerStyle={tabBtnsContainerStyle}
            />
        </section>
    );
}
