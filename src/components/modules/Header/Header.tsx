"use client"

import classNames from "classnames"
import React, { ReactNode, useState, useEffect, FC } from "react"
import { useWindowSize } from "@/hooks/useWindowSize/useWindowSize.hook"
import { Button, ButtonVariant, ButtonColor } from '@/elements/Button'
import { Icon, IconName } from "@/elements/Icons"
import { Logo } from "@/elements/Logo"

import { Modal, ModalSize } from "@/modules/Modal"
import "./Header.scss"

export interface HeaderNavItems {
    label: string
    href: string
    render?: (self: HeaderNavItems) => ReactNode
}

export interface HeaderProps {
    inverted?: boolean
    transparent?: boolean
    headerNav?: HeaderNavItems[]
    onLogoClick?: () => any
}

export const Header: FC<HeaderProps> = ({
    headerNav,
    inverted,
    transparent,
    onLogoClick,
}) => {

    const   windowWidth = useWindowSize().width || 0,
            [showNavigation, setShowNavigation] = useState(false),
            [headerFixed, setHeaderFixed] = useState(false),
            css = classNames({
                Header: true,
                "Header--inverted": inverted,
                "Header--transparent": transparent,
                "Header--sticky": headerFixed,
            }),
            navigationCss = classNames({
                Header__navigation: true,
                "Header__navigation--mobile": windowWidth < 768,
            }),
            handleOnShowNavigation = () => {
                setShowNavigation(true);
            },
            handleOnCloseNavigation = () => {
                setShowNavigation(false);
            }

    useEffect(() => {
        if (showNavigation) {
            handleOnCloseNavigation();
        }
    }, [windowWidth]);

    useEffect(() => {
        let lastScroll = window.scrollY;

        const updateScrollDirection = () => {
            const scroll = window.scrollY;
            setHeaderFixed(scroll > lastScroll);
            lastScroll = scroll > 0 ? scroll : 0;
        };

        const onScroll = () => {
            window.requestAnimationFrame(updateScrollDirection);
        };

        if (windowWidth > 600) {
            window.addEventListener("scroll", onScroll, { passive: true });
        } else {
            setHeaderFixed(false);
        }

        return () => window.removeEventListener("scroll", onScroll);
    }, [headerFixed, windowWidth]);    
    
    return (
        <div className={css}>
            <div className="Header__logo">
                <Logo
                    onClick={onLogoClick}
                    showText={true}
                    inverted={inverted}
                ></Logo>
            </div>
            <div className="Header__content">
                {windowWidth > 900 && (
                    <ul className={navigationCss}>
                        {headerNav.map((navItem, k) => {
                            return (
                                <li key={k} className="Header__navigationItem">
                                    {navItem.render && navItem.render(navItem)}
                                    {!navItem.render && (
                                        <a
                                            href={navItem.href}
                                            onClick={handleOnCloseNavigation}
                                        >
                                            {navItem.label}
                                        </a>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                )}
                {windowWidth > 600 && (
                    <Button
                        variant={ButtonVariant.Primary}
                        color={ButtonColor.Primary}
                    >
                        Let&apos;s talk
                    </Button>
                )}

                {windowWidth < 900 && (
                    <button
                        className="Header__burger"
                        onClick={handleOnShowNavigation}
                    >
                        <Icon name={IconName.Menu_MenuAlt02} />
                    </button>
                )}
            </div>

            {windowWidth < 901 && (
                <Modal
                    show={showNavigation}
                    size={ModalSize.Fullscreen}
                    onClose={handleOnCloseNavigation}
                    noPadding={true}
                >
                    <ul className={navigationCss}>
                        {headerNav.map((navItem, k) => {
                            return (
                                <li
                                    key={k}
                                    className="Header__navigationItem"
                                    onClick={() => handleOnCloseNavigation()}
                                >
                                    {navItem.render && navItem.render(navItem)}
                                    {!navItem.render && (
                                        <a href={navItem.href}>
                                            {navItem.label}
                                        </a>
                                    )}
                                </li>
                            );
                        })}
                        {windowWidth < 601 && (
                            <li
                                className="Header__navigationItem"
                                onClick={() => handleOnCloseNavigation()}
                            >
                                <a href="/contact">
                                    Let&apos;s talk
                                </a>
                            </li>
                        )}
                    </ul>
                </Modal>
            )}
        </div>
    )
}