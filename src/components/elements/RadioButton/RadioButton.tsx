import classNames from "classnames";
import React from "react";
import { BaseInputFieldProps } from "@/forms/_base/BaseInputFieldProps.interface";
import "./RadioButton.scss";

export interface RadioButtonProps extends BaseInputFieldProps {
    label?: string;
    children?: React.ReactNode;
}

export const RadioButton: React.FC<
    RadioButtonProps &
        React.DetailedHTMLProps<
            React.InputHTMLAttributes<HTMLInputElement>,
            HTMLInputElement
        >
> = ({ label, name, disabled, checked, error, children, ...props }) => {
    const css = classNames({
        RadioButton: true,
        "RadioButton--disabled": disabled,
        "RadioButton--error": error,
    });

    return (
        <label className={css}>
            <input
                className="RadioButton__input"
                type="radio"
                name={name}
                defaultChecked={checked}
                disabled={disabled}
                {...props}
            />
            <span className="RadioButton__label">{label || children}</span>
        </label>
    );
};
