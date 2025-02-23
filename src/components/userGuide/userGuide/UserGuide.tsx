import { MouseEventHandler, useRef, useState } from "react";

import { QuestionCard } from "../../questionCard";
import { DynamicTooltip } from "../dynamicTooltip";
import { H2 } from "../../text";
import { IQuestionWithInformationMeta } from "../types";
import { useHighlightEffect, useTooltip } from "../hooks";
import nextSlideIcon from "../../../assets/icons/arrow_right_white.svg";
import prevSlideIcon from "../../../assets/icons/arrow_left_white.svg";
import styles from "./UserGuide.module.css";

interface IUserGuideProps {
    questionCards: IQuestionWithInformationMeta[];
}

export function UserGuide({ questionCards }: IUserGuideProps) {
    const [animation, setAnimation] = useState(styles.nextEnter);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { highlightElements } = useHighlightEffect(
        currentIndex,
        questionCards,
    );
    const tooltipHook = useTooltip(
        highlightElements,
        questionCards[currentIndex],
    );

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
        e.currentTarget.style.cursor = "pointer";
    };

    return (
        <div className={styles.container}>
            <H2
                text={`${questionCards[currentIndex].informationTitle}`}
                color="white"
            />
            <p>{questionCards[currentIndex].informationDescription}</p>

            <div className={styles.body}>
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
                {tooltipHook.tooltipData && (
                    <DynamicTooltip
                        position={tooltipHook.tooltipData.position}
                        content={tooltipHook.tooltipData.text}
                    />
                )}
            </div>
            <div className={styles.footer}>
                <img
                    className={styles.navigationBtn}
                    onClick={() => {
                        prevSlide();
                    }}
                    src={prevSlideIcon}
                    alt={""}
                    title={""}
                />
                <H2
                    color="white"
                    text={`${currentIndex + 1} / ${questionCards.length}`}
                />
                <img
                    className={styles.navigationBtn}
                    onClick={() => {
                        nextSlide();
                    }}
                    src={nextSlideIcon}
                    alt={""}
                    title={""}
                />
            </div>
        </div>
    );
}
