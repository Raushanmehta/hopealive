"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Quote, Heart } from "lucide-react";
import siteData from "@/data/site.json";
import {
  ProjectItem,
  ProjectStat,
  ProjectMilestone,
  ProjectGalleryItem,
  ProjectDetailConfig,
} from "@/types";

interface ProjectDetailSectionProps {
  projectId?: string;
  data?: ProjectItem;
}

export default function ProjectDetailSection({
  projectId,
  data: propData,
}: ProjectDetailSectionProps) {
  const allProjects: ProjectItem[] =
    ((siteData.projects as any)?.projectsList || []) as ProjectItem[];
  const projectDetailConfig = (siteData as { projectDetail?: ProjectDetailConfig }).projectDetail;
  const defaultProject = allProjects[0] || {};

  const normalizedId = (projectId || "").toLowerCase().trim();

  // Select project by id or fallback to first
  const currentProject: ProjectItem =
    propData ||
    (normalizedId
      ? allProjects.find((p) => {
          const pId = p.id.toLowerCase();
          const pHref = p.href.toLowerCase();
          return (
            pId === normalizedId ||
            pId === `project-${normalizedId}` ||
            pId.replace("project-", "") === normalizedId ||
            pHref.endsWith(`/${normalizedId}`) ||
            pHref.endsWith(`/${normalizedId.replace("project-", "")}`)
          );
        })
      : null) ||
    allProjects[0] || {
      id: "project-education",
      title: "Education",
      subtitle: "Quality Education For All",
      description:
        "Providing free education, books and learning resources to underprivileged children for a brighter future.",
      category: "Youth Literacy & Schools",
      ctaText: "Explore Project",
      image: "/images/project-gallery-books.jpg",
      alt: "Hands holding open school books and notebooks for children education",
      href: "/project/education",
    };

  const otherProjects = allProjects.filter((p) => p.id !== currentProject?.id);

  // Dynamic data from projectsList / site.json with fallbacks
  const stats: ProjectStat[] =
    currentProject.stats || defaultProject.stats || projectDetailConfig?.stats || [];
  const challengeSolution =
    currentProject.challengeSolution ||
    defaultProject.challengeSolution ||
    projectDetailConfig?.challengeSolution;
  const quote =
    currentProject.quote || defaultProject.quote || projectDetailConfig?.quote;
  const milestones =
    currentProject.milestones ||
    defaultProject.milestones ||
    projectDetailConfig?.milestones;
  const gallery =
    currentProject.gallery ||
    defaultProject.gallery ||
    projectDetailConfig?.gallery;
  const callout =
    currentProject.callout ||
    defaultProject.callout ||
    projectDetailConfig?.callout ||
    (siteData.projects as any)?.callout;
  const baseSidebar =
    projectDetailConfig?.sidebar || (siteData.projects as any)?.sidebar;
  const sidebar = {
    ...baseSidebar,
    donateCard:
      currentProject.donateCard ||
      baseSidebar?.donateCard,
  };

  return (
    <section
      aria-label="HopeAlive Foundation Humanitarian Project Detail"
      className="relative w-full bg-[#f8f6f0] text-[#1a2614] px-4 md:px-12 py-8 md:py-10 lg:py-20 overflow-visible"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* MAIN 2-COLUMN GRID: Left Project Narrative | Right Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: In-depth Project Case Study */}
          <article className="lg:col-span-8">
            {/* Main Title */}
            <h1 className="font-poppins font-bold text-2xl sm:text-4xl lg:text-[42px] text-[#1b2715] tracking-tight leading-[1.2] mb-3">
              {currentProject.subtitle || currentProject.title}
            </h1>
            <p className="font-poppins text-base sm:text-lg text-[#556350] leading-relaxed mb-8">
              {currentProject.description}
            </p>

            {/* Featured Hero Showcase Image */}
            <div className="relative w-full h-[300px] sm:h-[420px] md:h-[480px] rounded-tl-[80px] rounded-br-[80px] rounded-tr-none rounded-bl-none overflow-hidden shadow-2xl border border-[#1b2715]/10 mb-10">
              <Image
                src={currentProject.image || "/images/project-gallery-books.jpg"}
                alt={currentProject.alt || currentProject.title}
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#162211]/85 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 text-white font-poppins">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#feff02] bg-[#162211]/80 backdrop-blur-md px-3.5 py-1 rounded-full inline-block mb-1 border border-white/10">
                  HopeAlive Frontline Documentation
                </span>
                <p className="text-xs sm:text-sm text-[#e0ece0]">
                  {currentProject.alt ||
                    "Real-world project implementation led by HopeAlive volunteers and local village councils."}
                </p>
              </div>
            </div>

            {/* Key Metrics Grid */}
            {stats.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-5 rounded-2xl border border-[#1b2715]/10 shadow-sm text-center"
                  >
                    <span className="block font-poppins font-bold text-2xl sm:text-3xl text-[#1b2715] tracking-tight">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-xs font-poppins font-medium text-[#556350]">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* The Challenge vs Solution Narrative */}
            {challengeSolution && (
              <div className="space-y-6 font-poppins text-[#556350] text-sm sm:text-base leading-relaxed mb-10">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1b2715] tracking-tight">
                  {challengeSolution.title}
                </h2>
                {challengeSolution.paragraphs?.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            )}

            {/* Signature Pullquote */}
            {quote && (
              <div className="my-8 sm:my-10 bg-[#1f2c16] text-white p-7 sm:p-9 rounded-3xl border border-white/10 relative overflow-hidden shadow-xl">
                <div className="absolute top-4 right-6 text-white/5 pointer-events-none">
                  <Quote size={110} />
                </div>
                <Quote size={28} className="text-[#feff02] mb-3" />
                <blockquote className="font-poppins text-base sm:text-xl font-medium leading-relaxed italic text-[#f4f7f4]">
                  {quote.text}
                </blockquote>
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs sm:text-sm font-poppins">
                  <span className="font-semibold text-[#feff02]">
                    {quote.author}
                  </span>
                  <span className="text-[#b0bfae]">{quote.role}</span>
                </div>
              </div>
            )}

            {/* Milestone Roadmap */}
            {milestones && milestones.items?.length > 0 && (
              <div className="my-10">
                <h3 className="font-poppins font-bold text-xl sm:text-2xl text-[#1b2715] tracking-tight mb-6">
                  {milestones.title}
                </h3>
                <div className="space-y-4">
                  {milestones.items.map((m: ProjectMilestone, idx: number) => (
                    <div
                      key={idx}
                      className="p-5 sm:p-6 rounded-2xl bg-white border border-[#1b2715]/10 shadow-sm flex flex-col sm:flex-row sm:items-start gap-4"
                    >
                      <span className="shrink-0 w-20 px-3 py-1 text-center rounded-lg bg-[#f8f6f0] border border-[#1b2715]/10 text-sm font-poppins font-bold text-[#1b2715]">
                        {m.phase}
                      </span>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="font-poppins font-bold text-lg text-[#1b2715]">
                            {m.title}
                          </h4>
                          <span className="text-[14px] font-poppins font-semibold px-2.5 py-0.5 rounded-full bg-[#1f2c16] text-[#feff02]">
                            {m.status}
                          </span>
                        </div>
                        <p className="mt-2 text-xs sm:text-sm text-[#556350] font-poppins leading-relaxed">
                          {m.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Field Photo Collage */}
            {gallery && gallery.items?.length > 0 && (
              <div className="my-10">
                <h3 className="font-poppins font-bold text-xl sm:text-2xl text-[#1b2715] tracking-tight mb-5">
                  {gallery.title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {gallery.items.map((item: ProjectGalleryItem, idx: number) => (
                    <div
                      key={idx}
                      className="relative h-60 sm:h-72 rounded-2xl overflow-hidden shadow-md border border-[#1b2715]/10"
                    >
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                      {item.caption && (
                        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white text-xs font-poppins">
                          {item.caption}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mid-Page Contact Callout Banner */}
            {callout && (
              <div className="mt-8 sm:mt-10 lg:mt-12 bg-[#1f2c16] text-white p-7 sm:p-9 lg:p-10 rounded-tl-[80px] rounded-br-[80px] rounded-tr-none rounded-bl-none border border-white/10 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <h4 className="font-poppins font-bold text-xl sm:text-2xl text-white">
                    {callout.title}
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-[#b0bfae] font-poppins max-w-md">
                    {callout.description}
                  </p>
                </div>
                <Link
                  href={callout.buttonHref || "/contact"}
                  className="btn-leaf shrink-0 inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#feff02] text-[#121a0d] hover:bg-white font-poppins font-bold text-xs sm:text-sm tracking-wide rounded-xl shadow-lg transition-all cursor-pointer select-none"
                >
                  <Heart size={15} className="fill-[#121a0d]" />
                  <span>{callout.buttonText}</span>
                </Link>
              </div>
            )}
          </article>

          {/* RIGHT COLUMN: Interactive Sticky Sidebar */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28 self-start">
            {/* Related Field Initiatives */}
            {otherProjects.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-[#1b2715]/10 shadow-md">
                <h4 className="font-poppins font-bold text-xl text-[#1b2715] mb-4 pb-2 border-b border-[#1b2715]/10">
                  {sidebar?.relatedTitle || "Related Field Initiatives"}
                </h4>
                <div className="space-y-4">
                  {otherProjects.map((proj) => (
                    <Link
                      key={proj.id}
                      href={proj.href || `/project/${proj.id.replace("project-", "")}`}
                      className="flex items-center gap-3.5 group cursor-pointer"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[#1b2715]/10">
                        <Image
                          src={proj.image}
                          alt={proj.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1">
                        <span className="block text-[11px] font-poppins text-[#556350]">
                          {proj.category}
                        </span>
                        <h5 className="font-poppins font-semibold text-xs sm:text-sm text-[#1b2715] group-hover:text-[#2d5a27] transition-colors line-clamp-2 mt-0.5 leading-snug">
                          {proj.subtitle || proj.title}
                        </h5>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Urgent Need / Contact Donate Card */}
            {sidebar?.donateCard && (
              <div className="bg-[#1f2c16] text-white p-7 rounded-3xl shadow-xl border border-white/10 relative overflow-hidden">
                <h4 className="font-poppins font-bold text-lg sm:text-xl text-white">
                  {sidebar.donateCard.title}
                </h4>
                <p className="mt-2 text-xs text-[#d8e2d6] font-poppins leading-relaxed">
                  {sidebar.donateCard.description}
                </p>
                <Link
                  href={sidebar.donateCard.buttonHref || "#"}
                  className="mt-5 w-full py-3 px-6 rounded-full bg-[#feff02] text-[#121a0d] hover:bg-white font-poppins font-bold text-sm md:text-base tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Heart size={14} className="fill-[#121a0d]" />
                  <span>{sidebar.donateCard.buttonText}</span>
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
