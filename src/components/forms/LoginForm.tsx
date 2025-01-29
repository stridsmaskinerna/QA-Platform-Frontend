import { useTranslation } from "react-i18next";
import { Input } from "..";
import styles from "./FormShared.module.css";
import { FormEventHandler, useRef, useState } from "react";
import { useAuthContext } from "../../hooks";
import { CustomError, ILoginCredentials } from "../../utils";
import { useNavigate } from "react-router";
import { HOME_ROUTE, PASSWORD_MIN_LENGTH } from "../../data";

export function LoginForm() {
    const { t } = useTranslation();
    const { login } = useAuthContext();
    const formRef = useRef<HTMLFormElement>(null);
    const [error, setError] = useState<
        "wrongCredentials" | "serverProblem" | "mustEndWithLtuErrMsg"
    >();
    const navigate = useNavigate();

    const onSubmit: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();
        setError(undefined);
        void (async () => {
            const formData = new FormData(e.currentTarget);
            const formDetails = Object.fromEntries(
                formData
            ) as unknown as ILoginCredentials;
            if (formDetails.email.slice(-7).toUpperCase() !== "@LTU.SE") {
                setError("mustEndWithLtuErrMsg");
                return;
            }
            try {
                await login(formDetails);
                await navigate(HOME_ROUTE);
            } catch (e) {
                if (e instanceof CustomError && e.errorCode === 401) {
                    setError("wrongCredentials");
                    return;
                }
                setError("serverProblem");
                console.error(e);
            }
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
                label={t("email")}
            />
            <Input
                minInputValueLength={PASSWORD_MIN_LENGTH}
                inputName="password"
                inputType="password"
                label={t("password")}
            />
            <button
                className={styles.submitBtn}
                type="submit"
            >
                {t("login")}
            </button>

            <p className={`${styles.errorMsg} ${error ? styles.show : ""}`}>
                {t(error ?? "")}
            </p>
        </form>
    );
}
