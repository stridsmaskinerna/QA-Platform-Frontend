import { ArrowScrollBtn, FilterButton } from ".";
import { ISearchFilter } from "../../../../utils";
import styles from "./SearchFilter.module.css";
import { useEffect, useRef, useState } from "react";
import { useThrottle } from "../../../../hooks";
import { useIsMounted, useResizeObserver } from "usehooks-ts";

interface IShowScrollArrows {
    leftArrow: boolean;
    rightArrow: boolean;
}

const LEFT_SCROLL_ARROW_THRESHOLD = 3;
const RIGHT_SCROLL_ARROW_THRESHOLD = 3;
const THROTTLE_TIMER = 300;
const CLICK_SCROLL_AMOUNT = 300;

export function SearchFilter({
    displayedFilters,
    onFilterClick,
    activeFilter,
    title,
}: ISearchFilter) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showScrollArrows, setShowScrollArrows] = useState<IShowScrollArrows>(
        {
            leftArrow: false,
            rightArrow: false,
        },
    );
    const throttledHandleScroll = useThrottle(handleScroll, THROTTLE_TIMER);
    const throttledHandleContainerResize = useThrottle(
        handleContainerResize,
        THROTTLE_TIMER,
    );
    useResizeObserver({
        ref: scrollRef,
        box: "border-box",
        onResize: throttledHandleContainerResize,
    });
    const isMounted = useIsMounted();

    const handleScrollArrowClick = (scrollAmount: number) =>
        scrollRef.current?.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
        });

    //If called with a wheel event (i.e the user uses the mousewheel)
    const handleMouseWheelEvent = (event?: WheelEvent) => {
        if (event && scrollRef.current) {
            event.preventDefault();
            scrollRef.current.scrollLeft += event.deltaY;
            throttledHandleScroll();
        }
    };
    function handleScroll() {
        //The amount of width that is scrollabe
        const scrollOverflowWidth =
            (wrapperRef.current?.offsetWidth ?? 0) -
            ((scrollRef.current?.offsetWidth ?? 0) +
                (scrollRef.current?.scrollLeft ?? 0));

        const scrollPosition = scrollRef.current?.scrollLeft ?? 0;

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
                scrollOverflowWidth > RIGHT_SCROLL_ARROW_THRESHOLD &&
                !prev.rightArrow
            ) {
                return { ...prev, rightArrow: true };
            }
            if (
                scrollOverflowWidth < RIGHT_SCROLL_ARROW_THRESHOLD &&
                prev.rightArrow
            ) {
                return { ...prev, rightArrow: false };
            }
            return prev; // Return previous state if no changes
        });
    }

    function handleContainerResize() {
        //We scroll to beginning on resize to prevent handleScroll from firing when user has scrolled a bit
        //and the resizes the window.
        scrollRef.current?.scrollTo({ left: 0 });

        //The amount of width that is scrollabe
        const scrollOverflowWidth =
            (wrapperRef.current?.offsetWidth ?? 0) -
            ((scrollRef.current?.offsetWidth ?? 0) +
                (scrollRef.current?.scrollLeft ?? 0));

        setShowScrollArrows(prev => {
            if (scrollOverflowWidth < RIGHT_SCROLL_ARROW_THRESHOLD) {
                return { leftArrow: false, rightArrow: false };
            }
            if (scrollOverflowWidth > RIGHT_SCROLL_ARROW_THRESHOLD) {
                return { leftArrow: false, rightArrow: true };
            }
            return prev;
        });
    }

    useEffect(() => {
        const scrollElement = scrollRef.current;

        if (scrollElement) {
            //Use throttle to prevent setting state too often
            scrollElement.addEventListener("scroll", throttledHandleScroll);
            //Not use throttle directly since the scrolling becomes choppy then.
            //Instead call throttledHandleScroll in handleMouseWheelEvent,
            //after the wheel even have been mapped to scrolling
            scrollElement.addEventListener("wheel", handleMouseWheelEvent, {
                passive: false,
            });
        }

        return () => {
            scrollElement?.removeEventListener("scroll", throttledHandleScroll);
            scrollElement?.removeEventListener("wheel", handleMouseWheelEvent);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        //The amount of width that is scrollabe
        const scrollOverflowWidth =
            (wrapperRef.current?.offsetWidth ?? 0) -
            ((scrollRef.current?.offsetWidth ?? 0) +
                (scrollRef.current?.scrollLeft ?? 0));
        if (wrapperRef.current && scrollRef.current) {
            setShowScrollArrows({
                leftArrow: false,
                //Initialize right arrow depending on whether there is filterbuttons hidden behind scroll
                rightArrow: scrollOverflowWidth > RIGHT_SCROLL_ARROW_THRESHOLD,
            });
        }
    }, [isMounted]);

    return (
        <div className={styles.container}>
            <ArrowScrollBtn
                onClick={() => handleScrollArrowClick(-CLICK_SCROLL_AMOUNT)}
                show={showScrollArrows.leftArrow}
                pointingDirection="left"
            />
            <div
                ref={scrollRef}
                className={styles.scrollContainer}
            >
                <div
                    ref={wrapperRef}
                    className={styles.filtersWrapper}
                >
                    <p className={styles.title}>{title}</p>
                    {displayedFilters?.map(f => (
                        <FilterButton
                            isActive={activeFilter === f.id}
                            title={f.title}
                            onClick={() => onFilterClick(f.id)}
                            key={f.id}
                        />
                    ))}
                </div>
            </div>
            <ArrowScrollBtn
                onClick={() => handleScrollArrowClick(CLICK_SCROLL_AMOUNT)}
                show={showScrollArrows.rightArrow}
                pointingDirection="right"
            />
        </div>
    );
}
