import { MouseEventHandler, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { QuestionCard } from "../../../questionCard";
import { DynamicTooltip } from "../dynamicTooltip";
import { H2 } from "../../../text";
import { IQuestionWithInformationMeta } from "../types";
import { useHighlightEffect, useTooltip } from "../hooks";
import styles from "./InfoModalBody.module.css";

interface Props {
    questionCards: IQuestionWithInformationMeta[];
}

export function InfoModalBody({ questionCards }: Props) {
    const { t } = useTranslation();
    const [animation, setAnimation] = useState(styles.nextEnter);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { highlightElements } = useHighlightEffect(
        currentIndex,
        questionCards,
    );
    const tooltipHook = useTooltip(highlightElements);

    const nextSlide = () => {
        setAnimation(styles.nextExit);
        setTimeout(() => {
            setCurrentIndex(
                prevIndex => (prevIndex + 1) % questionCards.length,
            );
            setAnimation(styles.nextEnter);
        }, 200);
    };

    const prevSlide = () => {
        setAnimation(styles.prevExit);
        setTimeout(() => {
            setCurrentIndex(
                prevIndex =>
                    (prevIndex - 1 + questionCards.length) %
                    questionCards.length,
            );
            setAnimation(styles.prevEnter);
        }, 200);
    };

    const hidePointerEvents: MouseEventHandler<HTMLDivElement> = e => {
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

    return (
        <div className={styles.container}>
            <H2
                text={`Question Card - ${questionCards[currentIndex].informationTitle}`}
                color="white"
            />
            <p>{questionCards[currentIndex].informationDescription}</p>

            <div className={styles.body}>
                <button
                    onClick={prevSlide}
                    disabled={currentIndex === 0}
                >
                    {"<"}
                </button>
                <div className={styles.slideContainerOuter}>
                    <div
                        className={`${styles.slideContainerInner} ${animation}`}
                        onMouseMove={tooltipHook.handleMouseMove}
                        onMouseEnter={overrideCursor}
                        onMouseLeave={() => {
                            tooltipHook.clearTooltipData();
                        }}
                        onMouseDown={hidePointerEvents}
                    >
                        <QuestionCard data={questionCards[currentIndex]} />
                    </div>
                </div>
                <button
                    onClick={nextSlide}
                    disabled={currentIndex === questionCards.length - 1}
                >
                    {">"}
                </button>
                {tooltipHook.tooltipData && (
                    <DynamicTooltip
                        position={tooltipHook.tooltipData.position}
                        content={tooltipHook.tooltipData.text}
                    />
                )}
            </div>
            <div className={styles.footer}>
                <span>
                    {currentIndex + 1} / {questionCards.length}
                </span>
            </div>
        </div>
    );
}
