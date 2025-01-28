import { useTranslation } from "react-i18next";
import { LoginForm, Tabs } from "../../components";
import styles from "./LoginRegister.module.css";
import { CSSProperties } from "react";

const tabsContainerStyle: CSSProperties = { marginTop: "5vh" };
const tabsBtnStyle: CSSProperties = {
    fontSize: "clamp(16px, 2vw, 1.5rem)",
    paddingInline: "clamp(20px, 10vw, 11rem)"
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
                        index: 1,
                        title: t("login"),
                        btnStyle: tabsBtnStyle
                    },
                    {
                        content: <LoginForm />,
                        index: 2,
                        title: t("register"),
                        btnStyle: tabsBtnStyle
                    }
                ]}
                containerStyle={tabsContainerStyle}
            />
        </section>
    );
}
