import React, { ReactNode } from "react"
import Link from 'next/link'
import dayjs from "dayjs"
import { Headline, HeadlineType } from "@/elements/Headline"
import { Text, TextType } from '@/elements/Text'
import "./Footer.scss"

export interface FooterNavItems {
    label: string
    href: string
}

export interface FooterProps {
    text?: string
    footerNav: FooterNavItems[]    
}

export const Footer: React.FC<FooterProps> = ({
    text,
    footerNav
}) => {

    const copyDate = dayjs().format("YYYY")

    return (
        <>
            <footer>
                <div className="Footer__container Footer__text">
                    {text && (
                        <div className="Footer__content">
                            <Text type={TextType.BodySmall}>{ text }</Text>
                        </div>
                    )}
                    <div className="Footer__content">
                        <Headline type={HeadlineType.H2}>Sections</Headline>
                        <ul>
                            {footerNav.map((item, i) => {
                                return (
                                    <li key={i} className="Footer__navigationItem">
                                        <Link
                                            href={item.href}
                                            className="Footer__navigationItem--Link"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="Footer__copyright">
                    <Text>&copy; {copyDate} netrebel.de</Text>
                </div>
            </footer>
        </>
    )
}