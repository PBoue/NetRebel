import "./ArticleCard.scss";

import React from "react";
import { ReactNode } from "react";

import { Text, TextBadge, TextLink, TextType } from "@/elements/index" 
import { Card } from "@/modules/index"

export interface ArticleCardProps {
    badgeText?: string;
    image?: string | ReactNode;
    headline?: string;
    linkText?: string;
    linkUrl?: string;
    linkComponent?: React.FC<any>;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
    badgeText,
    image,
    headline,
    linkText,
    linkUrl,
    linkComponent,
}) => {
    const renderImage = () => {
            if (typeof image === "string") {
                return <img src={image} alt={"image"} />;
            } else {
                return image;
            }
        },
        Link = linkComponent ?? TextLink;

    return (
        <div className="ArticleCard">
            <div className="ArticleCard__badge">
                {badgeText && <TextBadge>{badgeText}</TextBadge>}
            </div>

            <div className="ArticleCard__image">{renderImage()}</div>

            <Card className="ArticleCard__card" noShadow={true}>
                <div className="ArticleCard__content">
                    <Text
                        className="ArticleCard__text"
                        type={TextType.BodyBig}
                    >
                        {headline}
                    </Text>

                    <div className="ArticleCard__textLink">
                        <Link href={linkUrl}>{linkText}</Link>
                    </div>
                </div>
            </Card>
        </div>
    );
};
