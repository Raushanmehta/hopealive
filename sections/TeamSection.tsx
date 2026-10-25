"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Users } from "lucide-react";
import TeamCard from "@/components/cards/TeamCard";
import { site, SectionProps, TeamData, TeamMember } from "@/data";

export default function TeamSection({
  data: propData,
  className,
}: SectionProps<TeamData> = {}) {
  const data = propData || site.team;
  const members: TeamMember[] = data?.membersList || [];
  const ctaBanner = data?.ctaBanner;

  return (
    <section
      aria-label="HopeAlive Foundation Leadership and Frontline Team"
      className="relative w-full bg-[#f8f6f0] text-[#1a2614] px-4 md:px-12 py-8 md:py-10 lg:py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* UPPER ROW: Left Column (Badge) | Right Column (Headline & Narrative) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: Organic Pill Badge */}
          <div className="lg:col-span-4 flex flex-col justify-start self-stretch">
            <div className="inline-flex items-center w-fit select-none">
              <span className="text-sm lg:text-lg font-poppins font-medium text-[#1b2715] flex items-center gap-2">
                <Users size={20} className="text-[#2d5a27]" />
                {data?.badge?.text || "OUR HUMANITARIAN TEAM"}
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Massive Headline & Narrative Paragraph */}
          <div className="lg:col-span-8 flex flex-col">
            <h2 className="font-poppins font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[52px] xl:text-[62px] text-[#1b2715] tracking-tight leading-[1.12] select-none">
              <span className="block">{data?.headline?.line1 || "Passionate Humanitarians Driven by Purpose"}</span>
              {data?.headline?.line2 && (
                <span className="block">{data.headline.line2}</span>
              )}
            </h2>

            <p className="mt-3 sm:mt-4 max-w-3xl font-poppins text-sm sm:text-base text-[#556350] leading-relaxed select-none">
              {data?.description ||
                "Meet the frontline physicians, logistics directors, and community educators dedicated to protecting vulnerable children and families worldwide."}
            </p>
          </div>
        </div>

        {/* TEAM MEMBERS GRID */}
        <div className="mt-4 sm:mt-6 lg:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch">
          {members.map((member) => (
            <TeamCard key={member.id} member={member as any} />
          ))}
        </div>

        {/* BOTTOM CALLOUT BANNER: Join Our Team & Volunteer Movement */}
        {ctaBanner && (
          <div className="mt-8 sm:mt-10 lg:mt-12 bg-[#1f2c16] text-white p-8 sm:p-10 lg:p-12 rounded-tl-[80px] rounded-br-[80px] rounded-tr-none rounded-bl-none border border-white/10 shadow-2xl relative overflow-hidden">
            {/* Subtle background radial accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#feff02]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <h3 className="font-poppins font-bold text-2xl sm:text-4xl text-white tracking-tight leading-snug">
                  {ctaBanner.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-[#b0bfae] font-poppins max-w-2xl leading-relaxed">
                  {ctaBanner.description}
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 sm:justify-start lg:justify-end">
                {((ctaBanner as any).primaryBtnText || (ctaBanner as any).buttonText) && (
                  <Link
                    href={(ctaBanner as any).primaryBtnHref || (ctaBanner as any).buttonHref || "/contact"}
                    className="btn-leaf inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 bg-[#feff02] text-[#121a0d] hover:bg-white font-poppins font-bold text-sm tracking-wide transition-all shadow-md cursor-pointer select-none"
                  >
                    <span>{(ctaBanner as any).primaryBtnText || (ctaBanner as any).buttonText}</span>
                    <ArrowUpRight size={16} strokeWidth={2.6} />
                  </Link>
                )}
                {ctaBanner.secondaryBtnText && (
                  <Link
                    href={ctaBanner.secondaryBtnHref || "/causes"}
                    className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-full font-poppins font-semibold text-sm tracking-wide transition-all border border-white/15"
                  >
                    <span>{ctaBanner.secondaryBtnText}</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}