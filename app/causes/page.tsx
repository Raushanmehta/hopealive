"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import siteData from "@/data/site.json";
import { CausesData, CauseItem } from "@/types";
import { animateCausesEntrance } from "@/util/animations";
import CausesCard from "@/components/cards/CausesCard";
import Breadcrumb from "@/components/common/Breadcrumb";

export default function CausesPage() {
  // All data sourced directly from site.json
  const data: CausesData = siteData.causes as CausesData;
  const causess: CauseItem[] = data.items;

  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Default active card is the first item
  const [activeCardId, setActiveCardId] = useState<string>(
    causess[0]?.id || ""
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      animateCausesEntrance(sectionRef.current, {
        badge: badgeRef.current,
        headline: headlineRef.current,
        description: descriptionRef.current,
        cards: cardRefs.current,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-[#f8f6f0]">
      <Breadcrumb pageTitle="Causes" subTitle="Causes" />
      <section
        ref={sectionRef}
        aria-label="High-Impact NGO Programs and Causes"
        className="relative w-full bg-[#f8f6f0] text-[#1a2614] px-4 md:px-12 py-8 md:py-10 lg:py-20 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* UPPER ROW: Left Badge | Right Massive Headline & Narrative Paragraph */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* LEFT COLUMN: Badge */}
            <div className="lg:col-span-4 flex flex-col justify-between self-stretch">
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
                <span className="causes-headline-line block">
                  {data.headline.line1}
                </span>
                {data.headline.line2 && (
                  <span className="causes-headline-line block">
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

          {/* Causes Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mt-8 items-stretch">
            {causess.map((cause, index) => (
              <CausesCard
                key={cause.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                cause={cause}
                isActive={activeCardId === cause.id}
                onSelect={() => setActiveCardId(cause.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}