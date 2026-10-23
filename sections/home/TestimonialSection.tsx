"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import TestimonialCard from "@/components/cards/TestimonialCard";
import siteData from "@/data/site.json";
import { TestimonialData } from "@/types";
import { animateTestimonialEntrance } from "@/util/animations";

interface TestimonialSectionProps {
  data?: TestimonialData;
}

export default function TestimonialSection({
  data = siteData.testimonials as TestimonialData,
}: TestimonialSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  const [api, setApi] = React.useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;

    const updateScrollState = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    updateScrollState();
    api.on("select", updateScrollState);
    api.on("reInit", updateScrollState);

    return () => {
      api.off("select", updateScrollState);
    };
  }, [api]);

  // GSAP Entrance Animation on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      animateTestimonialEntrance(sectionRef.current, {
        badge: badgeRef.current,
        headline: headlineRef.current,
        description: descriptionRef.current,
        carousel: carouselContainerRef.current,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-label="HopeAlive Foundation Community Testimonials"
      className="relative w-full bg-[#162211] text-white px-4 md:px-12 py-8 md:py-10 lg:py-20 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* UPPER ROW: Left Column (Badge) | Right Column (Headline & Narrative) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: Organic Pill Badge */}
          <div className="lg:col-span-4 flex flex-col justify-start self-stretch">
            <div
              ref={badgeRef}
              className="inline-flex items-center w-fit select-none"
            >
              <span className="text-sm lg:text-lg font-poppins font-medium text-[#feff02]">
                {data.badge.text}
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Massive Headline, Narrative Paragraph & Carousel Controls */}
          <div className="lg:col-span-8 flex flex-col">
            {/* Massive Bold Headline */}
            <h2
              ref={headlineRef}
              className="font-poppins font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[52px] xl:text-[62px] text-white tracking-tight leading-[1.12] select-none"
            >
              <span className="testimonial-headline-line block">
                {data.headline.line1}
              </span>
              {data.headline.line2 && (
                <span className="testimonial-headline-line block">
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

            {/* Carousel Navigation Buttons (Matching mt-3 sm:mt-6 from AboutSection) */}
            <div className="mt-2 sm:mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => api?.scrollPrev()}
                disabled={!canScrollPrev}
                aria-label="Previous testimonial"
                className="btn-leaf flex items-center justify-center w-12 h-12 rounded-xl bg-[#1f2c16] text-[#feff02] border border-white/10 hover:bg-[#feff02] hover:text-[#121a0d] disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all duration-200 cursor-pointer shadow-md"
              >
                <ArrowLeft size={18} strokeWidth={2.4} />
              </button>
              <button
                type="button"
                onClick={() => api?.scrollNext()}
                disabled={!canScrollNext}
                aria-label="Next testimonial"
                className="btn-leaf flex items-center justify-center w-12 h-12 rounded-xl bg-[#1f2c16] text-[#feff02] border border-white/10 hover:bg-[#feff02] hover:text-[#121a0d] disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all duration-200 cursor-pointer shadow-md"
              >
                <ArrowRight size={18} strokeWidth={2.4} />
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: Shadcn Carousel (Matching mt-4 sm:mt-6 lg:mt-8 & gap-4 sm:gap-5 from AboutSection) */}
        <div ref={carouselContainerRef} className="w-full">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full relative"
          >
            {/* pt-12 allows the scalloped flower avatar to pop out above the card container without clipping */}
            <CarouselContent className="-ml-4 sm:-ml-5 pt-12 pb-6">
              {data.items.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="pl-4 sm:pl-5 basis-full md:basis-1/2 lg:basis-1/3 flex"
                >
                  <TestimonialCard item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
