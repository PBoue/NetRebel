import React, { FC, ReactNode } from "react"
import { Headline, HeadlineType } from '@/elements/Headline'
import { Text, TextType } from '@/elements/Text'
import "./Stage.scss"

export interface StageProps {
    headline: string
    text?: string
    image?: string
    href?: string
}

export const Stage: FC<StageProps> = ({
    headline,
    text,
    image,
    href
}) => {
    return (
        <div className="Stage">
            <div className="Stage__container">
                <Headline type={HeadlineType.H1} className="Stage__headline">{headline}</Headline>
                <Text type={TextType.BodySmall} className="Stage__text">{ text }</Text>
            </div>
        </div>
    )
}