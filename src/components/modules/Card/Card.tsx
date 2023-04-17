import "./Card.scss";

import classNames from "classnames";
import React, { ReactNode } from "react";

import { useTheme } from "../../../core/theme.context";
import { Icon, IconName } from "@/elements/Icons/";
import { Text, TextType } from "@/elements/Text";
import { CardSize } from "./Card.types";

export interface CardProps {
    children?: ReactNode;
    headline?: ReactNode;
    subline?: ReactNode;
    noPadding?: boolean;
    noShadow?: boolean;
    highlight?: boolean;
    selected?: boolean;
    highlightText?: string;
    image?: string | ReactNode;
    icon?: IconName;
    size?: CardSize;
    className?: string;
    reserveSpaceForImage?: boolean;
    actionsSlot?: React.ReactNode;
    onClick?: () => void;
    onIconClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
    headline,
    subline,
    noPadding,
    noShadow,
    highlight,
    highlightText,
    selected,
    image,
    icon,
    size = CardSize.Normal,
    className,
    children,
    reserveSpaceForImage = false,
    actionsSlot,
    onClick,
    onIconClick,
}) => {
    const shouldRenderHeader = !!headline || !!subline,
        theme = useTheme(),
        css = classNames(
            {
                Card: true,
                "Card--isClickable": typeof onClick !== "undefined",
                "Card--noPadding": noPadding,
                "Card--noShadow": noShadow,
                "Card--highlight": highlight,
                "Card--selected": selected,
                "Card--reserveSpaceForImage": reserveSpaceForImage,
                [`Card--size-${size}`]: true,
                [`Card--${theme}`]: true,
                [`Card--hasActionsSlotFilled`]: !!actionsSlot,
            },
            className
        );

    return (
        <div className={css} onClick={onClick}>
            <div className="Card__body">
                {highlight && !!highlightText && (
                    <div className="Card__highlightText">{highlightText}</div>
                )}

                {icon && (
                    <div className="Card__icon" onClick={onIconClick}>
                        <Icon name={icon}></Icon>
                    </div>
                )}

                {(!!image || reserveSpaceForImage) && (
                    <div className="Card__image">
                        {typeof image === "string" ? (
                            <img src={image} alt="" />
                        ) : (
                            image
                        )}
                    </div>
                )}

                {shouldRenderHeader && (
                    <div className="Card__header">
                        <Text type={TextType.BodyBold}>{headline}</Text>
                        <Text type={TextType.BodySmall}>{subline}</Text>
                    </div>
                )}

                {!!children && <div className="Card__content">{children}</div>}
            </div>
            {!!actionsSlot && (
                <div className="Card__actions">{actionsSlot}</div>
            )}
        </div>
    );
};
