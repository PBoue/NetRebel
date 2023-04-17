import React from "react";
import { BaseRibbon } from "./BaseRibbon";
export const CurvedRibbonRight: React.FC = () => {
    return (
        <BaseRibbon
            topLeft={0.25}
            pivot={0.7}
            topRight={0.2}
            bottomRight={1}
            bottomLeft={1}
        ></BaseRibbon>
    );
};
