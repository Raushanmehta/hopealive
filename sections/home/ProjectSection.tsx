"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import siteData from "@/data/site.json";
import { ProjectData, ProjectItem } from "@/types";
import ProjectCard from "@/components/cards/ProjectCard";
import { animateProjectEntrance } from "@/util/animations";

interface ProjectSectionProps {
  data?: ProjectData;
}

export default function ProjectSection({
  data = siteData.projects as ProjectData,
}: ProjectSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // GSAP Entrance Animation on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      animateProjectEntrance(sectionRef.current, {
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
      aria-label="HopeAlive Foundation Key Impact Projects"
      className="relative w-full bg-[#f8f6f0] text-[#1a2614] px-4 md:px-12 py-8 md:py-10 lg:py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* UPPER ROW: Left Column (Badge) | Right Column (Headline & Narrative) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: Organic Capsule Badge */}
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

          {/* RIGHT COLUMN: Massive Bold Headline & Narrative Paragraph */}
          <div className="lg:col-span-8 flex flex-col">
            <h2
              ref={headlineRef}
              className="font-poppins font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[52px] xl:text-[62px] text-[#1b2715] tracking-tight leading-[1.12] select-none"
            >
              <span className="project-headline-line block">
                {data.headline.line1}
              </span>
              {data.headline.line2 && (
                <span className="project-headline-line block">
                  {data.headline.line2}
                </span>
              )}
            </h2>

            <p
              ref={descriptionRef}
              className="mt-3 sm:mt-4 max-w-3xl font-poppins text-sm sm:text-base text-[#556350] leading-relaxed select-none"
            >
              {data.description}
            </p>
          </div>
        </div>

        {/* BOTTOM ROW: 3 Feature Folder-Tab Project Cards (Matching mt-4 sm:mt-6 lg:mt-8 and gap-4 sm:gap-5 from AboutSection) */}
        <div className="mt-4 sm:mt-6 lg:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch">
          {data.items.map((item: ProjectItem, index: number) => (
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="h-full"
            >
              <ProjectCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}