import classNames from "classnames";
import React from "react";
import "./ProgressBar.scss";

export interface ProgressBarProps {
    progress?: number;
    showAmount?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    showAmount,
}) => {
    const isEndless = progress === undefined,
        normalized = Math.round(Math.min(Math.max(0, progress || 0), 100)),
        css = classNames({
            ProgressBar: true,
            "ProgressBar--endless": isEndless,
            "ProgressBar--showAmount": showAmount,
            "ProgressBar--hasValue": normalized > 0,
        });
    return (
        <div className={css}>
            <div
                className="ProgressBar__track"
                style={{ width: `${isEndless ? "100" : normalized}%` }}
            ></div>
            {!isEndless && showAmount && (
                <span className="ProgressBar__amount">{normalized}</span>
            )}
        </div>
    );
};
