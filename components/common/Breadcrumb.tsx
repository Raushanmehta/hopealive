"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, ChevronRight, Asterisk } from "lucide-react";
import gsap from "gsap";

interface BreadcrumbProps {
  pageTitle: string;
  subTitle?: string;
  description?: string;
  bgImage?: string;
  accentColor?: string;
  showAsterisk?: boolean;
}

export default function Breadcrumb({
  pageTitle,
  subTitle,
  description,
  bgImage = "/images/breadcrumb-clean.png",
  accentColor = "#feff02",
  showAsterisk = true,
}: BreadcrumbProps) {
  const containerRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const asteriskRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  // Default description fallback tailored to page context
  const resolvedDescription =
    description ||
    (pageTitle.toLowerCase().includes("about")
      ? "Pioneering extraordinary architecture and bespoke sanctuaries across global capitals."
      : pageTitle.toLowerCase().includes("blog")
      ? "Explore insightful stories, impactful community initiatives, and the latest humanitarian updates."
      : "Empowering communities, creating lasting change, and bringing hope to every life we touch.");

  const activeBreadcrumbText = subTitle || pageTitle;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Background image subtle cinematic reveal zoom
      if (bgImageRef.current) {
        tl.fromTo(
          bgImageRef.current,
          { opacity: 0, scale: 1.08 },
          { opacity: 1, scale: 1.02, duration: 1.2, ease: "power2.out" }
        );
      }

      // 2. Breadcrumb trail: subtle slide down and fade in
      if (trailRef.current) {
        tl.fromTo(
          trailRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.8"
        );
      }

      // 3. Title: smooth upward reveal
      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.65 },
          "-=0.3"
        );
      }

      // 4. Brand Yellow Asterisk: spring pop-in with rotation
      if (asteriskRef.current) {
        tl.fromTo(
          asteriskRef.current,
          { opacity: 0, scale: 0, rotate: -60 },
          { opacity: 1, scale: 1, rotate: 0, duration: 0.7, ease: "back.out(2)" },
          "-=0.35"
        );
      }

      // 5. Description paragraph: gentle fade-in
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.55 },
          "-=0.3"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label={`${pageTitle} Breadcrumb`}
      className="relative w-full bg-[#162211] text-white pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-16 sm:pb-20 md:pb-24 overflow-hidden border-b border-[#feff02]/15 px-4 md:px-12"
    >
      {/* 1. Full Background Image Layer (Hands Holding Hearts Together in HopeAlive Theme) */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        <Image
          src={bgImage}
          alt="Hands holding hearts together background"
          fill
          priority
          unoptimized
          className="object-cover object-bottom opacity-35 sm:opacity-45"
        />

        {/* Forest Green (#162211) Gradient Overlays:
            - Left-to-right fade: Solid forest green behind text for crisp legibility,
              fading out to reveal the hands holding hearts illustration on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#162211] via-[#162211]/92 via-35% to-[#162211]/40" />

        {/* Top-to-bottom vignettes for seamless header & page integration */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141f10] via-transparent via-50% to-[#10190d]/90" />

        {/* Brand Yellow Ambient Sunburst Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 65% 55% at 50% -15%, rgba(254, 255, 2, 0.09), transparent 75%)",
          }}
        />

        {/* Subtle dot grid overlay for added depth */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />
      </div>

      {/* 2. Foreground Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full text-left">
        {/* Breadcrumb Navigation Trail */}
        <nav
          ref={trailRef}
          aria-label="Breadcrumb"
          className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-poppins text-[#a5b5a2] select-none"
        >
          <Link
            href="/"
            className="flex items-center gap-1.5 text-[#a5b5a2] hover:text-[#feff02] transition-colors duration-200 group"
          >
            <Home
              size={14}
              strokeWidth={1.8}
              className="text-[#feff02] transition-transform duration-200 group-hover:scale-110"
            />
            <span className="font-normal transition-colors duration-200">
              Home
            </span>
          </Link>

          <ChevronRight
            size={12}
            strokeWidth={2.2}
            className="text-[#a5b5a2]/60 shrink-0"
          />

          <span
            className="font-semibold"
            style={{ color: accentColor }}
          >
            {activeBreadcrumbText}
          </span>
        </nav>

        {/* Main Title Line with Brand Yellow Asterisk */}
        <div ref={titleContainerRef} className="mt-3 sm:mt-4 flex items-start">
          <h1
            ref={titleRef}
            className="font-poppins font-bold text-3xl sm:text-5xl md:text-[54px] lg:text-[58px] text-white tracking-[-0.03em] leading-tight select-none inline-flex items-start"
          >
            <span>{pageTitle}</span>
            {showAsterisk && (
              <span
                ref={asteriskRef}
                className="inline-block relative -top-2 sm:-top-3 md:-top-4 ml-1 select-none transition-transform duration-300 hover:rotate-90 hover:scale-110 cursor-pointer drop-shadow-[0_0_10px_rgba(254,255,2,0.45)]"
                style={{ color: accentColor }}
                title="Featured"
              >
                <Asterisk
                  strokeWidth={3.5}
                  className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8"
                />
              </span>
            )}
          </h1>
        </div>

        {/* Description Line in HopeAlive Muted Green/Sage */}
        {resolvedDescription && (
          <p
            ref={descRef}
            className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-[15px] text-[#a5b5a2] font-normal leading-relaxed max-w-2xl font-poppins"
          >
            {resolvedDescription}
          </p>
        )}
      </div>
    </section>
  );
}