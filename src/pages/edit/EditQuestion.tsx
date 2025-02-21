import { useParams } from "react-router";
import { EditAQuestion, RouteButton } from "../../components";
import { useTranslation } from "react-i18next";
import styles from "./EditQuestion.module.css";
import { HOME_ROUTE } from "../../data";

export function EditQuestion() {
    const { questionId } = useParams();
    const { t } = useTranslation();

    if (!questionId) {
        return <h2>{t("couldNotFindQuestion")}</h2>;
    }

    return (
        <section className={styles.container}>
            <div className={styles.alignleft}>
                <RouteButton
                    routeTo={HOME_ROUTE}
                    text={t("backToQA")}
                />
            </div>

            <h2>{t("editQuestion")}</h2>

            <EditAQuestion questionId={questionId} />
        </section>
    );
}
