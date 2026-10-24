"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import siteData from "@/data/site.json";
import { TestimonialData, TestimonialItem } from "@/types";
import { animateTestimonialEntrance } from "@/util/animations";
import TestimonialCard from "@/components/cards/TestimonialCard";
import Breadcrumb from "@/components/common/Breadcrumb";

export default function TestimonialPage() {
  // All testimonial data sourced directly from site.json
  const data: TestimonialData = siteData.testimonials as TestimonialData;

  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  // GSAP Entrance Animation on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      animateTestimonialEntrance(sectionRef.current, {
        badge: badgeRef.current,
        headline: headlineRef.current,
        description: descriptionRef.current,
        carousel: gridContainerRef.current,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-[#f8f6f0]">
      <Breadcrumb pageTitle="Testimonial" subTitle="Testimonial" />

      <section
        ref={sectionRef}

        aria-label="HopeAlive Foundation Community Testimonials"
        className="relative w-full bg-[#f8f6f0] text-[#1a2614] px-4 md:px-12 py-8 md:py-10 lg:py-20 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* UPPER ROW: Left Column (Badge) | Right Column (Headline & Narrative) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* LEFT COLUMN: Organic Pill Badge */}
            <div className="lg:col-span-4 flex flex-col justify-start self-stretch">
              <div
                ref={badgeRef}
                className="inline-flex items-center w-fit select-none"
              >
                <span className="text-sm lg:text-lg font-poppins font-medium text-[#1b2715]">
                  {data.badge.text}
                </span>
              </div>
            </div>

            {/* RIGHT COLUMN: Massive Headline & Narrative Paragraph */}
            <div className="lg:col-span-8 flex flex-col">
              {/* Massive Bold Headline */}
              <h2
                ref={headlineRef}
                className="font-poppins font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[52px] xl:text-[62px] text-[#1b2715] tracking-tight leading-[1.12] select-none"
              >
                <span className="testimonial-headline-line block">
                  {data.headline.line1}
                </span>
                {data.headline.line2 && (
                  <span className="testimonial-headline-line block">
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
            </div>
          </div>

          {/* Testimonial Cards Grid with uniform heights and gap-y for popping avatars */}
          <div
            ref={gridContainerRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-16 pt-8 sm:pt-10 pb-6 mt-4 sm:mt-6 items-stretch"
          >
            {data.items.map((item: TestimonialItem) => (
              <TestimonialCard
                key={item.id}
                item={item}
                cardBg="bg-white"
                className="w-full h-full shadow-lg hover:shadow-xl transition-shadow"
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}