"use client"

import React, { ReactNode } from "react";
import classNames from "classnames";

import { Header, HeaderProps, HeaderNavItems } from "@/modules/Header";
import { Footer, FooterProps, FooterNavItems } from "@/modules/Footer";

import { Montserrat } from 'next/font/google'
import '@/styles/main.scss'

const montserrat = Montserrat({ subsets: ['latin'] })

const headerNavItems: HeaderNavItems[] = [
    { label: "Services", href: "/" },
    { label: "Experten", href: "/" }
]

const footerNavItems: FooterNavItems[] = [
    { label: "Services", href: "/" },
    { label: "Experten", href: "/" },
    { label: "Data Privacy", href: "/" },
    { label: "Terms & Conditions", href: "/" },
    { label: "Imprint", href: "/" }
]

export default function RootLayout({
    children,
    HeaderProps,
    FooterProps
}: {
    children: ReactNode
    HeaderProps?: HeaderProps
    FooterProps?: FooterProps
}) {

    HeaderProps = {
        transparent: true,
        inverted: true,
        headerNav: headerNavItems
    }

    FooterProps = {
        text: "A good design is not only aesthetically pleasing, but also functional. It should be able to solve the problem",
        footerNav: footerNavItems
    }

    const css = classNames({
        Layout: true,
        "Layout--floatingHeader": HeaderProps?.transparent,
    })

    return (
        <html lang="en" className={ montserrat.className }>
            <body>
                <div className={css}>
                    <div className="Layout__header">
                        <Header {...HeaderProps} />
                    </div>
                    <div className="Layout__content">
                        {children}
                    </div>
                </div>
                <div className="Layout__footer">
                    <Footer {...FooterProps} />
                </div>
            </body>
        </html>
    )
}