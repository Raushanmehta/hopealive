"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import {
    FacebookIcon,
    InstagramIcon,
    TwitterIcon,
    LinkedinIcon,
} from "@/components/icons/SocialIcons";
import SunburstIcon from "@/components/icons/SunburstIcon";
import siteData from "@/data/site.json";
import { FooterData, SocialLink } from "@/types";
import {
    animateFooterEntrance,
    animateSocialHover,
    animateSocialLeave,
    animateFooterLinkHover,
    animateFooterLinkLeave,
} from "@/util/animations";

interface FooterProps {
    data?: FooterData;
}

export default function Footer({ data = siteData.footer }: FooterProps) {
    const footerRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const socialsContainerRef = useRef<HTMLDivElement>(null);
    const linksColumnRef = useRef<HTMLDivElement>(null);
    const quickLinksColumnRef = useRef<HTMLDivElement>(null);
    const locationColumnRef = useRef<HTMLDivElement>(null);
    const copyrightRef = useRef<HTMLDivElement>(null);
    const watermarkRef = useRef<HTMLDivElement>(null);

    // GSAP Entrance Animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            animateFooterEntrance({
                headline: headlineRef.current,
                description: descriptionRef.current,
                socialsContainer: socialsContainerRef.current,
                linksColumn: linksColumnRef.current,
                quickLinksColumn: quickLinksColumnRef.current,
                locationColumn: locationColumnRef.current,
                copyright: copyrightRef.current,
                watermark: watermarkRef.current,
            });
        }, footerRef);

        return () => ctx.revert();
    }, []);

    const getSocialIcon = (platform: SocialLink["platform"]) => {
        switch (platform) {
            case "facebook":
                return <FacebookIcon size={17} />;
            case "instagram":
                return <InstagramIcon size={17} />;
            case "twitter":
                return <TwitterIcon size={17} />;
            case "linkedin":
                return <LinkedinIcon size={17} />;
            default:
                return null;
        }
    };

    return (
        <footer
            ref={footerRef}
            className="relative w-full bg-[#1f2c16] text-[#b0bfae] overflow-hidden pt-12 sm:pt-16 lg:pt-20 pb-0 border-t border-white/5 px-4 md:px-12"
        >
            <div className="max-w-7xl mx-auto w-full">
                {/* Upper Main Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-8 items-start">
                    {/* Left Column: Headline, Description & Social Icons */}
                    <div className="lg:col-span-5 xl:col-span-5">
                        <div ref={headlineRef} className="flex items-center gap-3 sm:gap-3.5">
                            <SunburstIcon
                                size={36}
                                color="#feff02"
                                className="drop-shadow-[0_0_12px_rgba(254,255,2,0.6)] shrink-0 transition-transform duration-300 hover:rotate-45 sm:w-10 sm:h-10"
                            />
                            <h2
                                className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] font-poppins font-bold text-white tracking-tight leading-[1.14]"
                            >
                                {data.headline.line1}
                                {data.headline.line2 && (
                                    <>
                                        {" "}
                                        <br />
                                        {data.headline.line2}
                                    </>
                                )}
                            </h2>
                        </div>

                        <p
                            ref={descriptionRef}
                            className="mt-4 sm:mt-5 max-w-sm sm:max-w-md text-sm sm:text-[15px] font-poppins text-[#a5b5a2] leading-relaxed"
                        >
                            {data.description}
                        </p>

                        {/* Social Media Buttons (4 yellow circles) */}
                        <div
                            ref={socialsContainerRef}
                            className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-3.5"
                        >
                            {data.socials.map((social) => (
                                <a
                                    key={social.id}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    onMouseEnter={(e) => animateSocialHover(e.currentTarget)}
                                    onMouseLeave={(e) => animateSocialLeave(e.currentTarget)}
                                    className="social-btn w-10 h-10 rounded-full bg-[#feff02] text-[#121a0d] flex items-center justify-center transition-shadow shadow-md hover:shadow-[0_0_14px_rgba(254,255,2,0.45)] cursor-pointer shrink-0 active:scale-95"
                                >
                                    {getSocialIcon(social.platform)}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Links, Quick Links, Location */}
                    <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-between">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-8">
                            {/* Links Column */}
                            <div ref={linksColumnRef}>
                                <h3 className="font-poppins uppercase tracking-[0.16em] text-xs sm:text-[13px] font-semibold text-[#e1ece0] mb-4 sm:mb-5">
                                    {data.linksSection.title}
                                </h3>
                                <ul className="space-y-2.5 sm:space-y-3">
                                    {data.linksSection.links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                onMouseEnter={(e) => animateFooterLinkHover(e.currentTarget)}
                                                onMouseLeave={(e) => animateFooterLinkLeave(e.currentTarget)}
                                                className="inline-block font-poppins text-xs sm:text-sm text-[#a1b099] hover:text-[#feff02] transition-colors duration-200 py-0.5"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Quick Links Column */}
                            {data.quickLinksSection && (
                                <div ref={quickLinksColumnRef}>
                                    <h3 className="font-poppins uppercase tracking-[0.16em] text-xs sm:text-[13px] font-semibold text-[#e1ece0] mb-4 sm:mb-5">
                                        {data.quickLinksSection.title}
                                    </h3>
                                    <ul className="space-y-2.5 sm:space-y-3">
                                        {data.quickLinksSection.links.map((link) => (
                                            <li key={link.label}>
                                                <Link
                                                    href={link.href}
                                                    onMouseEnter={(e) => animateFooterLinkHover(e.currentTarget)}
                                                    onMouseLeave={(e) => animateFooterLinkLeave(e.currentTarget)}
                                                    className="inline-block font-poppins text-xs sm:text-sm text-[#a1b099] hover:text-[#feff02] transition-colors duration-200 py-0.5"
                                                >
                                                    {link.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Location Column: On mobile, spans across full 2 columns */}
                            <div ref={locationColumnRef} className="col-span-2 sm:col-span-1 flex flex-col justify-between pt-4 sm:pt-0 border-t border-white/5 sm:border-transparent">
                                <div>
                                    <h3 className="font-poppins uppercase tracking-[0.16em] text-xs sm:text-[13px] font-semibold text-[#e1ece0] mb-4 sm:mb-5">
                                        {data.locationSection.title}
                                    </h3>
                                    <div className="space-y-1 text-xs sm:text-sm font-poppins text-[#a1b099] leading-relaxed">
                                        {data.locationSection.addressLines.map((line) => (
                                            <p key={line}>{line}</p>
                                        ))}
                                    </div>

                                    <div className="mt-4 sm:mt-5 space-y-1.5 text-xs sm:text-sm font-poppins text-[#a1b099]">
                                        {data.locationSection.phones.map((phone) => (
                                            <p key={phone}>
                                                <a
                                                    href={`tel:${phone.replace(/\s+/g, "")}`}
                                                    className="hover:text-[#feff02] transition-colors inline-block py-0.5"
                                                >
                                                    {phone}
                                                </a>
                                            </p>
                                        ))}
                                        {data.locationSection.email && (
                                            <p className="break-all sm:break-normal">
                                                <a
                                                    href={`mailto:${data.locationSection.email}`}
                                                    className="hover:text-[#feff02] transition-colors inline-block py-0.5"
                                                >
                                                    {data.locationSection.email}
                                                </a>
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Copyright Notice */}
                                <div
                                    ref={copyrightRef}
                                    className="mt-6 sm:mt-10 text-[11px] sm:text-xs font-poppins text-[#6e806b] leading-relaxed select-none"
                                >
                                    <p>{data.copyright.line1}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Massive Watermark "HopeAlive" at the Bottom */}
                <div
                    ref={watermarkRef}
                    aria-hidden="true"
                    className="mt-8 sm:mt-10 lg:mt-12 text-center select-none pointer-events-none overflow-hidden w-full"
                >
                    <span className="block font-poppins font-bold text-[16vw] sm:text-[18vw] lg:text-[200px] xl:text-[230px] tracking-tight leading-[0.8] text-white/[0.08] select-none truncate">
                        {data.watermark}
                    </span>
                </div>
            </div>
        </footer>
    );
}