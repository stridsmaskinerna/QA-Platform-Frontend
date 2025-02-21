import { MouseEventHandler, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { QuestionCard } from "../../../questionCard";
import { DynamicTooltip } from "../dynamicTooltip";
import styles from "./InfoModalBody.module.css";
import { H2 } from "../../../text";
import { IQuestionWithInformationTitle } from "../types";

interface Props {
    questionCards: IQuestionWithInformationTitle[];
}

export function InfoModalBody({ questionCards }: Props) {
    const { t } = useTranslation();
    const [tooltipData, setTooltipData] = useState<{
        text: string;
        position: { top: number; left: number };
    } | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % questionCards.length);
    };

    const prevSlide = () => {
        setCurrentIndex(
            prevIndex =>
                (prevIndex - 1 + questionCards.length) % questionCards.length,
        );
    };

    const hidePointerEvens: MouseEventHandler<HTMLDivElement> = e => {
        e.stopPropagation();
        const target = e.currentTarget;
        target.classList.add(styles.hidePointerEvents);

        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            target.classList.remove(styles.hidePointerEvents);
            timerRef.current = null;
        }, 1000);
    };

    const overrideCursor: MouseEventHandler<HTMLDivElement> = e => {
        e.stopPropagation();
        e.currentTarget.style.cursor = "pointer";
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const targetElement = e.target as HTMLElement;
        e.stopPropagation();

        const keywordDescriptions: Record<string, string> = {
            [questionCards[0].userName]:
                "The person who created this question.",
            [questionCards[0].title]: "The main title of the question.",
            [questionCards[0].topicName]: "The topic this question belongs to.",
            [questionCards[0].subjectName]:
                "The subject name and code associated with this question.",
            [questionCards[0].subjectCode]:
                "The subject name and code associated with this question.",
            [questionCards[0].answerCount]: "The number of answers.",
            [t("oneDayAgo")]: "How long time ago the question was asked.",
            [t("resolved")]:
                "If the author of the question have accepted an anwsers.",
            [t("unresolved")]:
                "If the author of the question have accepted an anwsers.",
            [t("publicQuestion")]:
                "The question can only be viewwd by authenticated users.",
            [t("nonPublicQuestion")]: "The question can be viewwd by everyone.",
        };

        const matchedKey = Object.keys(keywordDescriptions).find(key =>
            targetElement.textContent?.includes(key),
        );

        if (
            matchedKey &&
            (targetElement instanceof HTMLParagraphElement ||
                targetElement instanceof HTMLHeadingElement ||
                targetElement instanceof HTMLSpanElement)
        ) {
            setTooltipData({
                text: keywordDescriptions[matchedKey],
                position: { top: e.clientY + 10, left: e.clientX + 10 },
            });
        } else {
            setTooltipData(null);
        }
    };

    return (
        <>
            <H2
                text={`Question Cards - ${questionCards[currentIndex].informationTitle}`}
                color="white"
            />
            <div className={styles.container}>
                <div
                    className={styles.slideContainer}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={overrideCursor}
                    onMouseLeave={() => setTooltipData(null)}
                    onMouseDown={hidePointerEvens}
                >
                    <QuestionCard data={questionCards[currentIndex]} />
                </div>

                <div className={styles.navigation}>
                    <button
                        onClick={prevSlide}
                        disabled={currentIndex === 0}
                    >
                        ⬅ Previous
                    </button>
                    <span>
                        {currentIndex + 1} / {questionCards.length}
                    </span>
                    <button
                        onClick={nextSlide}
                        disabled={currentIndex === questionCards.length - 1}
                    >
                        Next ➡
                    </button>
                </div>
                {tooltipData && (
                    <DynamicTooltip
                        position={tooltipData.position}
                        content={tooltipData.text}
                    />
                )}
            </div>
        </>
    );
}
