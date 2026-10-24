"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  User,
  Tag,
  Share2,
  Link2,
  CheckCircle2,
  Quote,
  Heart,
  Check,
} from "lucide-react";
import { TwitterIcon, FacebookIcon, LinkedinIcon } from "@/components/icons/SocialIcons";
import siteData from "@/data/site.json";
import { BlogPostItem } from "@/types";

interface BlogDetailSectionProps {
  slug?: string;
  data?: BlogPostItem;
}

export default function BlogDetailSection({
  slug,
  data: propData,
}: BlogDetailSectionProps) {
  const allPosts: BlogPostItem[] = (siteData.blog?.posts || []) as BlogPostItem[];

  // Find the post matching slug, or use provided data, or fallback to first post
  const currentPost: BlogPostItem =
    propData ||
    (slug ? allPosts.find((p) => p.id === slug) : null) ||
    allPosts[0];

  // Recent posts excluding the current one
  const recentPosts = allPosts.filter((p) => p.id !== currentPost?.id).slice(0, 4);

  // Social share copy feedback
  const [copied, setCopied] = useState(false);
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Fallback defaults for rich details
  const category = currentPost?.category || "Humanitarian Field Story";
  const readTime = currentPost?.readTime || "5 Min Read";
  const author = currentPost?.author || {
    name: "Dr. Sarah Mitchell",
    role: "Field Operations & Education Lead",
    avatar: "/images/testimonial-sarah.jpg",
  };
  const content = currentPost?.content || [
    "In underserved rural villages across our operating zones, the absence of basic infrastructure often leaves thousands of children without access to education, clean water, or reliable food security.",
    "HopeAlive Foundation works directly alongside local community councils and frontline volunteers to establish long-term, sustainable programs that restore human dignity and empower families from the ground up.",
    "Through transparent donations and collective compassion, we continue expanding our reach to ensure no child or family is forgotten.",
  ];
  const quote =
    currentPost?.quote ||
    "Education, nourishment, and clean water are universal human rights — not privileges reserved for the fortunate.";
  const quoteAuthor = currentPost?.quoteAuthor || "Amara Okafor, HopeAlive Field Coordinator";
  const tags = currentPost?.tags || ["Child Welfare", "Education", "HopeAlive", "Community Impact"];

  const categoriesWithCounts = [
    { name: "Child Education", count: 8 },
    { name: "Nutrition & Food", count: 12 },
    { name: "Clean Water & Wells", count: 6 },
    { name: "Mobile Healthcare", count: 9 },
    { name: "Shelter & Protection", count: 5 },
    { name: "Emergency Relief", count: 14 },
  ];

  const popularTags = [
    "Education",
    "Clean Water",
    "Nutrition",
    "Healthcare",
    "Empowerment",
    "Volunteering",
    "Frontline Hope",
    "Community",
  ];

  return (
    <section
      id="blog-detail-section"
      aria-label="HopeAlive Foundation Blog Article Detail"
      className="relative w-full bg-[#f8f6f0] text-[#1a2614] px-4 md:px-12 py-10 md:py-16 lg:py-20"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* MAIN 2-COLUMN GRID: Left Article Content | Right Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: The Rich Article */}
          <article className="lg:col-span-8 ">
            {/* 1. Article Meta Header */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pb-4 border-b border-[#1b2715]/10">
              <span className="bg-[#1f2c16] text-[#feff02] px-3.5 py-1 rounded-full text-xs font-poppins font-bold uppercase tracking-wider shadow-sm">
                {category}
              </span>

              <div className="flex items-center gap-1.5 text-xs font-poppins text-[#556350]">
                <Calendar size={14} className="text-[#1b2715]" />
                <span>{currentPost?.date}</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-poppins text-[#556350]">
                <Clock size={14} className="text-[#1b2715]" />
                <span>{readTime}</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-poppins text-[#556350]">
                <User size={14} className="text-[#1b2715]" />
                <span>{author.name}</span>
              </div>
            </div>

            {/* 2. Article Headline */}
            <h1 className="font-poppins font-bold text-2xl sm:text-4xl lg:text-[40px] text-[#1b2715] tracking-tight leading-[1.2] mt-5 mb-6">
              {currentPost?.title}
            </h1>

            {/* 3. Featured Hero Image with Leaf-Cut Accent */}
            <div className="relative w-full h-[280px] sm:h-[400px] md:h-[460px] rounded-3xl overflow-hidden shadow-lg border border-[#1b2715]/10 mb-8">
              <Image
                src={currentPost?.image || "/images/blog-education.jpg"}
                alt={currentPost?.alt || currentPost?.title || "HopeAlive Humanitarian field post"}
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#162211]/80 via-transparent to-transparent pointer-events-none" />

              {/* Verified Field Story Caption */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 text-white font-poppins">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#feff02] bg-[#162211]/70 backdrop-blur-md px-3 py-1 rounded-full inline-block mb-1">
                  HopeAlive Frontline Documentation
                </span>
                <p className="text-xs sm:text-sm text-[#e0ece0] line-clamp-2">
                  {currentPost?.alt || "Real-world impact recorded by HopeAlive field staff and community volunteers."}
                </p>
              </div>
            </div>

            {/* 4. Article Lead Paragraph */}
            {currentPost?.excerpt && (
              <p className="text-base sm:text-lg font-poppins font-semibold text-[#1b2715] leading-relaxed mb-6 border-l-4 border-[#1f2c16] pl-4">
                {currentPost.excerpt}
              </p>
            )}

            {/* 5. Article Main Narrative Paragraphs */}
            <div className="space-y-5 text-sm sm:text-base font-poppins text-[#556350] leading-relaxed">
              {content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* 6. Signature HopeAlive Pullquote */}
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

            {/* 7. Mid-Article 2-Column Photo Collage */}
            <div className="my-8">
              <h3 className="font-poppins font-bold text-xl sm:text-2xl text-[#1b2715] mb-4">
                Frontline Action & Direct Impact
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden shadow-md border border-[#1b2715]/10 group">
                  <Image
                    src="/images/ngo-clean-water.jpg"
                    alt="Clean water initiative in rural village"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 bg-[#162211]/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-poppins text-[#feff02] font-semibold">
                    Safe Drinking Water Wells
                  </div>
                </div>

                <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden shadow-md border border-[#1b2715]/10 group">
                  <Image
                    src="/images/ngo-food-aid.jpg"
                    alt="Daily child nutrition programs"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 bg-[#162211]/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-poppins text-[#feff02] font-semibold">
                    Nutritional Emergency Rations
                  </div>
                </div>
              </div>
            </div>

            {/* 8. Key Takeaways Checklist */}
            <div className="my-8 p-6 sm:p-7 rounded-2xl bg-[#f8f6f0] border border-[#1b2715]/10">
              <h4 className="font-poppins font-bold text-base sm:text-lg text-[#1b2715] mb-3">
                Key Humanitarian Highlights:
              </h4>
              <ul className="space-y-2.5 font-poppins text-xs sm:text-sm text-[#556350]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={17} className="text-[#2d5a27] shrink-0 mt-0.5" />
                  <span>Direct community partnership ensures that 100% of aid is tailored to village needs.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={17} className="text-[#2d5a27] shrink-0 mt-0.5" />
                  <span>Every classroom project is paired with clean sanitation and daily hot meals.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={17} className="text-[#2d5a27] shrink-0 mt-0.5" />
                  <span>Annual independent third-party audits verify all resource distributions transparently.</span>
                </li>
              </ul>
            </div>

            {/* 9. In-Article Donation Callout Banner */}
            <div className="my-8 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#1f2c16] text-white flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg">
              <div>
                <span className="text-[11px] font-poppins font-bold uppercase tracking-widest text-[#feff02]">
                  Make A Difference
                </span>
                <h4 className="font-poppins font-bold text-lg sm:text-xl text-white mt-1">
                  Support Our Ongoing Humanitarian Programs
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-[#b0bfae] font-poppins max-w-md">
                  Your direct contribution empowers our medical, nutrition, and schooling convoys to reach the next community.
                </p>
              </div>
              <Link
                href="/donate"
                className="shrink-0 px-6 py-3 rounded-full bg-[#feff02] text-[#121a0d] hover:bg-white font-poppins font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md cursor-pointer flex items-center gap-2"
              >
                <Heart size={15} className="fill-[#121a0d]" />
                <span>Donate For This Cause</span>
              </Link>
            </div>

            {/* 10. Tags & Social Share Footer */}
            <div className="mt-10 pt-6 border-t border-[#1b2715]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2">
                <Tag size={15} className="text-[#1b2715]" />
                {tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-poppins font-medium bg-[#f8f6f0] text-[#556350] border border-[#1b2715]/10 px-3 py-1 rounded-full hover:border-[#1b2715]/30 cursor-pointer transition-colors"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              {/* Social Share Buttons */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-poppins font-semibold text-[#1b2715] mr-1">
                  Share:
                </span>
                <button
                  type="button"
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?text=${encodeURIComponent(currentPost.title)}`,
                      "_blank"
                    )
                  }
                  className="w-8 h-8 rounded-full bg-[#f8f6f0] border border-[#1b2715]/10 flex items-center justify-center text-[#1b2715] hover:bg-[#1f2c16] hover:text-[#feff02] transition-colors cursor-pointer"
                  title="Share on Twitter"
                >
                  <TwitterIcon size={14} />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`,
                      "_blank"
                    )
                  }
                  className="w-8 h-8 rounded-full bg-[#f8f6f0] border border-[#1b2715]/10 flex items-center justify-center text-[#1b2715] hover:bg-[#1f2c16] hover:text-[#feff02] transition-colors cursor-pointer"
                  title="Share on Facebook"
                >
                  <FacebookIcon size={14} />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    window.open(
                      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`,
                      "_blank"
                    )
                  }
                  className="w-8 h-8 rounded-full bg-[#f8f6f0] border border-[#1b2715]/10 flex items-center justify-center text-[#1b2715] hover:bg-[#1f2c16] hover:text-[#feff02] transition-colors cursor-pointer"
                  title="Share on LinkedIn"
                >
                  <LinkedinIcon size={14} />
                </button>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="relative w-8 h-8 rounded-full bg-[#f8f6f0] border border-[#1b2715]/10 flex items-center justify-center text-[#1b2715] hover:bg-[#1f2c16] hover:text-[#feff02] transition-colors cursor-pointer"
                  title="Copy Article Link"
                >
                  {copied ? <Check size={14} className="text-green-600" /> : <Link2 size={14} />}
                  {copied && (
                    <span className="absolute -top-7 right-0 text-[10px] bg-[#1f2c16] text-[#feff02] px-2 py-0.5 rounded font-poppins font-bold whitespace-nowrap animate-fadeIn">
                      Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* 11. Author Bio Box */}
            <div className="mt-8 p-6 sm:p-7 rounded-2xl bg-[#f8f6f0] border border-[#1b2715]/10 flex items-start gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-[#1f2c16] shadow-sm">
                <Image
                  src={author.avatar || "/images/testimonial-sarah.jpg"}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-poppins font-bold text-base text-[#1b2715]">
                  {author.name}
                </h4>
                <p className="text-xs font-poppins text-[#2d5a27] font-semibold">
                  {author.role}
                </p>
                <p className="mt-1.5 text-xs text-[#556350] font-poppins leading-relaxed">
                  Dedicated to grassroots humanitarian fieldwork, child literacy empowerment, and transparent community stewardship across 14 underprivileged regions.
                </p>
              </div>
            </div>
          </article>

          {/* RIGHT COLUMN: Interactive Sticky Sidebar */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28 self-start">

            {/* 2. Recent Field Reports Widget */}
            <div className="bg-white p-6 rounded-3xl border border-[#1b2715]/10 shadow-md">
              <h4 className="font-poppins font-bold text-base text-[#1b2715] mb-4 pb-2 border-b border-[#1b2715]/10">
                Recent Field Stories
              </h4>
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={post.href}
                    className="flex items-center gap-3.5 group"
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

            {/* 3. Program Categories Widget */}
            <div className="bg-white p-6 rounded-3xl border border-[#1b2715]/10 shadow-md">
              <h4 className="font-poppins font-bold text-base text-[#1b2715] mb-4 pb-2 border-b border-[#1b2715]/10">
                Program Categories
              </h4>
              <div className="space-y-2 font-poppins text-xs">
                {categoriesWithCounts.map((cat) => (
                  <Link
                    key={cat.name}
                    href="/blog"
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#f8f6f0] text-[#556350] hover:text-[#1b2715] transition-colors"
                  >
                    <span>{cat.name}</span>
                    <span className="bg-[#f8f6f0] text-[#1b2715] font-semibold px-2 py-0.5 rounded-md text-[11px] border border-[#1b2715]/10">
                      {cat.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 4. Urgent Cause Donation Callout Card */}
            <div className="bg-[#1f2c16] text-white p-7 rounded-3xl shadow-xl border border-white/10 relative overflow-hidden">
              <span className="text-[11px] font-poppins font-bold uppercase tracking-widest text-[#feff02] bg-[#2a3c20] px-3.5 py-1 rounded-full inline-block mb-3">
                Urgent Humanitarian Need
              </span>
              <h4 className="font-poppins font-bold text-lg sm:text-xl text-white">
                Every Action Saves Lives
              </h4>
              <p className="mt-2 text-xs text-[#d8e2d6] font-poppins leading-relaxed">
                Join our circle of hope today. Your gift provides immediate nutrition, clean water, and classroom packs to vulnerable children.
              </p>
              <Link
                href="/donate"
                className="mt-5 w-full py-3 px-6 rounded-full bg-[#feff02] text-[#121a0d] hover:bg-white font-poppins font-bold text-xs tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart size={14} className="fill-[#121a0d]" />
                <span>Donate To Support A Cause</span>
              </Link>
            </div>

            {/* 5. Popular Tags Cloud */}
            <div className="bg-white p-6 rounded-3xl border border-[#1b2715]/10 shadow-md">
              <h4 className="font-poppins font-bold text-base text-[#1b2715] mb-3 pb-2 border-b border-[#1b2715]/10">
                Popular Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((t) => (
                  <Link
                    key={t}
                    href="/blog"
                    className="text-xs font-poppins font-medium bg-[#f8f6f0] text-[#556350] border border-[#1b2715]/10 px-3 py-1 rounded-full hover:bg-[#1f2c16] hover:text-[#feff02] hover:border-[#1f2c16] transition-all"
                  >
                    #{t}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}