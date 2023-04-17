import React from "react";
import { BaseRibbon, BaseRibbonProps } from "./BaseRibbon";
export const FlatRibbonLeft: React.FC<BaseRibbonProps> = ({ ...props }) => {
    return (
        <BaseRibbon
            topLeft={0.05}
            topRight={0}
            bottomRight={0.9}
            bottomLeft={0.95}
            pivot={0.4}
            {...props}
        ></BaseRibbon>
    );
};
