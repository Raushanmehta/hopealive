"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { site, CausesData, CauseItem } from "@/data";
import { animateCausesEntrance } from "@/util/animations";
import CausesCard from "@/components/cards/CausesCard";
import Breadcrumb from "@/components/common/Breadcrumb";

export default function CausesPage() {
  const data: CausesData = site.causes;
  const causess: CauseItem[] = data.items;

  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const badgeLineRef = useRef<SVGLineElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Active card selection (null by default so no card is active initially)
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      animateCausesEntrance(sectionRef.current, {
        badge: badgeRef.current,
        headline: headlineRef.current,
        description: descriptionRef.current,
        cards: cardRefs.current,
      });

      // Animate straight line drawing under the badge
      if (badgeLineRef.current) {
        gsap.fromTo(
          badgeLineRef.current,
          {
            strokeDasharray: 120,
            strokeDashoffset: 120,
          },
          {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: "power2.out",
            delay: 0.3,
            scrollTrigger: {
              trigger: badgeRef.current || sectionRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
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
          {/* Header content grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left badge column wrapper */}
            <div className="lg:col-span-4 flex flex-col justify-between self-stretch">
              <div
                ref={badgeRef}
                className="inline-flex flex-col items-start w-fit select-none"
              >
                <span className="text-sm lg:text-lg font-poppins font-medium text-[#1b2715]">
                  {data.badge.text}
                </span>
                <svg
                  width="120"
                  height="8"
                  viewBox="0 0 120 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mt-1 pointer-events-none w-full max-w-[120px] overflow-visible"
                >
                  <line
                    ref={badgeLineRef}
                    x1="2"
                    y1="4"
                    x2="118"
                    y2="4"
                    stroke="#feff02"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Right headline narrative column */}
            <div className="lg:col-span-8 flex flex-col">
              {/* Section main heading title */}
              <h2
                ref={headlineRef}
                className="font-poppins font-bold text-3xl sm:text-5xl md:text-5xl text-[#1b2715] tracking-tight leading-[1.12] select-none"
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

              {/* Section description narrative text */}
              <p
                ref={descriptionRef}
                className="mt-3 sm:mt-4 max-w-3xl font-poppins text-sm sm:text-base text-[#556350] leading-relaxed select-none"
              >
                {data.description}
              </p>
            </div>
          </div>

          {/* Causes cards grid container */}
          <div
            className="mt-4 sm:mt-6 lg:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch"
            onMouseLeave={() => setActiveCardId(null)}
          >
            {causess.map((cause, index) => (
              <CausesCard
                key={cause.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                cause={cause}
                isActive={activeCardId === cause.id}
                onSelect={() => setActiveCardId(cause.id)}
                onLeave={() => setActiveCardId(null)}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}