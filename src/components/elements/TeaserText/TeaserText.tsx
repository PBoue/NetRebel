import classNames from "classnames";
import React, { ReactNode } from "react";
import { TeaserHeadlineSize } from "@/modules/Teaser";
import { Headline, HeadlineType } from "@/elements/Headline";
import { Text, TextType } from "@/elements/Text";
import { TextLink, TextLinkType } from "@/elements/TextLink";
import "./TeaserText.scss";

export interface TeaserTextProps {
    title?: string;
    headline?: string;
    headlineSize?: TeaserHeadlineSize;
    headlineHtmlTag?: string;
    date?: string;
    text?: string;
    inverted?: boolean;
    link?: string | React.ReactNode;
    linkUrl?: string;
    linkTag?: string;
    wrapHeadlineInLink?: boolean;
    withPointer?: boolean;
    onClickLink?: (e: React.MouseEvent) => void;
}

function resolveHeadlineTypeForSize(size: TeaserHeadlineSize): HeadlineType {
    switch (size) {
        case TeaserHeadlineSize.Medium:
            return HeadlineType.H2;
        case TeaserHeadlineSize.Large:
            return HeadlineType.H1;
        case TeaserHeadlineSize.Default:
        default:
            return HeadlineType.H3;
    }
}

export const TeaserText = ({
    title,
    date,
    headline,
    headlineSize = TeaserHeadlineSize.Default,
    headlineHtmlTag = "div",
    text,
    link,
    linkUrl,
    linkTag = "a",
    inverted,
    wrapHeadlineInLink,
    withPointer,
    onClickLink,
}: TeaserTextProps) => {
    const headlineType = resolveHeadlineTypeForSize(headlineSize),
        shouldRenderALinkOnHeadline =
            wrapHeadlineInLink || (!!linkUrl && !link),
        hasClickHandler = !!onClickLink,
        css = classNames({
            TeaserText: true,
            [`TeaserText--headlineSize--${headlineSize}`]: true,
            [`TeaserText--inverted`]: inverted,
            [`TeaserText--withPointer`]: hasClickHandler || withPointer,
        }),
        renderHeadline = (text?: ReactNode) => {
            return (
                <Headline
                    className="TeaserText__headline"
                    type={headlineType}
                    htmlTag={headlineHtmlTag}
                >
                    {text}
                </Headline>
            );
        };

    return (
        <div className={css}>
            {title && (
                <div className="TeaserText__title">
                    <Headline type={HeadlineType.H4} htmlTag="div">
                        {title}
                    </Headline>
                </div>
            )}
            {date && (
                <Text
                    className="TeaserText__date"
                    tag="div"
                    type={TextType.BodySmall}
                >
                    {date}
                </Text>
            )}
            {headline && (
                <>
                    {shouldRenderALinkOnHeadline &&
                        renderHeadline(
                            <TextLink
                                type={TextLinkType.Unstyled}
                                showArrow={true}
                                onClick={onClickLink}
                                href={linkUrl}
                                tag={linkTag}
                            >
                                {headline}
                            </TextLink>
                        )}
                    {!shouldRenderALinkOnHeadline && renderHeadline(headline)}
                </>
            )}
            {text && (
                <Text
                    type={TextType.Body}
                    tag="div"
                    className="TeaserText__text"
                >
                    {text}
                </Text>
            )}
            {link && (
                <div className="TeaserText__link">
                    <TextLink
                        type={TextLinkType.Magenta}
                        href={linkUrl}
                        tag={linkTag}
                        onClick={onClickLink}
                    >
                        {link}
                    </TextLink>
                </div>
            )}
        </div>
    );
};
