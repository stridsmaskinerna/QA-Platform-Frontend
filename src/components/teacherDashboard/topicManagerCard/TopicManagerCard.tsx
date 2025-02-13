import { useTranslation } from "react-i18next";

import { ISubject, ITopic } from "../../../utils";
import { CardContainer } from "../cardContainer";
import removeIcon from "../../../assets/icons/removeX.svg";
import editIcon from "../../../assets/icons/edit.svg";
import styles from "./TopicManagerCard.module.css";
import { Input } from "../../input";

interface SubjectManagerCardProps {
    subject: ISubject;
}

export function TopicManagerCard({ subject }: SubjectManagerCardProps) {
    const { t } = useTranslation();

    
    const handleCreate = () => {
        console.log("Create new topic...");
    };

    return (
        <CardContainer>
            <h1>
                {t("teacherDashboard.manageTopicsFor")} {`'${subject.name}'`}
            </h1>
            <CreateContainer onCreate={handleCreate}/>
            {subject.topics.map((topic, i) => (
                <div key={i}>
                    <TopicItem topic={topic} />
                </div>
            ))}
        </CardContainer>
    );
}

interface ICreateContainerProps {
    onCreate: () => void;
}

function CreateContainer({ onCreate }: ICreateContainerProps) {

    const selectCreate = () => {
        onCreate();
    };

    return (
        <div className={styles.createContainer}>
            <Input
                inputType={"text"}
                placeHolder="New topic name..."/>
            <button
                className={styles.createBtn} 
                onClick={selectCreate}>
                Add Topic
            </button>
        </div>
    );
}

interface ITopicItemProps {
    topic: ITopic;
}

function TopicItem({ topic }: ITopicItemProps) {
    const handleEdit = (topic: ITopic) => {
        console.log(topic);
    };

    const handleDelete = (topic: ITopic) => {
        console.log(topic);
    };

    return (
        <div className={styles.subjectItem}>
            <p>{topic.name}</p>
            <ToolContainer
                topic={topic}
                onEdit={handleEdit}
                onDelete={handleDelete}/>
        </div>
    );
}

interface IToolContainerProps {
    topic: ITopic;
    onEdit: (topic: ITopic) => void;
    onDelete: (topic: ITopic) => void;
}

function ToolContainer({
    topic,
    onEdit,
    onDelete
}: IToolContainerProps) {
    const selectEdit = (topic: ITopic) => {
        onEdit(topic);
    };

    const selectDelete = (topic: ITopic) => {
        onDelete(topic);
    };

    return (
        <div className={styles.toolContainer}>
            <img
                onClick={() => { selectEdit(topic); }}
                src={editIcon}
                alt="Edit"
                title="Edit"
                className={styles.icon}
            />
            <img
                onClick={() => { selectDelete(topic); }}
                src={removeIcon}
                alt="Delete"
                title="Delete"
                className={styles.icon}
            />
        </div>
    );
}
