"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectItem } from "@/types";

interface ProjectCardProps {
  item: ProjectItem;
  className?: string;
}

/**
 * ProjectCard with Exact Folder-Tab Silhouette, Editorial Serif Title,
 * Center Cutout Image with Shadow, and Olive Capsule Arrow Button
 */
export default function ProjectCard({
  item,
  className = "",
}: ProjectCardProps) {
  const arrowRef = useRef<SVGSVGElement>(null);

  return (
    <Link href={item.href} className="block group h-full">
      <div
        className={`relative flex flex-col justify-between min-h-[490px] sm:min-h-[530px] pt-9 sm:pt-11 pb-6 sm:pb-7 lg:pb-8 select-none transition-all duration-500 ease-out group-hover:-translate-y-2 drop-shadow-2xl ${className}`}
      >
        {/* SVG Background: Exact Folder-Tab Silhouette with 80px Leaf Curve in Theme #162211 */}
        <svg
          viewBox="0 0 340 500"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full -z-10 text-[#162211] overflow-visible"
        >
          {/* Main Folder Tab Silhouette with 80px Leaf Curve matching AboutSection */}
          <path
            d="M 0 64 A 36 36 0 0 1 36 28 L 150 28 C 162 28 162 0 174 0 L 304 0 A 36 36 0 0 1 340 36 L 340 420 A 80 80 0 0 1 260 500 L 40 500 A 40 40 0 0 1 0 460 Z"
            fill="currentColor"
          />

          {/* Faceted Angled Ribbon Stripes on #162211 */}
          <path
            d="M 0 85 L 340 55 L 340 145 L 0 175 Z"
            fill="#ffffff"
            opacity="0.05"
          />
          <path
            d="M 0 210 L 340 185 L 340 265 L 0 290 Z"
            fill="#feff02"
            opacity="0.08"
          />
          <path
            d="M 0 330 L 340 350 L 340 415 L 0 405 Z"
            fill="#000000"
            opacity="0.25"
          />
        </svg>

        {/* Top Title: Editorial Serif Typography for Project Title */}
        <div className="text-center pt-2 sm:pt-3 px-6 sm:px-7 lg:px-8">
          <h3 className="font-serif font-bold text-3xl sm:text-4xl lg:text-[40px] tracking-tight text-white group-hover:text-[#feff02] transition-colors duration-300 leading-none">
            {item.title}
          </h3>
          {item.subtitle && (
            <p className="font-poppins font-medium text-xs sm:text-[13px] text-[#feff02] mt-1.5 tracking-wide">
              {item.subtitle}
            </p>
          )}
        </div>

        {/* Center Graphic: FULL WIDTH - ZERO horizontal padding (Edge-to-Edge) */}
        <div className="relative w-full h-[200px] sm:h-[220px] my-auto flex items-center justify-center overflow-hidden">
          <Image
            src={item.image}
            alt={item.alt}
            fill
            unoptimized
            className="object-cover object-center w-full h-full transition-transform duration-700 ease-out group-hover:scale-105 filter drop-shadow-[0_12px_22px_rgba(0,0,0,0.5)]"
          />
          {/* Subtle Ambient Vignette Blending to #162211 */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#162211]/50 via-transparent to-[#162211]/25 pointer-events-none" />
        </div>

        {/* Project Description */}
        {item.description && (
          <p className="font-poppins text-xs sm:text-[13px] text-[#b0bfae] leading-relaxed line-clamp-2 px-6 sm:px-7 lg:px-8 text-center my-2 select-none">
            {item.description}
          </p>
        )}

        {/* Bottom Pill Container with Theme Yellow Base on #162211 Card */}
        <div className="w-full px-6 sm:px-7 lg:px-8">
          <div className="w-full bg-[#feff02] rounded-full p-2 sm:p-2.5 pl-5 sm:pl-6 flex items-center justify-between gap-3 shadow-lg border border-black/10 transition-colors duration-300 group-hover:bg-[#f5f600]">
            <span className="font-poppins text-xs sm:text-[14px] text-[#121a0d] font-semibold tracking-normal">
              {item.ctaText}
            </span>

            {/* Circular Button with Diagonal Theme Yellow Arrow */}
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#162211] flex items-center justify-center shrink-0 shadow-md group-hover:bg-black transition-all duration-300">
              <ArrowUpRight
                ref={arrowRef}
                size={20}
                strokeWidth={2.8}
                className="text-[#feff02] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
