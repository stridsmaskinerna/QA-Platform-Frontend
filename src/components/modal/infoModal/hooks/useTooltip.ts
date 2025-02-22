import { useEffect, useState } from "react";

import { questionCards } from "../data";
import { highlightAttribute, highlights } from "../../../questionCard";
import styelsInfoModalBody from "../infoModalBody/InfoModalBody.module.css";

export function useTooltip(currentIndex: number) {
    const [highlightElements, setHighlightElements] = useState<(HTMLElement)[]>([]);
    const [tooltipData, setTooltipData] = useState<{
        text: string;
        position: { top: number; left: number };
    } | null>(null);

    const keywordDescriptions: Record<string, string> = {
        [highlights.userName]: "The person who created this question.",
        [highlights.titleQuestion]: "The main title of the question.",
        [highlights.topicName]: "The topic this question belongs to.",
        [questionCards[0].subjectName]:
            "The subject name and code associated with this question.",
        [highlights.subjectTitle]:
            "The subject name and code associated with this question.",
        [highlights.answerCount]: "The number of answers.",
        [highlights.creationDate]: "How long time ago the question was asked.",
        [highlights.resolvedQuestion]:
            "If the author of the question have accepted an anwsers.",
        [highlights.publicQuestion]:
            "The question can only be viewwd by authenticated users.",
        [highlights.tags]:
            "Tags used to mark the question."
    };

    useEffect(() => {
        highlightElements.forEach(e => e.classList.remove(
            styelsInfoModalBody.highlightDefault
        ))
        const defaultHiglightElement = document.querySelector(
            `[${highlightAttribute}=${questionCards[currentIndex].defaultMarker}]`);
        (defaultHiglightElement as HTMLElement).classList.add(
            styelsInfoModalBody.highlightDefault
        );
        
    }, [currentIndex, highlightElements])

    useEffect(() => {
        const highlightElements: (HTMLElement | null)[] = [
            document.querySelector(`[${highlightAttribute}=${highlights.subjectTitle}]`),
            document.querySelector(`[${highlightAttribute}=${highlights.resolvedQuestion}]`),
            document.querySelector(`[${highlightAttribute}=${highlights.publicQuestion}]`),
            document.querySelector(`[${highlightAttribute}=${highlights.publicQuestionTooltip}]`),
            document.querySelector(`[${highlightAttribute}=${highlights.topicName}]`),
            document.querySelector(`[${highlightAttribute}=${highlights.creationDate}]`),
            document.querySelector(`[${highlightAttribute}=${highlights.titleQuestion}]`),
            document.querySelector(`[${highlightAttribute}=${highlights.userName}]`),
            document.querySelector(`[${highlightAttribute}=${highlights.answerCount}]`),
            document.querySelector(`[${highlightAttribute}=${highlights.tags}]`),
        ];

        const highlightElementsChecked = highlightElements.filter(e => e != null);

        setHighlightElements(highlightElementsChecked);
    }, []);

    useEffect(() => {
        const tooltipElement = document.querySelector(`[
            ${highlightAttribute}=${highlights.publicQuestionTooltip}]`);

        const origDisplay = (tooltipElement as HTMLElement).style.display;

        (tooltipElement as HTMLElement).style.display = "none";

        return () => {
            (tooltipElement as HTMLElement).style.display = origDisplay
        };
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const targetElement = e.target as HTMLElement;
        e.stopPropagation();

        const highlightValue = targetElement.getAttribute(highlightAttribute);

        if (highlightElements.find(e => e === targetElement) &&
            highlightValue != null) {
            targetElement.classList.add(styelsInfoModalBody.highlight);
            setTooltipData({
                text: keywordDescriptions[highlightValue],
                position: { top: e.clientY + 10, left: e.clientX + 10 },
            });
        }
        else {
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
