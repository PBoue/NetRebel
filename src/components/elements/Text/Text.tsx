import classNames from "classnames";
import React, { ReactNode } from "react";
import "./Text.scss";
import { TextType } from "./Text.types";

export interface TextProps {
    children?: ReactNode;
    type?: TextType;
    className?: string;
    tag?: string;
    italic?: boolean;
}

export const Text: React.FC<TextProps> = ({
    className,
    type,
    children,
    tag,
    italic,
}) => {
    const css = classNames(
            {
                Text: true,
                [`Text--type--${type}`]: true,
                [`Text--italic`]: italic,
            },
            className
        ),
        CustomTag: any = tag ?? "p";
    return <CustomTag className={css}>{children}</CustomTag>;
};
