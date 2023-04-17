import classNames from "classnames"
import React, { ReactNode } from "react"
import { Container, ContainerSize } from "@/elements/Container"
import { Headline, HeadlineType } from "@/elements/Headline"
import { Text, TextType } from '@/elements/Text'
import { SectionType } from "./Section.types"

import "./Section.scss";

export interface SectionProps {
    type?: SectionType
    headline?: string
    subheadline?: string
    children?: ReactNode
    inverted?: boolean
    containerSize?: ContainerSize
    className?: string
    contentClassName?: string
}

export const Section: React.FC<SectionProps> = ({
    type = SectionType.Default,
    headline,
    subheadline,
    inverted,
    containerSize = ContainerSize.Default,
    children,
    className,
    contentClassName,
}) => {
    const css = classNames(
        {
            Section: true,
            [`Section--type-${type}`]: type && type !== SectionType.Default,
            "Section--inverted": inverted,
            "Section--hasHeadline": !!headline,
        },
        className
    );

    return (
        <section className={css}>
            <Container size={containerSize}>

                {headline && (
                    <div className="Section__headline">
                        <Headline type={HeadlineType.H2} htmlTag="h2">
                            {headline}
                        </Headline>
                        <Text className="Section__subheadline" type={TextType.BodySmall}>{ subheadline }</Text>
                    </div>
                )}

                <div className="Section__contentWrapper">
                    <div
                        className={classNames([
                            "Section__content",
                            contentClassName,
                        ])}
                    >
                        {children}
                    </div>
                </div>
            </Container>
        </section>
    );
};