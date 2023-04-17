"use client"

import React, { ReactNode, useRef } from "react";
import { useAnimationFrame } from "@/hooks/useAnimationFrame";

import "./AnimatedBackground.scss";

export interface AnimatedBackgroundProps {
    children?: ReactNode;
}

function round(value: number) {
    return Math.round((value + Number.EPSILON) * 100) / 100;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
    children,
}) => {
    const domRef = useRef<HTMLDivElement>(null),
        targetRef = useRef<number>(0),
        currentPosRef = useRef<number>(0);
    useAnimationFrame(() => {
        const n = domRef.current;
        if (!n) {
            return;
        }
        if (n.clientHeight < window.innerHeight) {
            return;
        }
        const scrollPos = window.pageYOffset,
            normalizedScroll =
                scrollPos / (n.clientHeight - window.innerHeight),
            weightFactor = Math.min(n.clientHeight / window.innerHeight / 4, 1),
            weightedScroll = normalizedScroll * weightFactor;

        targetRef.current = (window.innerHeight / 3) * weightedScroll;

        currentPosRef.current = round(
            currentPosRef.current +
                (targetRef.current - currentPosRef.current) * 0.05
        );

        n.style.transform = `translateY(${currentPosRef.current}px)`;
    });
    return (
        <div className="AnimatedBackground">
            {children}
            <div className="AnimatedBackground__confetti" ref={domRef}></div>
        </div>
    );
};
