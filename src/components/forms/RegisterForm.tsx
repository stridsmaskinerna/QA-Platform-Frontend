import { useRef, useState, FormEventHandler } from "react";
import { useTranslation } from "react-i18next";
import { useQAContext } from "../../hooks";
import {
    IRegisterFormData,
    RegisterErrorMessage,
    removePropertiesFromObject,
} from "../../utils";
import { Input } from "../input";
import styles from "./FormShared.module.css";
import { PASSWORD_MIN_LENGTH } from "../../data";
import { Modal } from "..";

export function RegisterForm() {
    const { t } = useTranslation();
    const {
        authContext: { register },
        loaderContext: { setIsLoading },
    } = useQAContext();
    const formRef = useRef<HTMLFormElement>(null);
    const [error, setError] = useState<RegisterErrorMessage>();
    const [showVerificationMsg, setShowVerificationMsg] = useState(false);

    const onSubmit: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();
        setError(undefined);
        void (async () => {
            const formData = new FormData(e.currentTarget);
            const formDetails = Object.fromEntries(
                formData,
            ) as unknown as IRegisterFormData;

            if (formDetails.password !== formDetails.confirmPassword) {
                setError("passwordsNoMatch");
                return;
            }
            if (formDetails.email.slice(-7).toUpperCase() !== "@LTU.SE") {
                setError("mustEndWithLtuErrMsg");
                return;
            }

            setIsLoading(true);
            const errMsg = await register(
                removePropertiesFromObject(formDetails, "confirmPassword"),
            );
            if (!errMsg) {
                formRef.current?.reset();
                setShowVerificationMsg(true);
            } else {
                setError(errMsg);
            }
            setIsLoading(false);
        })();
    };
    return (
        <>
            {" "}
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
            {showVerificationMsg && (
                <Modal
                    message={t("verifyEmail")}
                    okClick={() => setShowVerificationMsg(false)}
                />
            )}
        </>
    );
}
