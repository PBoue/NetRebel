"use client"

import classNames from "classnames";
import React, { useState } from "react";
import "./BaseRibbon.scss";

export interface BaseRibbonProps {
    topLeft?: number;
    topRight?: number;
    bottomLeft?: number;
    bottomRight?: number;
    pivot?: number;
    bottomPivot?: number;
    baseWidth?: number;
}

let BaseRibbonIdPool = 0;
export const BaseRibbon: React.FC<BaseRibbonProps> = ({
    topLeft = 0.25,
    pivot: pivot = 0.6,
    topRight = 0.2,
    bottomRight = 1,
    bottomLeft = 1,
    baseWidth = 2200,
}) => {
    const [id] = useState(`baseRibbon_${BaseRibbonIdPool++}`),
        css = classNames({
            BaseRibbon: true,
        }),
        topPivotUpperStep = (1 - pivot) / 3,
        topPivotLowerStep = pivot / 3,
        pivotHeight =
            pivot < 0.5 ? bottomLeft - topLeft : bottomRight - topRight,
        path = `
        M 0 ${topLeft} 
        C ${pivot - topPivotLowerStep * 2} ${topLeft} 
          ${pivot - topPivotLowerStep} 0 
          ${pivot} 0 
        C ${pivot + topPivotUpperStep} 0 
          ${pivot + topPivotUpperStep * 2} ${topRight}
          1 ${topRight} 
        L 1 ${bottomRight} 
        C ${pivot + topPivotUpperStep * 2} ${bottomRight} 
          ${pivot + topPivotUpperStep} ${pivotHeight} 
          ${pivot} ${pivotHeight}
        C ${pivot - topPivotLowerStep} ${pivotHeight}
          ${pivot - topPivotLowerStep * 2} ${bottomLeft}
          0 ${bottomLeft}
        Z
        `;
    return (
        <>
            <div className={css}>
                <div
                    className="BaseRibbon__wrapper"
                    style={{ minWidth: `${baseWidth}px` }}
                >
                    <div
                        className="BaseRibbon__left"
                        style={{
                            top: `${topLeft * 100}%`,
                            bottom: `${(1 - bottomLeft) * 100}%`,
                            width: `calc((100% - ${baseWidth}px) / 2 + 1px)`,
                        }}
                    ></div>
                    <div
                        className="BaseRibbon__middle"
                        style={{
                            clipPath: `url(#${id})`,
                            maxWidth: `${baseWidth}px`,
                        }}
                    ></div>

                    <div
                        className="BaseRibbon__right"
                        style={{
                            top: `${topRight * 100}%`,
                            bottom: `${(1 - bottomRight) * 100}%`,
                            width: `calc((100% - ${baseWidth}px) / 2 + 1px)`,
                        }}
                    ></div>
                </div>
            </div>
            <svg>
                <defs>
                    <clipPath id={id} clipPathUnits="objectBoundingBox">
                        <path d={path}></path>
                    </clipPath>
                </defs>
            </svg>
        </>
    );
};
