import classNames from "classnames";
import React from "react";
import { BaseInputFieldProps } from "@/modules/Forms"
import "./Checkbox.scss";

export interface CheckboxProps extends BaseInputFieldProps {
    label?: string;
    name?: string;
    disabled?: boolean;
    checked?: boolean;
    children?: React.ReactNode;
    inverted?: boolean;
}

export const Checkbox = ({
    label,
    name,
    disabled,
    checked,
    error,
    inverted,
    children,
    ...props
}: CheckboxProps &
    React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >) => {
    const css = classNames({
        Checkbox: true,
        "Checkbox--disabled": disabled,
        "Checkbox--error": error,
        "Checkbox--inverted": inverted,
    });

    return (
        <label className={css}>
            <input
                className="Checkbox__input"
                type="checkbox"
                name={name}
                defaultChecked={checked}
                disabled={disabled}
                {...props}
            />
            <span className="Checkbox__label">{label || children}</span>
        </label>
    );
};
