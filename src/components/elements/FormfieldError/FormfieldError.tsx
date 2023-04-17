import React from "react";
import { ReactNode } from "react";
import "./FormfieldError.scss";

export interface FormFieldErrorProps {
    children?: ReactNode;
}

export const FormFieldError: React.FC<FormFieldErrorProps> = ({ children }) => {
    return <div className="FormFieldError">{children}</div>;
};
