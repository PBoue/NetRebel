import classNames from "classnames";
import React, { ReactNode } from "react";
import "./TextLink.scss";
import { TextLinkType } from "./TextLink.types";

export interface TextLinkProps {
    type?: TextLinkType;
    tag?: string;
    children?: ReactNode;
    showArrow?: boolean;
}

export const TextLink: React.FC<
    TextLinkProps &
        React.DetailedHTMLProps<
            React.AnchorHTMLAttributes<HTMLAnchorElement>,
            HTMLAnchorElement
        >
> = ({
    showArrow = true,
    type = TextLinkType.Magenta,
    children,
    tag,
    ...rest
}) => {
    const css = classNames({
            TextLink: true,
            [`TextLink--type-${type}`]: true,
            [`TextLink--withArrow`]: showArrow,
        }),
        CustomTag: any = !!tag ? tag : "a";

    return (
        <CustomTag {...rest} className={css}>
            <span className="TextLink__text">{children}</span>
            {showArrow && (
                <span className="TextLink__arrow">
                    <svg
                        width="20"
                        height="10"
                        viewBox="0 0 20 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M16.17 6L13.59 8.59L15 10L20 5L15 0L13.59 1.41L16.17 4H0V6H16.17Z"
                            fill="#FF1DC0"
                        />
                    </svg>
                </span>
            )}
        </CustomTag>
    );
};
