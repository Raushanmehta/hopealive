"use client";

import React, { forwardRef } from "react";
import { CauseItem } from "@/types";
import {
  NutritionIcon,
  EducationIcon,
  HealthcareIcon,
  ShelterIcon,
  WaterIcon,
  MedicalIcon,
  EmergencyAidIcon,
} from "@/components/icons";

interface CausesCardProps {
  item?: CauseItem;
  cause?: CauseItem;
  isActive?: boolean;
  onSelect?: () => void;
  className?: string;
}

export const CausesCard = forwardRef<HTMLDivElement, CausesCardProps>(
  ({ item, cause, isActive = false, onSelect, className = "" }, ref) => {
    const cardData = cause || item;
    if (!cardData) return null;

    /**
     * Dynamically chooses the appropriate SVG icon based on the cause Title and Icon type
     */
    const renderIcon = (title: string, iconName: string = "", active: boolean) => {
      const t = (title || "").toLowerCase();
      const icon = (iconName || "").toLowerCase();

      const iconProps = {
        size: 42,
        strokeWidth: 1.8,
        className: `transition-transform duration-300 transform group-hover:scale-110 ${
          active ? "text-[#121a0d]" : "text-white"
        }`,
      };

      // 1. Shelter & Homeless Children Cause
      if (
        t.includes("shelter") ||
        t.includes("homeless") ||
        t.includes("home") ||
        icon === "shelter"
      ) {
        return <ShelterIcon {...iconProps} />;
      }

      // 2. Pure Clean Water Cause
      if (
        t.includes("water") ||
        t.includes("drinking") ||
        t.includes("well") ||
        icon === "water"
      ) {
        return <WaterIcon {...iconProps} />;
      }

      // 3. Education & School Cause
      if (
        t.includes("education") ||
        t.includes("school") ||
        t.includes("book") ||
        t.includes("literacy") ||
        icon === "education"
      ) {
        return <EducationIcon {...iconProps} />;
      }

      // 4. Emergency Aid & Food Relief Cause
      if (
        t.includes("emergency") ||
        t.includes("relief") ||
        (t.includes("aid") && !t.includes("medical")) ||
        icon === "emergency"
      ) {
        return <EmergencyAidIcon {...iconProps} />;
      }

      // 5. Daily Warm Meals & Nutrition Cause
      if (
        t.includes("meal") ||
        t.includes("food") ||
        t.includes("nutrition") ||
        icon === "nutrition"
      ) {
        return <NutritionIcon {...iconProps} />;
      }

      // 6. Mobile Healthcare & Medicine Cause
      if (
        t.includes("health") ||
        t.includes("medical") ||
        t.includes("medicine") ||
        t.includes("doctor") ||
        icon === "healthcare"
      ) {
        return <MedicalIcon {...iconProps} />;
      }

      // Fallback
      return <HealthcareIcon {...iconProps} />;
    };

    return (
      <div
        ref={ref}
        onClick={onSelect}
        onMouseEnter={onSelect}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onSelect?.();
          }
        }}
        className={`group relative flex flex-col justify-between min-h-[390px] sm:min-h-[420px] p-8 sm:p-9 lg:p-10 rounded-tl-[54px] sm:rounded-tl-[64px] rounded-br-[54px] sm:rounded-br-[64px] rounded-tr-2xl rounded-bl-2xl shadow-xl transition-all duration-500 ease-out cursor-pointer select-none ${
          isActive
            ? "bg-[#feff02] text-[#121a0d] scale-[1.01] shadow-2xl shadow-[#feff02]/15"
            : "bg-[#1f2c16] text-white border border-white/10 hover:border-white/25 hover:bg-[#25361c]"
        } ${className}`}
      >
        {/* Top Row: Title (Left) and Distinct Title-Specific Organic SVG Icon (Right) */}
        <div className="flex items-start justify-between gap-4 w-full">
          <h3
            className={`font-poppins font-bold text-2xl sm:text-[28px] lg:text-[32px] tracking-tight leading-[1.15] max-w-[210px] ${
              isActive ? "text-[#121a0d]" : "text-white"
            }`}
          >
            {cardData.title}
          </h3>

          <div className="shrink-0 p-1">
            {renderIcon(cardData.title, cardData.icon, isActive)}
          </div>
        </div>

        {/* Bottom Paragraph with Subtle Opacity */}
        <div className="mt-12 sm:mt-16">
          <p
            className={`font-poppins text-sm sm:text-[15px] leading-relaxed transition-colors duration-300 ${
              isActive
                ? "text-[#121a0d]/90 font-medium"
                : "text-[#a8b3a4] font-normal"
            }`}
          >
            {cardData.description}
          </p>
        </div>
      </div>
    );
  }
);

CausesCard.displayName = "CausesCard";

export default CausesCard;
