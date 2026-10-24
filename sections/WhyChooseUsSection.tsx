"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import siteData from "@/data/site.json";
import { WhyChooseUsData, WhyChooseUsItem } from "@/types";
import {
  animateWhyChooseUsEntrance,
  animateWhyChooseUsButtonHover,
  animateWhyChooseUsButtonLeave,
} from "@/util/animations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface WhyChooseUsSectionProps {
  data?: WhyChooseUsData;
  className?: string;
}

export default function WhyChooseUsSection({
  data = siteData.whyChooseUs as WhyChooseUsData,
  className = "",
}: WhyChooseUsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // Upper row refs (Badge, Stats, Headline, Description, CTA)
  const badgeRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  // Lower row refs (Image & 3 Feature Items)
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      animateWhyChooseUsEntrance(sectionRef.current, {
        badge: badgeRef.current,
        headline: headlineRef.current,
        stats: statsRef.current,
        description: descriptionRef.current,
        ctaButton: ctaButtonRef.current,
        imageContainer: imageContainerRef.current,
        ring: ringRef.current,
        items: itemRefs.current,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Why Choose HopeAlive Foundation"
      className={`relative w-full bg-[#f8f6f0] text-[#1a2614] px-4 md:px-12 py-8 md:py-10 lg:py-20 overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* UPPER ROW: Left Stat & Badge | Right Headline, Paragraph & CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: Badge + Optional Stat Block */}
          <div className="lg:col-span-4 flex flex-col justify-between self-stretch">
            {/* Organic Capsule Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center w-fit select-none"
            >
              <span className="text-sm lg:text-lg font-poppins font-medium text-[#1b2715]">
                {data.badge?.text || "WHY CHOOSE US"}
              </span>
            </div>

            {/* Giant Stat Block: rendered only if data.stats exists */}
            {data.stats && (
              <div ref={statsRef} className="mt-12 sm:mt-16 lg:mt-auto pt-4">
                <div className="font-poppins font-bold text-6xl sm:text-7xl lg:text-[84px] xl:text-[92px] tracking-tight text-[#1b2715] leading-none select-none">
                  {data.stats.value}
                </div>
                <div className="mt-2 font-poppins font-semibold text-xs sm:text-[13px] uppercase tracking-[0.16em] text-[#556350] select-none">
                  {data.stats.label}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Massive Headline, Narrative Paragraph & Optional CTA Button */}
          <div className="lg:col-span-8 flex flex-col">
            {/* Massive Bold Headline */}
            <h2
              ref={headlineRef}
              className="font-poppins font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[52px] xl:text-[62px] text-[#1b2715] tracking-tight leading-[1.12] select-none"
            >
              <span className="about-headline-line whychooseus-headline-line block">
                {data.headline.line1}
              </span>
              {data.headline.line2 && (
                <span className="about-headline-line whychooseus-headline-line block">
                  {data.headline.line2}
                </span>
              )}
            </h2>

            {/* Narrative Paragraph */}
            <p
              ref={descriptionRef}
              className="mt-3 sm:mt-4 max-w-3xl font-poppins text-sm sm:text-base text-[#556350] leading-relaxed select-none"
            >
              {data.description}
            </p>

            {/* CTA Button: rendered only if data.cta exists */}
            {data.cta && (
              <div className="mt-3 sm:mt-6">
                <Link
                  ref={ctaButtonRef}
                  href={data.cta.href}
                  onMouseEnter={() =>
                    animateWhyChooseUsButtonHover(ctaButtonRef.current, arrowRef.current)
                  }
                  onMouseLeave={() =>
                    animateWhyChooseUsButtonLeave(ctaButtonRef.current, arrowRef.current)
                  }
                  className="btn-leaf inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 bg-[#1f2c16] text-[#feff02] font-poppins font-semibold text-sm sm:text-[15px] tracking-wide rounded-xl shadow-lg hover:bg-[#162211] active:scale-[0.98] transition-all duration-200 cursor-pointer select-none"
                >
                  <span>{data.cta.label}</span>
                  <ArrowUpRight
                    ref={arrowRef}
                    size={18}
                    strokeWidth={2.6}
                    className="transition-transform duration-200 shrink-0 text-[#feff02]"
                  />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================
            LOWER ROW: Left Arch Pillar Image | Right 3 Numbered Feature Items
            ======================================================== */}
        <div className="mt-4 sm:mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Featured Arch-Curved Pillar Image */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-start">
            {/* Arched Image Container */}
            <div
              ref={imageContainerRef}
              className="relative z-10 w-full max-w-[440px] sm:max-w-[480px] lg:max-w-[500px] h-[380px] sm:h-[410px] md:h-[430px] lg:h-[450px] rounded-tl-3xl rounded-tr-[180px] sm:rounded-tr-[240px] md:rounded-tr-[280px] rounded-bl-3xl rounded-br-3xl overflow-hidden shadow-2xl border border-black/5 bg-[#1f2c16]/5 group"
            >
              <Image
                src={data.image}
                alt={data.imageAlt || "Why Choose HopeAlive Community Project"}
                fill
                priority
                unoptimized
                className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Natural subtle bottom ambient gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right Column: 3 Numbered Feature Items (01, 02, 03) */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 sm:space-y-7 lg:space-y-8">
            {data.items.map((item: WhyChooseUsItem, index: number) => (
              <div
                key={item.id}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className="group flex items-start gap-4 sm:gap-6 md:gap-8 transition-transform duration-300 hover:-translate-y-1 select-none"
              >
                {/* Badge Container: Organic Leaf/Pebble Shape + Overlapping Number */}
                <div className="relative flex items-center shrink-0 w-20 sm:w-24">
                  {/* Organic Leaf/Pebble Colored Shape */}
                  <div
                    className="w-11 sm:w-12 h-13 sm:h-14 rounded-tl-2xl rounded-tr-md rounded-br-2xl rounded-bl-[28px] shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: item.badgeColor }}
                  />

                  {/* Bold Charcoal Number overlapping right edge of badge */}
                  <span className="absolute left-5 sm:left-6 font-poppins font-bold text-4xl sm:text-5xl text-[#1b2715] tracking-tight drop-shadow-sm select-none">
                    {item.number}
                  </span>
                </div>

                {/* Right Description Text Block */}
                <div className="flex-1 pt-1.5 sm:pt-2">
                  {item.title && (
                    <h3 className="font-poppins font-bold text-base sm:text-lg text-[#1b2715] mb-1.5 group-hover:text-[#2d5a27] transition-colors duration-200">
                      {item.title}
                    </h3>
                  )}
                  <p className="font-poppins font-normal text-xs sm:text-sm md:text-[15px] text-[#556350] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}