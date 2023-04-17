import "./Formfield.scss";

import classNames from "classnames";
import React, { ReactNode } from "react";

import { FormFieldError } from "@/elements/index";

export interface FormFieldProps {
    label?: ReactNode;
    children?: ReactNode;
    inverted?: boolean;
    errorMessages?: ReactNode;
    useLabelTag?: boolean;
    required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
    label,
    inverted,
    required,
    children,
    errorMessages,
    useLabelTag = true,
}) => {
    const errors = React.Children.toArray(errorMessages).filter((msg) => !!msg),
        hasError = errors.length > 0,
        css = classNames({
            FormField: true,
            "FormField--inverted": inverted,
            "FormField--error": hasError,
            "FormField--required": required,
        }),
        TagToUse = useLabelTag ? "label" : "div";
    return (
        <TagToUse className={css}>
            {!!label && (
                <div className="FormField__label">
                    {label} {required && "*"}
                </div>
            )}
            <div className="FormField__input">
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, {
                            error: hasError,
                        } as Partial<unknown>);
                    }
                    return child;
                })}
            </div>
            {hasError && (
                <div className="FormField__error">
                    {errors.map((errorMessage, i) => {
                        return (
                            <FormFieldError key={i}>
                                {errorMessage}
                            </FormFieldError>
                        );
                    })}
                </div>
            )}
        </TagToUse>
    );
};
