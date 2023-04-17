import classNames from "classnames";
import React, { ReactNode, useContext, useEffect, useState } from "react";
export enum Theme {
    Light = "light",
    Dark = "dark",
}

export interface ThemeApi {
    theme: Theme;
}

const InitialContext: ThemeApi = {
    theme: Theme.Light,
};

export const ThemeContext = React.createContext<ThemeApi>(InitialContext);

export interface ThemeProviderProps {
    theme: Theme;
    children?: React.ReactNode | ((themeApi: ThemeApi) => ReactNode);
}
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
    children,
    theme,
}) => {
    const [value, setValue] = useState({ theme }),
        css = classNames({
            ThemeContext: true,
            [`ThemeContext--${theme}`]: true,
        }),
        isRenderFunction = typeof children === "function";

    useEffect(() => {
        setValue({ theme });
    }, [theme]);
    return (
        <ThemeContext.Provider value={value}>
            {isRenderFunction ? children(value) : children}
        </ThemeContext.Provider>
    );
};

/**
 * Returns true if the current theme value matches the dark mode.
 * However if invertedProps are given (not undefined) it will return that value
 * regardless of the theme.
 * @param invertedFromProps
 * @returns
 */
export function useIsInverted(
    invertedFromProps?: boolean | undefined
): boolean {
    const themeApi = useContext(ThemeContext);
    if (typeof invertedFromProps !== "undefined") {
        return invertedFromProps;
    }

    return themeApi.theme === Theme.Dark;
}

export function useTheme(): Theme {
    const themeApi = useContext(ThemeContext);

    return themeApi.theme;
}
