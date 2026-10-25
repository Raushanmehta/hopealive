"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  User,
  CheckCircle2,
  Quote,
  Heart
} from "lucide-react";
import { site } from "@/data";
import { BlogPostItem } from "@/types";

interface BlogDetailSectionProps {
  slug?: string;
  data?: BlogPostItem;
}

export default function BlogDetailSection({
  slug,
  data: propData,
}: BlogDetailSectionProps) {
  const allPosts: BlogPostItem[] =
    (((site.blog as any)?.blogPosts || []) as BlogPostItem[]);

  const normalizedSlug = (slug || "").toLowerCase().trim();

  // Find the post matching slug, or use provided data, or fallback to first post
  const currentPost: BlogPostItem =
    propData ||
    (normalizedSlug
      ? allPosts.find((p) => {
        const pId = (p.id || "").toLowerCase();
        const pHref = (p.href || "").toLowerCase();
        return (
          pId === normalizedSlug ||
          pHref.endsWith(`/${normalizedSlug}`) ||
          pHref.replace("/blog/", "") === normalizedSlug
        );
      })
      : null) ||
    allPosts[0];

  // Recent posts excluding current post
  const recentPosts = allPosts
    .filter((p) => p.id !== currentPost?.id)
    .slice(0, 4);

  // Social share copy feedback
  const [copied, setCopied] = useState(false);
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Dynamic configurations sourced from JSON with rich fallbacks
  const category = currentPost?.category || "Child Education";
  const author = {
    name: currentPost?.author?.name || "Dr. Sarah Mitchell",
    role: currentPost?.author?.role || "Field Operations & Education Lead",
    avatar: currentPost?.author?.avatar || "/images/testimonial-sarah.webp",
  };
  const content =
    currentPost?.content && currentPost.content.length > 0
      ? currentPost.content
      : [
        "In many rural villages across our operating zones, the lack of basic educational infrastructure leaves thousands of bright young minds without access to formal literacy and numeracy. Without schools nearby, children frequently spend their days walking miles for water or working in seasonal labor.",
        "HopeAlive Foundation launched our community learning initiatives to bridge this critical divide. By partnering with village elders and training local volunteer instructors, we have equipped rural community classrooms with solar lamps, bilingual storybooks, clean desks, and essential stationery sets.",
        "The transformation is immediate and profound. Attendance rates have surged above 92%, and children who had never held a pencil are now reading fluently in both English and their native dialects. Each student also receives a warm, nutritious meal every day at school, ensuring hunger never stands between a child and their future.",
      ];
  const quote =
    currentPost?.quote ||
    "Education is not merely about learning words on paper; it is about restoring dignity, opening doors to self-reliance, and proving to every child that their dreams matter.";
  const quoteAuthor =
    currentPost?.quoteAuthor || "Amara Okafor, HopeAlive Regional Education Coordinator";



  const collage = currentPost?.collage || currentPost?.photoCollage;
  const keyTakeaways = currentPost?.keyTakeaways || currentPost?.takeaways;

  // Sourced from blog.donationCta in site.json (not from individual blog posts)
  const donationCta = (site.blog as any)?.donationCta;

  // Sourced from blog.sidebar in site.json (not from individual blog posts)
  const sidebarData = (site.blog as any)?.sidebar;
  const recentStoriesTitle = sidebarData?.recentTitle || sidebarData?.recentStoriesTitle || "Recent Field Stories";
  const sidebarDonateCard = sidebarData?.donateCard;

  return (
    <section
      aria-label="HopeAlive Foundation Blog Article Detail"
      className="relative w-full bg-[#f8f6f0] text-[#1a2614] px-4 md:px-12 py-8 md:py-10 lg:py-20 overflow-visible"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* MAIN 2-COLUMN GRID: Left Article Content | Right Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: The Rich Article Narrative */}
          <article className="lg:col-span-8">
            {/* 1. Article Meta Header */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pb-4 border-b border-[#1b2715]/10">
              <span className="bg-[#1f2c16] text-[#feff02] px-3.5 py-1 rounded-full text-xs font-poppins font-bold uppercase tracking-wider shadow-sm">
                {category}
              </span>

              {currentPost?.date && (
                <div className="flex items-center gap-1.5 text-xs font-poppins text-[#556350]">
                  <Calendar size={14} className="text-[#1b2715]" />
                  <span>{currentPost.date}</span>
                </div>
              )}

              {author?.name && (
                <div className="flex items-center gap-1.5 text-xs font-poppins text-[#556350]">
                  <User size={14} className="text-[#1b2715]" />
                  <span>{author.name}</span>
                </div>
              )}
            </div>

            {/* 2. Article Headline */}
            <h1 className="font-poppins font-bold text-2xl sm:text-4xl lg:text-[40px] text-[#1b2715] tracking-tight leading-[1.2] mt-5 mb-6">
              {currentPost?.title}
            </h1>

            {/* 3. Featured Hero Image with Organic Silhouette */}
            <div className="relative w-full h-[280px] sm:h-[400px] md:h-[460px] rounded-tl-[80px] rounded-br-[80px] rounded-tr-none rounded-bl-none overflow-hidden shadow-2xl border border-[#1b2715]/10 mb-8">
              <Image
                src={currentPost?.image || "/images/blog-education.webp"}
                alt={currentPost?.alt || currentPost?.title || "HopeAlive Humanitarian field post"}
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#162211]/80 via-transparent to-transparent pointer-events-none" />

              {/* Verified Field Story Caption */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 text-white font-poppins">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#feff02] bg-[#162211]/70 backdrop-blur-md px-3 py-1 rounded-full inline-block mb-1">
                  {site.navbar?.brand?.name || "HopeAlive"} Frontline Documentation
                </span>
                <p className="text-xs sm:text-sm text-[#e0ece0] line-clamp-2">
                  {currentPost?.alt || "Real-world impact recorded by HopeAlive field staff and community volunteers."}
                </p>
              </div>
            </div>

            {/* 4. Article Lead Excerpt */}
            {currentPost?.excerpt && (
              <p className="text-base sm:text-lg font-poppins font-semibold text-[#1b2715] leading-relaxed mb-6 border-l-4 border-[#1f2c16] pl-4">
                {currentPost.excerpt}
              </p>
            )}

            {/* 5. Article Main Narrative Paragraphs */}
            {content.length > 0 && (
              <div className="space-y-5 text-sm sm:text-base font-poppins text-[#556350] leading-relaxed">
                {content.map((paragraph: string, idx: number) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            )}

            {/* 6. Signature Pullquote */}
            {quote && (
              <div className="my-8 sm:my-10 bg-[#1f2c16] text-white p-7 sm:p-9 rounded-2xl sm:rounded-3xl border border-white/10 relative overflow-hidden shadow-xl">
                <div className="absolute top-4 right-6 text-white/5 pointer-events-none">
                  <Quote size={100} />
                </div>
                <Quote size={28} className="text-[#feff02] mb-3" />
                <blockquote className="font-poppins text-base sm:text-xl font-medium leading-relaxed italic text-[#f4f7f4]">
                  “{quote}”
                </blockquote>
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs sm:text-sm font-poppins">
                  <span className="text-[#feff02] font-semibold">{quoteAuthor}</span>
                  <span className="text-[#a5b5a2]">Verified Field Dispatch</span>
                </div>
              </div>
            )}

            {/* 7. Mid-Article 2-Column Photo Collage */}
            {collage && collage.images && collage.images.length > 0 && (
              <div className="my-8">
                {collage.title && (
                  <h3 className="font-poppins font-bold text-xl sm:text-2xl text-[#1b2715] mb-4">
                    {collage.title}
                  </h3>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {collage.images.map((img: { src: string; alt?: string; label?: string }, idx: number) => (
                    <div
                      key={idx}
                      className="relative h-56 sm:h-64 rounded-2xl overflow-hidden shadow-md border border-[#1b2715]/10 group"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt || collage.title || "Field photo"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {img.label && (
                        <div className="absolute bottom-3 left-3 bg-[#162211]/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-poppins text-[#feff02] font-semibold">
                          {img.label}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. Key Takeaways Checklist */}
            {keyTakeaways && keyTakeaways.items && keyTakeaways.items.length > 0 && (
              <div className="my-8 p-6 sm:p-7 rounded-2xl bg-[#f8f6f0] border border-[#1b2715]/10 shadow-sm">
                {keyTakeaways.title && (
                  <h4 className="font-poppins font-bold text-base sm:text-lg text-[#1b2715] mb-3">
                    {keyTakeaways.title}
                  </h4>
                )}
                <ul className="space-y-2.5 font-poppins text-xs sm:text-sm text-[#556350]">
                  {keyTakeaways.items.map((itemText: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 size={17} className="text-[#2d5a27] shrink-0 mt-0.5" />
                      <span>{itemText}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 9. In-Article Donation Callout Banner */}
            {donationCta && (
              <div className="my-8 p-6 sm:p-8 rounded-tl-[80px] rounded-br-[80px] rounded-tr-none rounded-bl-none bg-[#1f2c16] text-white flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl border border-white/10">
                <div>
                  {donationCta.badge && (
                    <span className="text-[11px] font-poppins font-bold uppercase tracking-widest text-[#feff02]">
                      {donationCta.badge}
                    </span>
                  )}
                  <h4 className="font-poppins font-bold text-lg sm:text-xl text-white mt-1">
                    {donationCta.title}
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-[#b0bfae] font-poppins max-w-md">
                    {donationCta.description}
                  </p>
                </div>
                <Link
                  href={donationCta.buttonHref || "/contact"}
                  className="btn-leaf shrink-0 px-6 py-3.5 rounded-xl bg-[#feff02] text-[#121a0d] hover:bg-white font-poppins font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md cursor-pointer flex items-center gap-2 select-none"
                >
                  <Heart size={15} className="fill-[#121a0d]" />
                  <span>{donationCta.buttonText || "Contact Us"}</span>
                </Link>
              </div>
            )}
          </article>

          {/* RIGHT COLUMN: Interactive Sticky Sidebar */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28 self-start sticky-sidebar">
            {/* Widget 1: Recent Field Reports */}
            {recentPosts.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-[#1b2715]/10 shadow-md">
                <h4 className="font-poppins font-bold text-xl text-[#1b2715] mb-4 pb-2 border-b border-[#1b2715]/10">
                  {recentStoriesTitle}
                </h4>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={post.href}
                      className="flex items-center gap-3.5 group cursor-pointer"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[#1b2715]/10">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1">
                        <span className="block text-[11px] font-poppins text-[#556350] flex items-center gap-1">
                          <Calendar size={11} /> {post.date}
                        </span>
                        <h5 className="font-poppins font-semibold text-xs sm:text-sm text-[#1b2715] group-hover:text-[#2d5a27] transition-colors line-clamp-2 mt-0.5 leading-snug">
                          {post.title}
                        </h5>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Widget 2: Urgent Cause Donation Callout Card */}
            {sidebarDonateCard && (
              <div className="bg-[#1f2c16] text-white p-7 rounded-3xl shadow-xl border border-white/10 relative overflow-hidden">
                <h4 className="font-poppins font-bold text-lg sm:text-xl text-white">
                  {sidebarDonateCard.title}
                </h4>
                <p className="mt-2 text-xs text-[#d8e2d6] font-poppins leading-relaxed">
                  {sidebarDonateCard.description}
                </p>
                <Link
                  href={sidebarDonateCard.buttonHref || "/contact"}
                  className="btn-leaf mt-5 w-full py-3.5 px-6 rounded-xl bg-[#feff02] text-[#121a0d] hover:bg-white font-poppins font-bold text-base tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer select-none"
                >
                  <Heart size={14} className="fill-[#121a0d]" />
                  <span>{sidebarDonateCard.buttonText || "Donate"}</span>
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}