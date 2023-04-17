import "./AnimatedCloud.scss";

import classNames from "classnames";
import React, { ReactNode } from "react";

export interface AnimatedCloudProps {
    style?: React.CSSProperties;
}

export const AnimatedCloud: React.FC<AnimatedCloudProps> = ({ style }) => {
    const css = classNames({
        AnimatedCloud: true,
    });
    return (
        <div className={css} style={style}>
            <div className="AnimatedCloud__blurWrapper">
                <div className="AnimatedCloud__yellowBlur" />
                <div className="AnimatedCloud__pinkBlur" />
            </div>
        </div>
    );
};
