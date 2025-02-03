import { useRef, useCallback } from "react";

export function useThrottle<T extends unknown[]>(
    cb: (...args: T) => void,
    delay = 1000
) {
    const shouldWait = useRef(false);
    const waitingArgs = useRef<T | null>(null);

    const timeoutFunc = useCallback(
        function () {
            if (waitingArgs.current === null) {
                shouldWait.current = false;
            } else {
                cb(...waitingArgs.current);
                waitingArgs.current = null;
                setTimeout(timeoutFunc, delay);
            }
        },
        [cb, delay]
    );

    return useCallback(
        function (...args: T) {
            if (shouldWait.current) {
                waitingArgs.current = args;
                return;
            }

            cb(...args);
            shouldWait.current = true;
            setTimeout(timeoutFunc, delay);
        },
        [cb, delay, timeoutFunc]
    );
}
