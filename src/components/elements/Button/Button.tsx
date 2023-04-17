import "./Button.scss";

import classNames from "classnames";
import React, { ReactNode } from "react";

import { Icon, IconName } from "@/elements/Icons";
import { ProgressBar } from "@/elements/ProgressBar";
import { ButtonColor, ButtonSize, ButtonVariant } from "./Button.types";

export interface ButtonProps {
    children?: ReactNode;
    variant?: ButtonVariant;
    icon?: IconName;
    color?: ButtonColor;
    size?: ButtonSize;
    isLoading?: boolean;
}

export const Button: React.FC<
    ButtonProps &
        React.DetailedHTMLProps<
            React.ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
        >
> = ({
    children,
    variant = ButtonVariant.Primary,
    icon,
    color = ButtonColor.Primary,
    size = ButtonSize.Normal,
    disabled,
    isLoading,
    ...restProps
}) => {
    const css = classNames({
        Button: true,
        [`Button--${variant}`]: true,
        [`Button--color--${color}`]: true,
        [`Button--size--${size}`]: true,
        [`Button--disabled`]: disabled,
        [`Button--isLoading`]: isLoading,
    });
    return (
        <button className={css} disabled={disabled || isLoading} {...restProps}>
            {icon && (
                <span className="Button__icon">
                    <Icon name={icon}></Icon>
                </span>
            )}
            {isLoading && (
                <div className="Button__loader">
                    <ProgressBar></ProgressBar>
                </div>
            )}
            <span className="Button__label">{children}</span>
        </button>
    );
};
