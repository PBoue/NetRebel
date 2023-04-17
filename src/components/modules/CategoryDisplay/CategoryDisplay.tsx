import classNames from "classnames";
import React, { ReactNode } from "react";
import Image from 'next/image'
import { TextLink, TextLinkType } from "@/elements/TextLink";
import "./CategoryDisplay.scss";
import {
    CategoryDisplayColor,
    CategoryDisplayImageAlignment,
    CategoryDisplayType,
} from "./CategoryDisplay.types";

export interface CategoryDisplayProps {
    type?: CategoryDisplayType;
    backgroundColor?: CategoryDisplayColor;
    imageAlignment?: CategoryDisplayImageAlignment;
    image?: ReactNode;
    className?: string;
}

export const CategoryDisplay: React.FC<CategoryDisplayProps> = ({
    type = CategoryDisplayType.Large,
    backgroundColor = CategoryDisplayColor.Grey,
    imageAlignment = CategoryDisplayImageAlignment.Center,
    image,
    className,
}) => {
    const css = classNames({
            CategoryDisplay: true,
            [`CategoryDisplay--${type}`]: true,
            [`CategoryDisplay--${backgroundColor}`]: true,
            [`CategoryDisplay--${imageAlignment}`]: !!imageAlignment,
            className: !!className,
        }),
        textLinkType =
            type == CategoryDisplayType.Large
                ? TextLinkType.Blue
                : TextLinkType.Unstyled,
        text = 'category.name';

    return (
        <div className={css}>
            <div className="CategoryDisplay__imageContainer">
                {!!image ? (
                    image
                ) : (
                    <Image
                        src="/img/Logo,png"
                        alt="Logo"
                        width={200}
                        height={200}
                    />
                )}
                <div className="CategoryDisplay__colorBackground"></div>
            </div>
            {text && (
                <div className="CategoryDisplay__text">
                    <TextLink tag="span" type={textLinkType}>
                        {text}
                    </TextLink>
                </div>
            )}
        </div>
    );
};
