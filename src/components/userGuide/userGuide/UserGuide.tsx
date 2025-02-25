import { MouseEventHandler, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

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

// Duration should be the same amount of time as CSS animation keyframes.
const animationTimeDuration = 200;

export function UserGuide({ questionCards }: IUserGuideProps) {
    const { t } = useTranslation();
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [animation, setAnimation] = useState(styles.nextEnter);
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
        }, animationTimeDuration);
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
        }, animationTimeDuration);
    };

    const hidePointerEvents: MouseEventHandler<HTMLDivElement> = e => {
        e.stopPropagation();
        const target = e.currentTarget;
        target.classList.add(styles.hidePointerEvents);

        if (timerRef.current != null) {
            clearTimeout(timerRef.current);
        }

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
                        <QuestionCard
                            data={questionCards[currentIndex]}
                            isPostedByUser={false}
                            handleDeleteClick={() => {
                                return;
                            }}
                        />
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
                    alt={t("userGuide.previousButtonInfo")}
                    title={t("userGuide.previousButtonInfo")}
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
                    alt={t("userGuide.nextButtonInfo")}
                    title={t("userGuide.nextButtonInfo")}
                />
            </div>
        </div>
    );
}
