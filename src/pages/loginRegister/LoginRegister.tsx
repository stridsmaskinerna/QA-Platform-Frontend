import { useTranslation } from "react-i18next";
import { LoginForm, Tabs } from "../../components";
import styles from "./LoginRegister.module.css";
import { CSSProperties, useEffect, useRef, useState } from "react";

const tabsContainerStyle: CSSProperties = { marginTop: "2rem" };
const tabBtnsContainerStyle: CSSProperties = {
    display: "flex",
    width: "clamp(260px, 60vw, 1000px)"
};
const tabsBtnStyle: CSSProperties = {
    fontSize: "clamp(16px, 2vw, 1.5rem)",
    flex: 1
};

export function LoginRegister() {
    const { t } = useTranslation();
    const tabsWrapperRef = useRef<HTMLDivElement>(null);
    const [articleWidth, setArticleWidth] = useState(0);

    useEffect(() => {
        const updateArticleWidth = () => {
            if (tabsWrapperRef.current) {
                setArticleWidth(tabsWrapperRef.current.offsetWidth);
            }
        };

        updateArticleWidth();
        window.addEventListener("resize", updateArticleWidth);

        return () => {
            window.removeEventListener("resize", updateArticleWidth);
        };
    }, []);

    return (
        <section className={styles.container}>
            <header>
                <h2>{t("loginRegister").split("/").join(" / ")}</h2>
            </header>
            <div ref={tabsWrapperRef}>
                <Tabs
                    tabs={[
                        {
                            content: <LoginForm parentWidth={articleWidth} />,
                            title: t("login"),
                            btnStyle: tabsBtnStyle
                        },
                        {
                            content: <LoginForm parentWidth={articleWidth} />,
                            title: t("register"),
                            btnStyle: tabsBtnStyle
                        }
                    ]}
                    containerStyle={tabsContainerStyle}
                    tabBtnsContainerStyle={tabBtnsContainerStyle}
                />
            </div>
        </section>
    );
}
