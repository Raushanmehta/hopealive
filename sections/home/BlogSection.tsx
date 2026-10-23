"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import siteData from "@/data/site.json";
import { BlogData, BlogPostItem } from "@/types";
import {
  animateBlogEntrance,
  animateBlogCardHover,
  animateBlogCardLeave,
} from "@/util/animations";

interface BlogSectionProps {
  data?: BlogData;
}

export default function BlogSection({
  data = siteData.blog as BlogData,
}: BlogSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardArrowRefs = useRef<(SVGSVGElement | null)[]>([]);

  // GSAP Entrance Animation on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      animateBlogEntrance(sectionRef.current, {
        badge: badgeRef.current,
        headline: headlineRef.current,
        description: descriptionRef.current,
        cards: cardRefs.current,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="blog"
      aria-label="HopeAlive Foundation Inspiring Stories and Impact"
      className="relative w-full bg-[#f8f6f0] text-[#1a2614] px-4 md:px-12 py-8 md:py-10 lg:py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* UPPER ROW: Left Column (Badge) | Right Column (Headline, Description & CTA) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: Organic Pill Badge */}
          <div className="lg:col-span-4 flex flex-col justify-start self-stretch">
            {/* Organic Capsule Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center w-fit select-none"
            >
              <span className=" text-sm lg:text-lg font-poppins font-medium  text-[#1b2715]">
                {data.badge.text}
              </span>
            </div>

          </div>

          {/* RIGHT COLUMN: Massive Headline, Narrative Paragraph & Leaf CTA Button */}
          <div className="lg:col-span-8 flex flex-col">
            {/* Massive Bold Headline */}
            <h2
              ref={headlineRef}
              className="font-poppins font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[52px] xl:text-[62px] text-[#1b2715] tracking-tight leading-[1.12] select-none"
            >
              <span className="blog-headline-line block">{data.headline.line1}</span>
              {data.headline.line2 && (
                <span className="blog-headline-line block">{data.headline.line2}</span>
              )}
            </h2>

            {/* Narrative Paragraph */}
            <p
              ref={descriptionRef}
              className="mt-3 sm:mt-4 max-w-3xl font-poppins text-sm sm:text-base text-[#556350] leading-relaxed select-none"
            >
              {data.description}
            </p>
          </div>
        </div>

        {/* BOTTOM ROW: 3 Feature Blog Cards with Signature 80px Organic Leaf-Cut Silhouette */}
        <div className="mt-4 sm:mt-6 lg:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch">
          {data.posts.map((post: BlogPostItem, index: number) => (
            <Link
              key={post.id}
              href={post.href}
              className="group flex flex-col"
            >
              <div
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                onMouseEnter={() =>
                  animateBlogCardHover(
                    cardRefs.current[index],
                    cardArrowRefs.current[index]
                  )
                }
                onMouseLeave={() =>
                  animateBlogCardLeave(
                    cardRefs.current[index],
                    cardArrowRefs.current[index]
                  )
                }
                className="relative flex flex-col flex-1 bg-[#1c2918] rounded-tl-[80px] rounded-br-[80px] rounded-tr-2xl rounded-bl-2xl overflow-hidden shadow-xl transition-all duration-500 ease-out select-none cursor-pointer border border-white/5 hover:border-white/10"
              >
                {/* Top Image Container */}
                <div className="relative w-full h-[220px] sm:h-[240px] md:h-[250px] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.alt}
                    fill
                    unoptimized
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Natural subtle ambient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c2918]/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Bottom Dark Container with Metadata, Title & Link */}
                <div className="p-6 sm:p-7 lg:p-8 flex flex-col justify-between flex-1">
                  <div>
                    {/* Publication Date */}
                    <span className="font-poppins text-xs sm:text-[13px] text-[#8fa087] font-normal tracking-wide block">
                      {post.date}
                    </span>

                    {/* Article Headline */}
                    <h3 className="mt-2.5 mb-6 sm:mb-8 font-poppins font-semibold text-lg sm:text-xl lg:text-[22px] text-white leading-snug tracking-normal group-hover:text-[#feff02] transition-colors duration-300">
                      {post.title}
                    </h3>
                  </div>

                  {/* Read More Link with Diagonal Arrow */}
                  <div className="inline-flex items-center gap-1.5 font-poppins text-xs sm:text-sm font-medium text-[#feff02] mt-auto">
                    <span>Read More</span>
                    <ArrowUpRight
                      ref={(el) => {
                        cardArrowRefs.current[index] = el;
                      }}
                      size={16}
                      strokeWidth={2.4}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-[#feff02] shrink-0"
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
