import { useEffect, useState } from "react";

import { highlightAttribute, highlights as hl } from "../../../questionCard";
import styelsInfoModalBody from "../infoModalBody/InfoModalBody.module.css";
import { useQuestionCards } from "./useQuestionCard";

export function useTooltip(highlightElements: HTMLElement[]) {
    const cards = useQuestionCards();
    const [tooltipData, setTooltipData] = useState<{
        text: string;
        position: { top: number; left: number };
    } | null>(null);

    // TODO! Update to mark unresolved and protected correctly
    // Maybe neeed a third meta filed called tooltipDescription.
    const keywordDescriptions: Record<string, string> = {
        [hl.userName]: cards.questionCardAuthor.informationDescription,
        [hl.titleQuestion]: cards.questionCardTitle.informationDescription,
        [hl.topicName]: cards.questionCardTopic.informationDescription,
        [hl.subjectTitle]: cards.questionCardSubject.informationDescription,
        [hl.answerCount]: cards.questionCardAnswers.informationDescription,
        [hl.creationDate]: cards.questionCardDate.informationDescription,
        [hl.resolvedQuestion]:
            cards.questionCardResolved.informationDescription,
        [hl.publicQuestion]: cards.questionCardPublic.informationDescription,
        [hl.tags]: cards.questionCardTags.informationDescription,
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
        e.stopPropagation();

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
