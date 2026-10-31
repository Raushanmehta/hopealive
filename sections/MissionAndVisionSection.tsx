"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HandHeart, Globe2 } from "lucide-react";
import SunburstIcon from "@/components/icons/SunburstIcon";
import { site, SectionProps, MissionVisionData } from "@/data";
import { animateMissionVisionEntrance } from "@/util/animations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MissionAndVisionProps extends SectionProps<MissionVisionData> {
  bgColor?: string;
}

export default function MissionAndVisionSection({
  data: propData,
  bgColor = "#162211",
  className,
}: MissionAndVisionProps = {}) {
  const data = propData || site.missionVision;
  const { vision, mission } = data;
  const tagline = (data as { tagline?: string }).tagline;

  const sectionRef = useRef<HTMLElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  // Vision block refs
  const visionLine1Ref = useRef<HTMLSpanElement>(null);
  const visionLine2Ref = useRef<HTMLSpanElement>(null);
  const divider1Ref = useRef<HTMLHRElement>(null);
  const visionIconRef = useRef<HTMLDivElement>(null);
  const visionDescRef = useRef<HTMLParagraphElement>(null);
  const divider2Ref = useRef<HTMLHRElement>(null);

  // Mission block refs
  const missionLine1Ref = useRef<HTMLSpanElement>(null);
  const missionLine2Ref = useRef<HTMLSpanElement>(null);
  const divider3Ref = useRef<HTMLHRElement>(null);
  const missionDescRef = useRef<HTMLParagraphElement>(null);
  const missionIconRef = useRef<HTMLDivElement>(null);
  const divider4Ref = useRef<HTMLHRElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      animateMissionVisionEntrance(sectionRef.current, {
        tagline: taglineRef.current,
        visionLines: [visionLine1Ref.current, visionLine2Ref.current],
        divider1: divider1Ref.current,
        visionIcon: visionIconRef.current,
        visionDesc: visionDescRef.current,
        divider2: divider2Ref.current,
        missionLines: [missionLine1Ref.current, missionLine2Ref.current],
        divider3: divider3Ref.current,
        missionDesc: missionDescRef.current,
        missionIcon: missionIconRef.current,
        divider4: divider4Ref.current,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Our Vision and Mission"
      className="relative w-full px-4 md:px-12 py-8 md:py-10 lg:py-20 text-white select-none overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      {/* Ambient Theme Sunburst Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 65% 55% at 50% -15%, rgba(254, 255, 2, 0.08), transparent 75%)",
        }}
      />

      {/* Subtle Dot Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col">
        {/* Optional Tagline from JSON */}
        {tagline && (
          <div
            ref={taglineRef}
            className="w-full flex justify-end pb-3 sm:pb-4"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#feff02]/20 backdrop-blur-sm text-xs sm:text-sm font-poppins font-medium text-[#feff02] tracking-wide select-none">
              <span className="w-2 h-2 rounded-full bg-[#feff02] shadow-[0_0_8px_#feff02] animate-pulse" />
              <span>{tagline}</span>
            </div>
          </div>
        )}

        {/* Vision block: Title on Left, Description on Right */}
        <div className="pt-2 sm:pt-3 pb-2 sm:pb-3 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-10">
          <h2 className="font-poppins font-bold text-3xl sm:text-5xl md:text-5xl text-white tracking-[-0.035em] leading-[1.05] flex flex-col items-start select-none shrink-0">
            <span ref={visionLine1Ref} className="block text-white">
              {vision.title.line1}
            </span>
            <span
              ref={visionLine2Ref}
              className="block mt-1 sm:mt-2 text-white hover:text-[#feff02] transition-colors duration-300"
            >
              {vision.title.line2}
            </span>
          </h2>

          <div className="w-full md:max-w-xl lg:max-w-2xl flex md:justify-end">
            <p
              ref={visionDescRef}
              className="font-poppins font-normal text-sm sm:text-[15px] md:text-base text-[#b0c0ad] leading-[1.65] text-left select-none"
            >
              {vision.description}
            </p>
          </div>
        </div>

        {/* Section separator divider line */}
        <hr
          ref={divider1Ref}
          className="border-0 h-[2px] bg-gradient-to-r from-[#feff02]/50 via-[#feff02]/25 to-white/10 w-full my-6 sm:my-8 md:my-9 opacity-100"
        />

        {/* Mission block: Description on Left, Title on Right */}
        <div className="pt-2 sm:pt-3 pb-2 sm:pb-3 flex flex-col-reverse md:flex-row md:items-center justify-between gap-6 md:gap-10">
          <div className="w-full md:max-w-xl lg:max-w-2xl flex justify-start">
            <p
              ref={missionDescRef}
              className="font-poppins font-normal text-sm sm:text-[15px] md:text-base text-[#b0c0ad] leading-[1.65] text-left select-none"
            >
              {mission.description}
            </p>
          </div>

          <h2 className="font-poppins font-extrabold text-3xl sm:text-5xl md:text-5xl text-white tracking-[-0.035em] leading-[1.05] flex flex-col items-start md:items-end text-left md:text-right select-none shrink-0">
            <span ref={missionLine1Ref} className="block text-white">
              {mission.title.line1}
            </span>
            <span
              ref={missionLine2Ref}
              className="block mt-1 sm:mt-2 text-white hover:text-[#feff02] transition-colors duration-300"
            >
              {mission.title.line2}
            </span>
          </h2>
        </div>

        {/* Bottom closing divider line */}
        <hr
          ref={divider4Ref}
          className="border-0 h-[2px] bg-gradient-to-r from-white/10 via-[#feff02]/30 to-white/10 w-full mt-6 sm:my-8 md:mt-9 opacity-100"
        />
      </div>
    </section>
  );
}