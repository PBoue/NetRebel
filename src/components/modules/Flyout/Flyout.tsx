import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { ReactNode } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { CSSTransition } from "react-transition-group";
import "./Flyout.scss";

export interface FlyoutProps {
    open?: boolean;
    noPadding?: boolean;
    fullWidth?: boolean;
    closeOnClickOutside?: boolean;
    children?: ReactNode;
    clickOutsideIgnoreClasses?: string[];
    onChangeOpen?: (open: boolean) => void;
}

export const Flyout: React.FC<FlyoutProps> = ({
    open = false,
    noPadding = false,
    fullWidth = false,
    closeOnClickOutside = true,
    onChangeOpen,
    children,
    clickOutsideIgnoreClasses = [],
}) => {
    const [isOpen, setIsOpen] = useState(open),
        [clickOutsideEnabled, setClickOutsideEnabled] = useState(open),
        handleOnClickOutside = () => {
            closeOnClickOutside && updateOpen(false, true);
        },
        updateOpen = (open: boolean, triggerEvent = true) => {
            setIsOpen(open);
            triggerEvent && onChangeOpen?.(open);
        },
        domRef = useClickOutside<HTMLDivElement>(
            handleOnClickOutside,
            clickOutsideIgnoreClasses,
            clickOutsideEnabled
        ),
        css = classNames({
            Flyout: true,
            "Flyout--open": isOpen,
            "Flyout--noPadding": noPadding,
            "Flyout--fullWidth": fullWidth,
        });
    useEffect(() => {
        open !== isOpen && updateOpen(open, false);
        const t = setTimeout(() => {
            setClickOutsideEnabled(open);
            //wait till the animation is complete
        }, 250);
        return () => {
            clearTimeout(t);
        };
    }, [open]);
    return (
        <div className={css}>
            <CSSTransition
                timeout={200}
                in={isOpen}
                classNames="Flyout__content"
                unmountOnExit
                nodeRef={domRef}
            >
                <div className="Flyout__content" ref={domRef}>
                    {children}
                </div>
            </CSSTransition>
        </div>
    );
};
