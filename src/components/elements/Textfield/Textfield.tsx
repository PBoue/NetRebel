import classNames from "classnames";
import React from "react";
import { BaseInputFieldProps } from "@/modules/Forms";
import "./Textfield.scss";

export interface TextfieldProps extends BaseInputFieldProps {
    inverted?: boolean;
}

export const Textfield: React.FC<
    TextfieldProps &
        React.DetailedHTMLProps<
            React.InputHTMLAttributes<HTMLInputElement>,
            HTMLInputElement
        >
> = (props) => {
    const { type = "text", inverted, error, ...rest } = props,
        css = classNames({
            Textfield: true,
            "Textfield--inverted": inverted,
            "Textfield--error": error,
        });
    return (
        <div className={css}>
            <input className="Textfield__input" type={type} {...rest} />
        </div>
    );
};
