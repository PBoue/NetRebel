import React from "react";
import { BaseRibbon, BaseRibbonProps } from "./BaseRibbon";
export const FlatRibbonRight: React.FC<BaseRibbonProps> = ({ ...props }) => {
    return (
        <BaseRibbon
            topLeft={0.0}
            bottomLeft={0.9}
            topRight={0.05}
            bottomRight={0.95}
            pivot={0.6}
            {...props}
        ></BaseRibbon>
    );
};
