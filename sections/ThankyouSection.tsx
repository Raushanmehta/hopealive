"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowLeft, Heart } from "lucide-react";
import { site, SectionProps, ThankYouData } from "@/data";

export default function ThankYouSection({ data: propData, className }: SectionProps<ThankYouData> = {}) {
    const content = propData || site.thankYou;

    return (
        <section
            aria-label="Thank You Confirmation"
            className="relative w-full bg-[#f8f6f0] text-[#1a2614] px-4 md:px-12 py-12 md:py-20 lg:py-24 overflow-hidden"
        >
            <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
                {/* Success verification icon badge */}
                <div className="relative mb-6">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#1f2c16] text-[#feff02] flex items-center justify-center shadow-xl">
                        <CheckCircle2 size={44} strokeWidth={2.4} />
                    </div>
                </div>

                {/* Thank you headline title */}
                <h1 className="font-poppins font-bold text-3xl sm:text-5xl lg:text-[54px] text-[#1b2715] tracking-tight leading-[1.15] mb-4">
                    {content.headline}
                </h1>

                {/* Thank you message description */}
                <p className="font-poppins text-sm sm:text-base lg:text-lg text-[#556350] leading-relaxed max-w-2xl mb-10">
                    {content.description}
                </p>

                {/* Navigation primary action buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                    {content.primaryCta && (
                        <Link
                            href={content.primaryCta.href}
                            className="btn-leaf inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#feff02] text-[#121a0d] hover:bg-[#1f2c16] hover:text-[#feff02] font-poppins font-bold text-sm tracking-wide rounded-xl shadow-lg transition-all cursor-pointer w-full sm:w-auto select-none"
                        >
                            <ArrowLeft size={16} strokeWidth={2.6} />
                            <span>{content.primaryCta.label}</span>
                        </Link>
                    )}
                    {content.secondaryCta && (
                        <Link
                            href={content.secondaryCta.href}
                            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#1f2c16] hover:bg-[#2d5a27] text-white rounded-full font-poppins font-semibold text-sm tracking-wide transition-all border border-[#1b2715]/10 w-full sm:w-auto shadow-md"
                        >
                            <Heart size={16} className="text-[#feff02]" />
                            <span>{content.secondaryCta.label}</span>
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}