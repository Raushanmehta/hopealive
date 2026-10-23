"use client";

import React, { useId } from "react";
import { TestimonialItem } from "@/types";

interface TestimonialCardProps {
  item: TestimonialItem;
  className?: string;
}

/**
 * 8-Petal Scalloped Flower / Cloud Path for the Avatar
 */
const SCALLOP_FLOWER_PATH =
  "M 85.00 50.00 A 18.08 18.08 0 0 1 74.75 74.75 A 18.08 18.08 0 0 1 50.00 85.00 A 18.08 18.08 0 0 1 25.25 74.75 A 18.08 18.08 0 0 1 15.00 50.00 A 18.08 18.08 0 0 1 25.25 25.25 A 18.08 18.08 0 0 1 50.00 15.00 A 18.08 18.08 0 0 1 74.75 25.25 A 18.08 18.08 0 0 1 85.00 50.00 Z";

export default function TestimonialCard({
  item,
  className = "",
}: TestimonialCardProps) {
  const reactId = useId();
  const clipId = `scallop-avatar-${item.id}-${reactId.replace(/:/g, "")}`;

  return (
    <div
      className={`group relative flex flex-col justify-between h-full bg-[#f8f6f0] text-[#1b2715] rounded-tl-[80px] rounded-br-[80px] rounded-tr-2xl rounded-bl-2xl p-6 sm:p-7 lg:p-8 pt-5 sm:pt-6 shadow-xl border border-[#1b2715]/10 hover:border-[#feff02] transition-all duration-300 ease-out select-none ${className}`}
    >
      {/* Top Row: Flower-Scalloped Avatar Popping Out + Name & Role */}
      <div className="flex items-center gap-4 sm:gap-5 -mt-16 sm:-mt-20">
        {/* Scalloped Avatar with Organic Flower Silhouette */}
        <div className="relative shrink-0 filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.18)] transition-transform duration-300 group-hover:scale-105">
          <svg
            viewBox="0 0 100 100"
            className="w-20 h-20 sm:w-[120px] sm:h-[120px]"
            aria-label={`${item.name} avatar`}
          >
            <defs>
              <clipPath id={clipId}>
                <path d={SCALLOP_FLOWER_PATH} />
              </clipPath>
            </defs>

            {/* Avatar Image clipped into flower silhouette */}
            <image
              href={item.avatar}
              width="100"
              height="100"
              preserveAspectRatio="xMidYMid slice"
              clipPath={`url(#${clipId})`}
            />

            {/* Signature Lime-Yellow border outline matching NGO theme */}
            <path
              d={SCALLOP_FLOWER_PATH}
              fill="none"
              stroke="#feff02"
              strokeWidth="2.5"
              className="opacity-95"
            />
          </svg>
        </div>

        {/* Name & Designation matching NGO theme typography & palette */}
        <div className="pt-10 sm:pt-14 flex flex-col justify-center">
          <h4 className="font-poppins font-bold text-xl sm:text-[22px] lg:text-2xl text-[#1b2715] leading-tight tracking-tight group-hover:text-[#121a0d] transition-colors">
            {item.name}
          </h4>
          <p className="font-poppins text-xs sm:text-[13px] font-semibold uppercase tracking-[0.15em] text-[#556350] mt-0.5">
            {item.role}
          </p>
        </div>
      </div>

      {/* Quote Text */}
      <div className="mt-2 sm:mt-3 flex-1 flex flex-col justify-center">
        <p className="font-poppins text-sm sm:text-[15px] text-[#2a3824] leading-relaxed tracking-normal">
          &ldquo;{item.quote}&rdquo;
        </p>
      </div>
    </div>
  );
}
