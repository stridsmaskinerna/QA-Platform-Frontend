import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import { questionCards } from "../data";
import stylesQuestionHeader from "../../../questionCard/questionCardHeader/QuestionHeader.module.css";
import styelsInfoModalBody from "../infoModalBody/InfoModalBody.module.css";

export function useTooltip() {
    const { t } = useTranslation();
    const [tooltipData, setTooltipData] = useState<{
        text: string;
        position: { top: number; left: number };
    } | null>(null);

    const keywordDescriptions: Record<string, string> = {
        [questionCards[0].userName]: "The person who created this question.",
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

    useEffect(() => {
        const tooltipElements = document.querySelectorAll(
            `.${stylesQuestionHeader.tooltip}`,
        );
        const originalDisplays = new Map<Element, string>();

        tooltipElements.forEach(el => {
            const element = el as HTMLElement;
            originalDisplays.set(element, element.style.display);
            element.style.display = "none";
        });

        return () => {
            tooltipElements.forEach(el => {
                const element = el as HTMLElement;
                if (originalDisplays.has(element)) {
                    element.style.display = originalDisplays.get(element) ?? "";
                }
            });
        };
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const targetElement = e.target as HTMLElement;
        e.stopPropagation();

        const matchedKey = Object.keys(keywordDescriptions).find(key =>
            targetElement.textContent?.includes(key),
        );

        const tooltipElements = targetElement.querySelectorAll(
            `.${stylesQuestionHeader.tooltip}`,
        );

        const iconElement = document.querySelector(
            `img.${stylesQuestionHeader.icon}[alt=""]`,
        );

        if (
            matchedKey &&
            (targetElement instanceof HTMLParagraphElement ||
                targetElement instanceof HTMLHeadingElement ||
                targetElement instanceof HTMLSpanElement)
        ) {
            targetElement.classList.add(styelsInfoModalBody.highlight);
            setTooltipData({
                text: keywordDescriptions[matchedKey],
                position: { top: e.clientY + 10, left: e.clientX + 10 },
            });
        } else if (iconElement != null) {
            // targetElement.classList.add(styelsInfoModalBody.highlight);
            // setTooltipData({
            //     text: "Decide if question should be protected or public.",
            //     position: { top: e.clientY + 10, left: e.clientX + 10 },
            // });
            // tooltipElements.forEach(e => {
            //     console.log(e)
            //     e.classList.add(styelsInfoModalBody.highlight);
            // });
            // setTooltipData({
            //     text: "Decide if question should be protected or public.",
            //     position: { top: e.clientY + 10, left: e.clientX + 10 },
            // });
        } else {
            setTooltipData(null);
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
