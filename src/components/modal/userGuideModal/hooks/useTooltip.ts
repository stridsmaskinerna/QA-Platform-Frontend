import { useEffect, useState } from "react";

import { highlightAttribute, highlights as hl } from "../../../questionCard";
import styelsInfoModalBody from "../userGuide/UserGuide.module.css";
import { useQuestionCards } from "./useQuestionCard";
import { IQuestionWithInformationMeta } from "../types";

export function useTooltip(
    highlightElements: HTMLElement[],
    currentQuestionCard: IQuestionWithInformationMeta,
) {
    const questionCards = useQuestionCards();
    const [tooltipData, setTooltipData] = useState<{
        text: string;
        position: { top: number; left: number };
    } | null>(null);

    const descriptionPublicOrProtected =
        currentQuestionCard.informationDescription ===
        questionCards.protected.informationDescription
            ? currentQuestionCard.informationDescription
            : questionCards.public.informationDescription;

    const descriptionResolvedOrUnresolved =
        currentQuestionCard.informationDescription ===
        questionCards.unresolved.informationDescription
            ? currentQuestionCard.informationDescription
            : questionCards.resolved.informationDescription;

    const keywordDescriptions: Record<string, string> = {
        [hl.userName]: questionCards.author.informationDescription,
        [hl.titleQuestion]: questionCards.title.informationDescription,
        [hl.topicName]: questionCards.topic.informationDescription,
        [hl.subjectTitle]: questionCards.subject.informationDescription,
        [hl.answerCount]: questionCards.answers.informationDescription,
        [hl.creationDate]: questionCards.creationDate.informationDescription,
        [hl.resolvedQuestion]: descriptionResolvedOrUnresolved,
        [hl.publicQuestion]: descriptionPublicOrProtected,
        [hl.tags]: questionCards.tags.informationDescription,
    };

    useEffect(() => {
        const tooltipElement = document.querySelector(`[
            ${highlightAttribute}=${hl.publicQuestionTooltip}]`);

        const origDisplay = (tooltipElement as HTMLElement).style.display;

        (tooltipElement as HTMLElement).style.display = "none";

        return () => {
            (tooltipElement as HTMLElement).style.display = origDisplay;
        };
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const targetElement = e.target as HTMLElement;

        const highlightValue = targetElement.getAttribute(highlightAttribute);

        if (
            highlightElements.find(e => e === targetElement) &&
            highlightValue != null
        ) {
            targetElement.classList.add(styelsInfoModalBody.highlight);
            setTooltipData({
                text: keywordDescriptions[highlightValue],
                position: { top: e.clientY + 10, left: e.clientX + 10 },
            });
        } else {
            clearTooltipData();
        }
    };

    const clearTooltipData = () => {
        setTooltipData(null);
    };

    return {
        tooltipData,
        clearTooltipData,
        handleMouseMove,
    };
}

export type UseTooltipReturnType = ReturnType<typeof useTooltip>;
