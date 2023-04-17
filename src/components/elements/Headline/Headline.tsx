import "./Headline.scss";

import classNames from "classnames";
import React, { ReactNode } from "react";

export enum HeadlineType {
    H1 = "h1",
    H2 = "h2",
    H3 = "h3",
    H4 = "h4",
}

const TagMap: { [key in HeadlineType]?: string } = {};

export interface HeadlineProps {
    className?: string;
    children?: ReactNode;
    type?: HeadlineType;
    htmlTag?: string;
    id?: string;
}

export const Headline: React.FC<HeadlineProps> = ({
    className,
    children,
    type = HeadlineType.H1,
    htmlTag,
    id,
}) => {
    const css = classNames(
            {
                Headline: true,
                [type]: true,
            },
            className
        ),
        HeadlineTag =
            htmlTag && htmlTag !== "" ? htmlTag : TagMap[type] ?? (type as any);

    return (
        <HeadlineTag className={css} id={id}>
            {children}
        </HeadlineTag>
    );
};
