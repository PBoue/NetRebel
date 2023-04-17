import classNames from "classnames";
import React, { ReactNode } from "react";
import { Text, TextType } from "@/elements/Text";
import "./TextBadge.scss";
import { TextBadgeColor } from "./TextBadge.types";

export interface TextBadgeProps {
    children?: ReactNode;
    color?: TextBadgeColor;
}

export const TextBadge: React.FC<TextBadgeProps> = ({
    children,
    color = TextBadgeColor.Violin,
}) => {
    const css = classNames({
        TextBadge: true,
        [`TextBadge--color-${color}`]: true,
    });
    return (
        <Text type={TextType.BodySmallBold} className={css}>
            {children}
        </Text>
    );
};
