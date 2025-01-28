import { useTranslation } from "react-i18next";
import { Input } from "../";
import styles from "./LoginForm.module.css";
import { FormEventHandler, useRef, useState } from "react";
import { useAuthContext } from "../../hooks";
import { CustomError, ILoginCredentials } from "../../utils";
import { useNavigate } from "react-router";

interface ILoginFormProps {
    parentWidth: number;
}

export function LoginForm({ parentWidth }: ILoginFormProps) {
    const { t } = useTranslation();
    const { login } = useAuthContext();
    const formRef = useRef<HTMLFormElement>(null);
    const [error, setError] = useState<"wrongCredentials" | "serverProblem">();
    const navigate = useNavigate();

    const onSubmit: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();
        void (async () => {
            const formData = new FormData(e.currentTarget);
            const formDetails = Object.fromEntries(
                formData
            ) as unknown as ILoginCredentials;
            try {
                await login(formDetails);
                await navigate("/");
            } catch (e) {
                if (e instanceof CustomError) {
                    if (e.errorCode.toString().startsWith("5")) {
                        setError("serverProblem");
                    } else {
                        setError("wrongCredentials");
                    }
                }
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
                parentWidth={parentWidth}
            />
            <Input
                inputName="password"
                inputType="password"
                label={t("password")}
                parentWidth={parentWidth}
            />
            <button
                className={styles.submitBtn}
                style={{ width: parentWidth }}
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
