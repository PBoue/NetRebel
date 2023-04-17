import classNames from "classnames";
import React from "react";
import { BaseInputFieldProps } from "@/forms/_base/BaseInputFieldProps.interface";
import "./Textarea.scss";

export interface TextareaProps extends BaseInputFieldProps {
    name?: string;
    inverted?: boolean;
}

export const Textarea: React.FC<
    TextareaProps &
        React.DetailedHTMLProps<
            React.TextareaHTMLAttributes<HTMLTextAreaElement>,
            HTMLTextAreaElement
        >
> = (props) => {
    const { name, inverted, error, ...rest } = props,
        css = classNames({
            Textarea: true,
            "Textarea--inverted": inverted,
            "Textarea--error": error,
        });
    return (
        <div className={css}>
            <textarea
                name={name}
                className="Textarea__input"
                {...rest}
            ></textarea>
        </div>
    );
};
