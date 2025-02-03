import { FilterButton } from ".";
import { ISearchFilter } from "../../../../utils";
import styles from "./SearchFilter.module.css";
import { useEffect, useRef, useState } from "react";
import { useThrottle } from "../../../../hooks";
import { useResizeObserver } from "usehooks-ts";
import arrowRight from "../../../../assets/icons/arrow_right.svg";

interface IShowScrollArrows {
    leftArrow: boolean;
    rightArrow: boolean;
}

const LEFT_SCROLL_ARROW_THRESHOLD = 10;
const RIGHT_SCROLL_ARROW_THRESHOLD = 10;
const THROTTLE_TIMER = 300;
const CLICK_SCROLL_AMOUNT = 300;

export function SearchFilter({
    displayedFilters,
    onFilterClick,
    activeFilter,
    title
}: ISearchFilter) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [showScrollArrows, setShowScrollArrows] = useState<IShowScrollArrows>(
        {
            leftArrow: false,
            rightArrow: false
        }
    );
    const throttledHandleScroll = useThrottle(handleScroll, THROTTLE_TIMER);
    const throttledHandleContainerResize = useThrottle(
        handleContainerResize,
        THROTTLE_TIMER
    );
    useResizeObserver({
        ref: containerRef,
        box: "border-box",
        onResize: throttledHandleContainerResize
    });

    const handleScrollArrowClick = (scrollAmount: number) =>
        containerRef.current?.scrollBy({
            left: scrollAmount,
            behavior: "smooth"
        });

    function handleScroll(event?: WheelEvent) {
        //If called with a wheel event (i.e the user uses the mousewheel)
        if (event && containerRef.current) {
            event.preventDefault();
            containerRef.current.scrollLeft += event.deltaY;
        }

        const scrollPosition = containerRef.current?.scrollLeft ?? 0;
        //Cirka the amount of width that is scrollabe
        const scrollOverflowWidth =
            (containerRef.current?.scrollWidth ?? 0) -
            (containerRef.current?.offsetWidth ?? 0);
        setShowScrollArrows(prev => {
            // If scrolled past the threshold and left arrow is not shown, enable it
            if (
                scrollPosition > LEFT_SCROLL_ARROW_THRESHOLD &&
                !prev.leftArrow
            ) {
                return { ...prev, leftArrow: true };
            }
            // If scrolled less than the threshold and left arrow is shown, hide it
            if (
                scrollPosition < LEFT_SCROLL_ARROW_THRESHOLD &&
                prev.leftArrow
            ) {
                return { ...prev, leftArrow: false };
            }
            //Same for right arrow...
            if (
                scrollOverflowWidth - scrollPosition >
                    RIGHT_SCROLL_ARROW_THRESHOLD &&
                !prev.rightArrow
            ) {
                return { ...prev, rightArrow: true };
            }
            if (
                scrollOverflowWidth - scrollPosition <
                    RIGHT_SCROLL_ARROW_THRESHOLD &&
                prev.rightArrow
            ) {
                return { ...prev, rightArrow: false };
            }
            return prev; // Return previous state if no changes
        });
    }

    function handleContainerResize({
        width: containerWidth
    }: {
        width: number | undefined;
    }) {
        //We scroll to beginning on resize to prevent handleScroll from firing when user has scrolled a bit
        //and the resizes the window.
        containerRef.current?.scrollTo({ left: 0 });
        setShowScrollArrows(prev => {
            //If one arrow is shown and the container is wider than the wrapper there is nothing to scroll
            //and we hide the scroll arrows
            if (
                (prev.rightArrow || prev.leftArrow) &&
                (containerWidth ?? 0) >= (wrapperRef.current?.offsetWidth ?? 0)
            ) {
                return { leftArrow: false, rightArrow: false };
            }
            // If container width is smaller than the wrapper width there is scrollable content and we show the right
            //arrow which will be correct since we reset the scroll in the beginning of this function.
            if (
                !prev.rightArrow &&
                (containerWidth ?? 0) < (wrapperRef.current?.offsetWidth ?? 0)
            ) {
                return { leftArrow: false, rightArrow: true };
            }
            return prev;
        });
    }

    useEffect(() => {
        const containerElement = containerRef.current;

        if (containerElement) {
            //Use throttle to prevent setting state too often
            containerElement.addEventListener("scroll", () =>
                throttledHandleScroll()
            );
            containerElement.addEventListener("wheel", e => handleScroll(e), {
                passive: false
            });
            setShowScrollArrows({
                leftArrow: false,
                //Initialize right arrow depending on whether there is filterbuttons hidden behind scroll
                rightArrow:
                    containerElement.scrollWidth -
                        containerElement.offsetWidth >
                    RIGHT_SCROLL_ARROW_THRESHOLD
            });
        }

        return () => {
            containerElement?.removeEventListener("scroll", () =>
                throttledHandleScroll()
            );
            containerElement?.removeEventListener("wheel", e =>
                handleScroll(e)
            );
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            ref={containerRef}
            className={styles.container}
        >
            <div
                ref={wrapperRef}
                className={styles.filtersWrapper}
            >
                <button
                    className={`${styles.arrowContainer} ${showScrollArrows.leftArrow ? styles.show : ""}`}
                    onClick={() => handleScrollArrowClick(-CLICK_SCROLL_AMOUNT)}
                >
                    <img
                        className={styles.flip}
                        src={arrowRight}
                    />
                </button>

                <p className={styles.title}>{title}</p>
                {displayedFilters?.map(f => (
                    <FilterButton
                        isActive={activeFilter === f.id}
                        title={f.title}
                        onClick={() => onFilterClick(f.id)}
                        key={f.id}
                    />
                ))}

                <button
                    className={`${styles.arrowContainer}  ${showScrollArrows.rightArrow ? styles.show : ""}`}
                    onClick={() => handleScrollArrowClick(CLICK_SCROLL_AMOUNT)}
                >
                    <img src={arrowRight} />
                </button>
            </div>
        </div>
    );
}
