"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { NutritionIcon, EducationIcon, HealthcareIcon } from "@/components/icons";
import siteData from "@/data/site.json";
import { CausesData, CauseItem } from "@/types";
import {
  animateCausesEntrance,
  animateCausesButtonHover,
  animateCausesButtonLeave,
} from "@/util/animations";

interface CausesSectionProps {
  data?: CausesData;
}

export default function CausesSection({
  data = siteData.causes as CausesData,
}: CausesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Default active card is the first item (Planting Nourishment in reference image)
  const [activeCardId, setActiveCardId] = useState<string>(
    data.items[0]?.id || ""
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      animateCausesEntrance(sectionRef.current, {
        badge: badgeRef.current,
        headline: headlineRef.current,
        description: descriptionRef.current,
        ctaButton: ctaButtonRef.current,
        cards: cardRefs.current,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderIcon = (iconName: string, isActive: boolean) => {
    const iconProps = {
      size: 40,
      strokeWidth: 1.8,
      className: `transition-transform duration-300 transform group-hover:scale-110 ${isActive ? "text-[#121a0d]" : "text-white"
        }`,
    };

    switch (iconName.toLowerCase()) {
      case "nutrition":
      case "wheat":
      case "food":
        return <NutritionIcon {...iconProps} />;
      case "education":
      case "sprout":
      case "book":
        return <EducationIcon {...iconProps} />;
      case "healthcare":
      case "shelter":
      case "leaf":
      default:
        return <HealthcareIcon {...iconProps} />;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="programs"
      aria-label="High-Impact NGO Programs and Causes"
      className="relative w-full bg-[#162211] text-white px-4 md:px-12 py-8 md:py-10 lg:py-20 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* UPPER ROW: Left Badge | Right Massive Headline, Narrative & Leaf CTA Button */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: Badge (Matches AboutSection Left Column) */}
          <div className="lg:col-span-4 flex flex-col justify-between self-stretch">
            <div
              ref={badgeRef}
              className="inline-flex items-center w-fit select-none"
            >
              <span className="text-sm lg:text-lg font-poppins font-medium text-[#feff02]">
                {data.badge.text}
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Massive Headline, Narrative Paragraph & Leaf CTA Button */}
          <div className="lg:col-span-8 flex flex-col">
            {/* Massive Bold Headline */}
            <h2
              ref={headlineRef}
              className="font-poppins font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[52px] xl:text-[62px] text-white tracking-tight leading-[1.12] select-none"
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
              className="mt-3 sm:mt-4 max-w-3xl font-poppins text-sm sm:text-base text-[#b0bfae] leading-relaxed select-none"
            >
              {data.description}
            </p>
          </div>
        </div>

        {/* BOTTOM ROW: 3 Feature Cause Cards with Organic Leaf-Cut Silhouette */}
        <div className="mt-4 sm:mt-6 lg:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch">
          {data.items.map((item: CauseItem, index: number) => {
            const isActive = activeCardId === item.id;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                onMouseEnter={() => setActiveCardId(item.id)}
                onClick={() => setActiveCardId(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setActiveCardId(item.id);
                  }
                }}
                className={`group relative flex flex-col justify-between min-h-[390px] sm:min-h-[420px] p-8 sm:p-9 lg:p-10 rounded-tl-[54px] sm:rounded-tl-[64px] rounded-br-[54px] sm:rounded-br-[64px] rounded-tr-2xl rounded-bl-2xl shadow-xl transition-all duration-500 ease-out cursor-pointer select-none ${isActive
                  ? "bg-[#feff02] text-[#121a0d] scale-[1.01] shadow-2xl shadow-[#feff02]/15"
                  : "bg-[#1f2c16] text-white border border-white/10 hover:border-white/25 hover:bg-[#25361c]"
                  }`}
              >
                {/* Top Row: Title (Left) and Organic Icon (Right) */}
                <div className="flex items-start justify-between gap-4 w-full">
                  <h3
                    className={`font-poppins font-bold text-2xl sm:text-[28px] lg:text-[32px] tracking-tight leading-[1.15] max-w-[210px] ${isActive ? "text-[#121a0d]" : "text-white"
                      }`}
                  >
                    {item.title}
                  </h3>

                  <div className="shrink-0 p-1">
                    {renderIcon(item.icon, isActive)}
                  </div>
                </div>

                {/* Bottom Paragraph with subtle opacity */}
                <div className="mt-12 sm:mt-16">
                  <p
                    className={`font-poppins text-sm sm:text-[15px] leading-relaxed transition-colors duration-300 ${isActive
                      ? "text-[#121a0d]/90 font-medium"
                      : "text-[#a8b3a4] font-normal"
                      }`}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}