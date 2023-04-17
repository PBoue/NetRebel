import { debounce } from "lodash-es";
import React, { RefObject, useEffect, useRef } from "react";

function getTargetFromEvent(e: MouseEvent | FocusEvent): HTMLElement | null {
    if (e instanceof MouseEvent) {
        return e.target as HTMLElement;
    }
    return e.relatedTarget as HTMLElement;
}

// Hook
export function useClickOutside<T extends HTMLElement>(
    callback: () => void, // will be called when a click outside occurs.
    ignoreClasses: string[] = [], // if provided, it will check it will ignore click origins that have one of the given classes as a parent.
    enabled = true
): RefObject<T> {
    const callbackRef = useRef<() => void>(),
        ignoreClassesRef = useRef<string[]>([]),
        enabledRef = useRef<boolean>(true),
        domRef = useRef<T>(null);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        enabledRef.current = enabled;
    }, [enabled]);

    useEffect(() => {
        ignoreClassesRef.current = ignoreClasses;
    }, [ignoreClasses]);

    useEffect(() => {
        const handleEvent = debounce((e: MouseEvent | FocusEvent) => {
            if (!enabledRef.current) {
                return;
            }
            const t = getTargetFromEvent(e),
                node = domRef.current;
            if (!t) {
                return;
            }

            if (!t.closest("body")) {
                // check if t is still rendered in the dom.
                // this handles the case where a click causes the origin of the click to
                // no longer be in dom and thus the .contains call may result
                // in a wrong result.
                return;
            }
            if (node && !node.contains(t)) {
                let shouldIgnore = false;
                for (const cssClass of ignoreClassesRef.current) {
                    if (t?.closest(`.${cssClass}`)) {
                        shouldIgnore = true;
                        break;
                    }
                }
                if (!shouldIgnore) {
                    callbackRef.current?.();
                }
            }
        }, 100);
        document.addEventListener("click", handleEvent);
        document.addEventListener("focusout", handleEvent);

        return () => {
            handleEvent.cancel();
            document.removeEventListener("click", handleEvent);
            document.removeEventListener("focusout", handleEvent);
        };
    }, []);
    return domRef;
}
