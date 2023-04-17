import classNames from "classnames";
import React, { ReactNode } from "react";
import { ContainerSize } from "./Container.types";

import "./Container.scss";

export interface ContainerProps {
    size: ContainerSize;
    children?: ReactNode;
    className?: string;
}

export const Container: React.FC<ContainerProps> = ({
    size = ContainerSize.Default,
    children,
    className,
}) => {
    const css = classNames(
        {
            Container: true,
            [`Container--size--${size}`]: true,
        },
        className
    );
    return <div className={css}>{children}</div>;
};
