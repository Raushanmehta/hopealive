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

        {/* ========================================================
            BLOCK 1: OUR VISION (Headline Left-Aligned from JSON)
            ======================================================== */}
        <div className="pt-2 sm:pt-3 pb-2 sm:pb-3">
          <h2 className="font-poppins font-bold text-6xl sm:text-7xl md:text-8xl text-white tracking-[-0.035em] leading-[0.88] flex flex-col items-start select-none">
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
        </div>

        {/* Divider Line 1 (Theme Brand Yellow Accent) */}
        <hr
          ref={divider1Ref}
          className="border-0 h-[2px] bg-gradient-to-r from-[#feff02]/50 via-[#feff02]/25 to-white/10 w-full my-6 sm:my-8 md:my-9 opacity-100"
        />

        {/* ========================================================
            BLOCK 2: VISION CONTENT (NGO Vision Icon Left | Text Right from JSON)
            ======================================================== */}
        <div className="py-2 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-10 md:gap-14 lg:gap-16">
          {/* Left: NGO Vision Emblem (Hope Sunburst + Global Vision) */}
          <div
            ref={visionIconRef}
            className="shrink-0 flex items-center justify-start group"
          >
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-3xl bg-[#1f2c16] border border-[#feff02]/30 flex items-center justify-center text-[#feff02] shadow-[0_0_35px_rgba(254,255,2,0.12)] transition-all duration-500 ease-out group-hover:scale-105 group-hover:border-[#feff02] group-hover:shadow-[0_0_45px_rgba(254,255,2,0.25)] cursor-pointer">
              <div className="relative flex items-center justify-center">
                <SunburstIcon
                  size={48}
                  color="#feff02"
                  className="transition-transform duration-700 group-hover:rotate-90"
                />
                <Globe2
                  size={20}
                  className="absolute text-white stroke-[2.2] drop-shadow-md"
                />
              </div>
            </div>
          </div>

          {/* Right: Authentic NGO Vision Narrative from JSON */}
          <div className="w-full sm:max-w-xl md:max-w-2xl flex justify-end">
            <p
              ref={visionDescRef}
              className="font-poppins font-normal text-sm sm:text-[15px] md:text-base text-[#b0c0ad] leading-[1.65] text-left select-none"
            >
              {vision.description}
            </p>
          </div>
        </div>

        {/* Divider Line 2 */}
        <hr
          ref={divider2Ref}
          className="border-0 h-[2px] bg-gradient-to-r from-white/10 via-[#feff02]/25 to-[#feff02]/50 w-full my-6 sm:my-8 md:my-9 opacity-100"
        />

        {/* ========================================================
            BLOCK 3: OUR MISSION (Headline Right-Aligned from JSON)
            ======================================================== */}
        <div className="pt-2 sm:pt-3 pb-2 sm:pb-3 flex flex-col items-end text-right">
          <h2 className="font-poppins font-extrabold text-6xl sm:text-7xl md:text-8xl text-white tracking-[-0.035em] leading-[0.88] flex flex-col items-end select-none">
            <span ref={missionLine1Ref} className="block text-right text-white">
              {mission.title.line1}
            </span>
            <span
              ref={missionLine2Ref}
              className="block text-right mt-1 sm:mt-2 text-white hover:text-[#feff02] transition-colors duration-300"
            >
              {mission.title.line2}
            </span>
          </h2>
        </div>

        {/* Divider Line 3 */}
        <hr
          ref={divider3Ref}
          className="border-0 h-[2px] bg-gradient-to-l from-[#feff02]/50 via-[#feff02]/25 to-white/10 w-full my-6 sm:my-8 md:my-9 opacity-100"
        />

        {/* ========================================================
            BLOCK 4: MISSION CONTENT (Text Left | NGO Mission Icon Right from JSON)
            ======================================================== */}
        <div className="py-2 sm:py-4 flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-10 md:gap-14 lg:gap-16">
          {/* Left: Authentic NGO Mission Narrative from JSON (Right-Aligned on desktop) */}
          <div className="w-full sm:max-w-xl md:max-w-2xl flex justify-start">
            <p
              ref={missionDescRef}
              className="font-poppins font-normal text-sm sm:text-[15px] md:text-base text-[#b0c0ad] leading-[1.65] text-left sm:text-right select-none"
            >
              {mission.description}
            </p>
          </div>

          {/* Right: NGO Mission Emblem (Hand Holding Heart & Compassion) */}
          <div
            ref={missionIconRef}
            className="shrink-0 flex items-center justify-start sm:justify-end group"
          >
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-3xl bg-[#1f2c16] border border-[#feff02]/30 flex items-center justify-center text-[#feff02] shadow-[0_0_35px_rgba(254,255,2,0.12)] transition-all duration-500 ease-out group-hover:scale-105 group-hover:border-[#feff02] group-hover:shadow-[0_0_45px_rgba(254,255,2,0.25)] cursor-pointer">
              <HandHeart
                size={40}
                className="text-[#feff02] transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
              />
            </div>
          </div>
        </div>

        {/* Divider Line 4 (Closing Bottom Border) */}
        <hr
          ref={divider4Ref}
          className="border-0 h-[2px] bg-gradient-to-r from-white/10 via-[#feff02]/30 to-white/10 w-full mt-6 sm:my-8 md:mt-9 opacity-100"
        />
      </div>
    </section>
  );
}