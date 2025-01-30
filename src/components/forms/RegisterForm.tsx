import { useRef, useState, FormEventHandler } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../hooks";
import {
    CustomError,
    IRegisterFormData,
    removePropertiesFromObject
} from "../../utils";
import { Input } from "../input";
import styles from "./FormShared.module.css";
import {
    EMAIL_TAKEN,
    HOME_ROUTE,
    PASSWORD_MIN_LENGTH,
    USERNAME_TAKEN
} from "../../data";

export function RegisterForm() {
    const { t } = useTranslation();
    const { register } = useAuthContext();
    const formRef = useRef<HTMLFormElement>(null);
    const [error, setError] = useState<
        | "usernameTaken"
        | "serverProblem"
        | "passwordsNoMatch"
        | "mustEndWithLtuErrMsg"
        | "emailTaken"
    >();
    const navigate = useNavigate();

    const onSubmit: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();
        setError(undefined);
        void (async () => {
            const formData = new FormData(e.currentTarget);
            const formDetails = Object.fromEntries(
                formData
            ) as unknown as IRegisterFormData;

            if (formDetails.password !== formDetails.confirmPassword) {
                setError("passwordsNoMatch");
                return;
            }
            if (formDetails.email.slice(-7).toUpperCase() !== "@LTU.SE") {
                setError("mustEndWithLtuErrMsg");
                return;
            }

            try {
                await register(
                    removePropertiesFromObject(formDetails, "confirmPassword")
                );
                await navigate(HOME_ROUTE);
            } catch (e) {
                if (e instanceof CustomError && e.errorCode === 409) {
                    if (e.message === USERNAME_TAKEN) {
                        setError("usernameTaken");
                    }
                    if (e.message === EMAIL_TAKEN) {
                        setError("emailTaken");
                    }
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
                label={`${t("email")} (${t("mustEndWithLtu")})`}
            />
            <Input
                inputName="username"
                inputType="text"
                label={t("username")}
            />
            <Input
                minInputValueLength={PASSWORD_MIN_LENGTH}
                inputName="password"
                inputType="password"
                label={t("password")}
            />
            <Input
                minInputValueLength={PASSWORD_MIN_LENGTH}
                inputName="confirmPassword"
                inputType="password"
                label={t("confirmPassword")}
            />
            <button
                className={styles.submitBtn}
                type="submit"
            >
                {t("register")}
            </button>

            <p className={`${styles.errorMsg} ${error ? styles.show : ""}`}>
                {t(error ?? "")}
            </p>
        </form>
    );
}
