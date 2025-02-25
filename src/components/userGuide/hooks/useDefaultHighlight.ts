import { useEffect, useState } from "react";

import { highlightAttribute, highlights } from "../../questionCard";
import { IQuestionWithInformationMeta } from "../types";
import styelsInfoModalBody from "../userGuide/UserGuide.module.css";

export function useHighlightEffect(
    currentIndex: number,
    questionCards: IQuestionWithInformationMeta[],
) {
    const [highlightElements, setHighlightElements] = useState<HTMLElement[]>(
        [],
    );

    useEffect(() => {
        highlightElements.forEach(e => {
            e.classList.remove(styelsInfoModalBody.highlightDefault);
            e.classList.remove(styelsInfoModalBody.highlightDefaultImage);
        });

        const defaultHiglightElement = document.querySelector(
            `[${highlightAttribute}=${questionCards[currentIndex].defaultMarker}]`,
        );

        if (defaultHiglightElement instanceof HTMLImageElement) {
            (defaultHiglightElement as HTMLElement).classList.add(
                styelsInfoModalBody.highlightDefaultImage,
            );
        } else {
            (defaultHiglightElement as HTMLElement).classList.add(
                styelsInfoModalBody.highlightDefault,
            );
        }
    }, [currentIndex, highlightElements, questionCards]);

    useEffect(() => {
        const highlightElements: (HTMLElement | null)[] = [
            document.querySelector(
                `[${highlightAttribute}=${highlights.subjectTitle}]`,
            ),
            document.querySelector(
                `[${highlightAttribute}=${highlights.resolvedQuestion}]`,
            ),
            document.querySelector(
                `[${highlightAttribute}=${highlights.publicQuestion}]`,
            ),
            document.querySelector(
                `[${highlightAttribute}=${highlights.publicQuestionTooltip}]`,
            ),
            document.querySelector(
                `[${highlightAttribute}=${highlights.topicName}]`,
            ),
            document.querySelector(
                `[${highlightAttribute}=${highlights.creationDate}]`,
            ),
            document.querySelector(
                `[${highlightAttribute}=${highlights.titleQuestion}]`,
            ),
            document.querySelector(
                `[${highlightAttribute}=${highlights.userName}]`,
            ),
            document.querySelector(
                `[${highlightAttribute}=${highlights.answerCount}]`,
            ),
            document.querySelector(
                `[${highlightAttribute}=${highlights.tags}]`,
            ),
        ];

        const highlightElementsChecked = highlightElements.filter(
            e => e != null,
        );

        setHighlightElements(highlightElementsChecked);
    }, []);

    return {
        highlightElements,
    };
}

export type UseHighlightEffectReturnType = ReturnType<
    typeof useHighlightEffect
>;
