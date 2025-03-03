import { useTranslation } from "react-i18next";
import { Input } from "..";
import styles from "./FormShared.module.css";
import { FormEventHandler, useRef, useState } from "react";
import { useQAContext } from "../../hooks";
import { ILoginCredentials, LoginErrorMessage } from "../../utils";
import { useNavigate } from "react-router";
import { HOME_ROUTE, PASSWORD_MIN_LENGTH } from "../../data";

export function LoginForm() {
    const { t } = useTranslation();
    const {
        authContext: { login },
        loaderContext: { setIsLoading },
    } = useQAContext();
    const formRef = useRef<HTMLFormElement>(null);
    const [error, setError] = useState<LoginErrorMessage>();
    const navigate = useNavigate();

    const onSubmit: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();
        setError(undefined);
        void (async () => {
            const formData = new FormData(e.currentTarget);
            const formDetails = Object.fromEntries(
                formData,
            ) as unknown as ILoginCredentials;
            if (formDetails.email.slice(-6).toUpperCase() !== "LTU.SE") {
                setError("mustEndWithLtuErrMsg");
                return;
            }

            setIsLoading(true);
            const errMsg = await login(formDetails);
            if (!errMsg) {
                await navigate(HOME_ROUTE);
            } else {
                setError(errMsg);
            }
            setIsLoading(false);
        })();
    };
    return (
        <form
            ref={formRef}
            className={styles.container}
            onSubmit={onSubmit}
        >
            <Input
                inputName="email"
                inputType="email"
                label={t("loginRegisterForm.email")}
            />
            <Input
                minInputValueLength={PASSWORD_MIN_LENGTH}
                inputName="password"
                inputType="password"
                label={t("loginRegisterForm.password")}
            />
            <button
                className={styles.submitBtn}
                type="submit"
            >
                {t("login")}
            </button>

            <p className={`${styles.errorMsg} ${error ? styles.show : ""}`}>
                {error ? t(error) : ""}
            </p>
        </form>
    );
}
