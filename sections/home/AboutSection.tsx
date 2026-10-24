"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import siteData from "@/data/site.json";
import { AboutData } from "@/types";
import {
  animateAboutEntrance,
  animateAboutButtonHover,
  animateAboutButtonLeave,
} from "@/util/animations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AboutSectionProps {
  data?: AboutData;
  showCta?: boolean;
}

export default function AboutSection({
  data = siteData.about,
  showCta = true,
}: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const imagePlantingRef = useRef<HTMLDivElement>(null);
  const imageSeedlingRef = useRef<HTMLDivElement>(null);

  // GSAP Entrance Animation on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      animateAboutEntrance(sectionRef.current, {
        badge: badgeRef.current,
        stats: statsRef.current,
        headline: headlineRef.current,
        description: descriptionRef.current,
        ctaButton: ctaButtonRef.current,
        imagePlanting: imagePlantingRef.current,
        imageSeedling: imageSeedlingRef.current,
      });

      // Ultra-Smooth Animated Number Counter from 0 to 250
      const rawValue = data.stats.value || "250K+";
      const match = rawValue.match(/^(\d+)(.*)$/);
      const targetNum = match ? parseInt(match[1], 10) : 250;
      const suffix = match ? match[2] : "K+";

      let lastInt = -1;
      const counterObj = { value: 0 };

      gsap.to(counterObj, {
        value: targetNum,
        duration: 2.6,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: statsRef.current || sectionRef.current,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          const currentInt = Math.round(counterObj.value);
          if (currentInt !== lastInt) {
            lastInt = currentInt;
            if (counterRef.current) {
              counterRef.current.textContent = `${currentInt}${suffix}`;
            }
          }
        },
        onComplete: () => {
          if (counterRef.current) {
            counterRef.current.textContent = `${targetNum}${suffix}`;
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [data.stats.value]);

  return (
    <section
      ref={sectionRef}
      aria-label="About HopeAlive Foundation"
      className="relative w-full bg-[#f8f6f0] text-[#1a2614]  px-4 md:px-12 py-8 md:py-10 lg:py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* UPPER ROW: Left Stat & Badge | Right Headline, Paragraph & CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: Badge + 12M+ Trees Planted Stat */}
          <div className="lg:col-span-4 flex flex-col justify-between self-stretch">
            {/* Organic Capsule Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center w-fit select-none"
            >
              <span className=" text-sm lg:text-lg font-poppins font-medium  text-[#1b2715]">
                {data.badge.text}
              </span>
            </div>

            {/* Giant Stat Block: Counter 0 to 250 with Tabular Nums for zero-jitter smoothness */}
            <div ref={statsRef} className="mt-12 sm:mt-16 lg:mt-auto pt-4">
              <div className="font-poppins font-bold text-6xl sm:text-7xl lg:text-[84px] xl:text-[92px] tracking-tight text-[#1b2715] leading-none select-none tabular-nums">
                <span ref={counterRef}>0{data.stats.value.replace(/^\d+/, "") || "K+"}</span>
              </div>
              <div className="mt-2 font-poppins font-semibold text-xs sm:text-[13px] uppercase tracking-[0.16em] text-[#556350] select-none">
                {data.stats.label}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Massive Headline, Narrative Paragraph & Leaf CTA Button */}
          <div className="lg:col-span-8 flex flex-col">
            {/* Massive Bold Headline */}
            <h2
              ref={headlineRef}
              className="font-poppins font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[52px] xl:text-[62px] text-[#1b2715] tracking-tight leading-[1.12] select-none"
            >
              <span className="about-headline-line block">{data.headline.line1}</span>
              {data.headline.line2 && (
                <span className="about-headline-line block">{data.headline.line2}</span>
              )}

            </h2>

            {/* Narrative Paragraph */}
            <p
              ref={descriptionRef}
              className="mt-3 sm:mt-4 max-w-3xl font-poppins text-sm sm:text-base text-[#556350] leading-relaxed select-none"
            >
              {data.description}
            </p>

            {/* CTA Button: Dark Green Leaf with Yellow Text & Arrow */}
            {showCta && data.cta && (
              <div className="mt-3 sm:mt-6">
                <Link
                  ref={ctaButtonRef}
                  href={data.cta.href}
                  onMouseEnter={() =>
                    animateAboutButtonHover(ctaButtonRef.current, arrowRef.current)
                  }
                  onMouseLeave={() =>
                    animateAboutButtonLeave(ctaButtonRef.current, arrowRef.current)
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

        {/* BOTTOM ROW: Organic Shaped Featured Images */}
        <div className="mt-4 sm:mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
          {/* LEFT IMAGE: Planting Trees (Wide, Organic Curves) */}
          <div
            ref={imagePlantingRef}
            className="lg:col-span-9 relative min-h-[400px] sm:min-h-[410px] md:min-h-[430px] lg:min-h-[450px] rounded-tl-[80px] rounded-br-[80px] rounded-tr-none rounded-bl-none overflow-hidden shadow-2xl group"
          >
            <Image
              src={data.images.planting.src}
              alt={data.images.planting.alt}
              fill
              unoptimized
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Subtle natural sunlight vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* RIGHT IMAGE: Seedling Macro (Vertical Leaf / Arch Silhouette) */}
          <div
            ref={imageSeedlingRef}
            className="lg:col-span-3 relative min-h-[400px] sm:min-h-[410px] md:min-h-[430px] lg:min-h-[450px] rounded-tl-[80px] rounded-br-[80px] overflow-hidden shadow-2xl group"
          >
            <Image
              src={data.images.seedling.src}
              alt={data.images.seedling.alt}
              fill
              unoptimized
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Subtle natural warm glow vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
