import { useParams } from "react-router";
import { EditAQuestion, GoBackButton } from "../../components";
import { useTranslation } from "react-i18next";
import styles from "./EditQuestion.module.css";

export function EditQuestion() {
    const { questionId } = useParams();
    const { t } = useTranslation();

    if (!questionId) {
        return <h2>{t("couldNotFindQuestion")}</h2>;
    }

    return (
        <section className={styles.container}>
            <div className={styles.alignleft}>
                <GoBackButton text={t("backToQA")} />
            </div>

            <h2>{t("editQuestion")}</h2>

            <EditAQuestion questionId={questionId} />
        </section>
    );
}
