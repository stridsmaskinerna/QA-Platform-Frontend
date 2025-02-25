import { IAnswer } from "../../utils";
import { AnswerCardBody } from "./answerCardBody";
import { AnswerCardHeader } from "./answerCardHeader";
import { AnswerCardComments } from "../answerCardComments";
import { AnswerCardBottom } from "./AnswerCardBottom";
import styles from "./AnswerCard.module.css";
import { useEffect, useRef } from "react";
import { useQuestionDetailsContext } from "../questionDetailsViewer";

interface IAnswerProps {
    data: IAnswer;
}

export function AnswerCard({ data }: IAnswerProps) {
    const { highlightedAnswerId } = useQuestionDetailsContext();
    const answerCardRef = useRef<HTMLDivElement | null>(null);
    const borderStyle = data.isAccepted
        ? styles.borderAccepted
        : styles.borderDefault;

    useEffect(() => {
        console.log(data);
    });

    useEffect(() => {
        if (highlightedAnswerId === data.id && answerCardRef.current != null) {
            answerCardRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [data.id, highlightedAnswerId]);

    const getDerivedContainerClassName = () => {
        return highlightedAnswerId == data.id
            ? `${styles.container} ${styles.highlightedContainer}`
            : styles.container;
    };

    return (
        <div
            ref={answerCardRef}
            className={`${getDerivedContainerClassName()} ${borderStyle}`}
        >
            <AnswerCardHeader
                username={data.userName}
                answeredByTeacher={data.answeredByTeacher}
                created={data.created}
                isAccepted={data.isAccepted}
                isHidden={data.isHidden}
            />
            <AnswerCardBody answer={data} />
            <AnswerCardBottom
                answerId={data.id}
                answer={data}
                voteCount={data.voteCount}
                myVote={data.myVote}
            />
            <AnswerCardComments
                answerId={data.id}
                comments={data.comments}
            />
        </div>
    );
}
