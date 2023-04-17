import { useEffect, useRef } from "react";

// Hook
export function useAnimationFrame(callback: (deltaTime: number) => void) {
    const requestRef = useRef<number>(),
        previousTimeRef = useRef<number>();

    const animate = (time: number) => {
        if (previousTimeRef.current !== undefined) {
            const deltaTime = time - previousTimeRef.current;
            callback(deltaTime);
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current!);
    }, []);
}
