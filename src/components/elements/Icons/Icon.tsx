import React from "react";
import { IconContents, IconName } from "./IconNames.generated";
import "./Icon.scss";
export interface IconProps {
    name: IconName;
}

export const Icon: React.FC<IconProps> = ({ name }) => {
    const svg = IconContents[name];
    if (!svg) {
        return null;
    }
    return (
        <span className="Icon" dangerouslySetInnerHTML={{ __html: svg }}></span>
    );
};
