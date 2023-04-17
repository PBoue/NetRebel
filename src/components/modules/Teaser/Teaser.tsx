import classNames from "classnames";
import React, { ReactNode } from "react";
import Image from 'next/image'
import { TeaserHeadlineSize } from "./Teaser.types";
import {
    TeaserText,
    TeaserTextProps,
} from "@/elements/TeaserText";
import "./Teaser.scss";
import {
    TeaserImagePosition,
    TeaserSize,
    TeaserTextPosition,
} from "./Teaser.types";

export interface TeaserProps {
    image?: string | ReactNode;
    imagePosition?: TeaserImagePosition;
    size?: TeaserSize;
    title?: string;
    headline?: string;
    headlineSize?: TeaserHeadlineSize;
    date?: string;
    text?: string;
    link?: string | React.ReactNode;
    linkUrl?: string;
    textPosition?: TeaserTextPosition;
    invertTextColor?: boolean;
    teaserTextProps?: TeaserTextProps;
    withPointer?: boolean;
    onClick?: (e: React.MouseEvent) => void;
}

export const Teaser = ({
    image,
    imagePosition = TeaserImagePosition.Left,
    size = TeaserSize.Default,
    title,
    headline,
    headlineSize = TeaserHeadlineSize.Default,
    text,
    date,
    link,
    linkUrl,
    textPosition = TeaserTextPosition.Center,
    teaserTextProps,
    invertTextColor = false,
    withPointer,
    onClick,
}: TeaserProps) => {

    const shouldWrapInATag = !!linkUrl,
        css = classNames({
            Teaser: true,
            [`Teaser--size--${size}`]: true,
            [`Teaser--imagePosition--${imagePosition}`]: true,
            [`Teaser--textPosition--${textPosition}`]: !!textPosition,
            [`Teaser--textColor--invert`]: invertTextColor,
            [`Teaser--withoutImage`]: !!!image,
            [`Teaser--withPointer`]: withPointer || !!linkUrl || !!onClick,
            [`Teaser--asATag`]: shouldWrapInATag,
        }),
        renderContent = () => {
            return (
                <figure className="Teaser__content">
                    <div className="Teaser__left">
                        <div className="Teaser__image">
                            <Image
                                priority
                                src={image}
                                alt="Teaser Image"
                                width={400}
                                height={300}
                            />
                        </div>
                    </div>
                    <div className="Teaser__right">
                        <figcaption className="Teaser__textWrapper">
                            <div className="Teaser__textContent">
                                <TeaserText
                                    title={title}
                                    date={date}
                                    headline={headline}
                                    headlineSize={headlineSize}
                                    text={text}
                                    link={link}
                                    inverted={invertTextColor}
                                    linkTag="div"
                                    wrapHeadlineInLink={!!linkUrl && !link}
                                    {...teaserTextProps}
                                ></TeaserText>
                            </div>
                        </figcaption>
                    </div>
                </figure>
            );
        };

    return (
        <>
            {shouldWrapInATag && (
                <a className={css} onClick={onClick} href={linkUrl}>
                    {renderContent()}
                </a>
            )}
            {!shouldWrapInATag && (
                <div className={css} onClick={onClick}>
                    {renderContent()}
                </div>
            )}
        </>
    );
};

export default Teaser